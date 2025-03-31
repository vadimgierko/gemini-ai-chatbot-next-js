"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//================== INIT SYSTEM INSTRUCTION & CHAT =================//
let prevSystemInstruction = "";
/**
 * Chat instance that lives on server &
 * preserves chat data for use in API routes
 */
let chat = ai.chats.create({
	model: "gemini-2.0-flash",
	config: {
		systemInstruction: prevSystemInstruction
	}
});
//====================================================================//

export async function getChat({
	systemInstruction = "",
}: {
	systemInstruction?: string;
}) {
	if (systemInstruction !== prevSystemInstruction) {
		console.log(
			"Passed system instruction is different than prev system instruction => update chat.",
			prevSystemInstruction,
			"=>",
			systemInstruction
		);
		
		const prevHistory = chat.getHistory(true);

		chat = ai.chats.create({
			model: "gemini-2.0-flash",
			history: prevHistory,
			config: {
				systemInstruction
			}
		});

		prevSystemInstruction = systemInstruction;
	} else {
		console.log(
			"System instruction is the same, return prev chat.",
			systemInstruction
		);
	}

	// console.log(
	// 	chat.getHistory(true)
	// );

	return chat
}