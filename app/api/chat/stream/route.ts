import { NextRequest } from "next/server";
import { getChat } from "@/lib/getChat";
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

		const chat = await getChat({
			systemInstruction,
		});

		const result = await chat.sendMessageStream({message: prompt});

		const stream = new ReadableStream({
			async start(controller) {
				for await (const chunk of result) {
					controller.enqueue(new TextEncoder().encode(chunk.text));
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
