import { NextRequest } from "next/server";
import { getChat, getModel } from "@/lib/model";
import { adminAuth } from "@/firebaseAdminConfig";

export async function POST(request: NextRequest) {
	try {
		//======================= verify user ============================//
		const authHeader = request.headers.get("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new Error("Unauthorized: Missing Token");
		}

		const token = authHeader.split(" ")[1];

		const decodedToken = await adminAuth.verifyIdToken(token); // Verify Firebase Token
		console.log("Authenticated user:", decodedToken.uid); // ✅ User is verified

		//=====================================================================//

		const { prompt, systemInstruction } = await request.json();

		const model = getModel(systemInstruction);

		if (!model) throw new Error("No intialized model...");

		const chat = await getChat(model);

		// USE (UNCOMMENT) THE CODE BELOW
		// TO GET ========== FULL MESSAGE ============ RESPONSE INSTEAD OF STREAM:

		// const result = await chat.sendMessage(prompt);
		// const message = result.response.text();
		// return Response.json({ message });

		// USE THE CODE BELOW TO =========== STREAM ============ AI RESPONSE
		// INSTEAD OF GETTING FULL MESSAGE AT ONCE (SEE CODE ABOVE):
		const result = await chat.sendMessageStream(prompt);
		const stream = new ReadableStream({
			async start(controller) {
				for await (const chunk of result.stream) {
					controller.enqueue(new TextEncoder().encode(chunk.text()));
				}
				controller.close();
			},
		});

		return new Response(stream, {
			headers: { "Content-Type": "text/event-stream" },
		});
	} catch (error: unknown) {
		console.error("Error generating content:", error);
		return Response.json(
			{ message: "Error generating content:", error },
			{ status: 500 }
		);
	}
}
