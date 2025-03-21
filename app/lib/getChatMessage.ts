"use server";

import { getChat, getModel } from "./model";

export default async function getChatMessage({
	input,
	systemInstruction,
}: {
	input: string;
	systemInstruction: string | undefined;
}) {
	try {
		const model = getModel(systemInstruction);

		if (!model) throw new Error("No model...");

		const chat = await getChat(model);

		const result = await chat.sendMessage(input);

		const message = result.response.text();

		return message;
	} catch (error: unknown) {
		console.error("Error generating content:", error);
		return undefined;
	}
}
