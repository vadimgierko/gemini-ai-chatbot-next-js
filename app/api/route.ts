import { NextRequest } from "next/server";
import { getChat, getModel } from "@/lib/model";

export async function POST(request: NextRequest) {
	try {
		const { prompt, systemInstruction } = await request.json();

		const model = getModel(systemInstruction);

		if (!model) throw new Error("No model...");

		//===========================================

		const chat = await getChat(model);

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
