import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

	if (!GEMINI_API_KEY) {
		return Response.json({ message: "No API KEY..." }, { status: 500 });
	}

	const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	try {
		const { prompt, history } = await request.json();

		//===========================================

		const chat = model.startChat({
			history,
		});
		const result = await chat.sendMessage(prompt);
		//============================================
		const message = result.response.text();

		return Response.json({ message });
	} catch (error: unknown) {
		console.error("Error generating content:", error);
		return Response.json(
			{ message: "Error generating content.", error },
			{ status: 500 }
		);
	}
}
