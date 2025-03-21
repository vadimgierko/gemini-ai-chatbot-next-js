"use client";

import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import useChat from "@/context/useChat";
import getChatMessage from "@/lib/getChatMessage";

export default function Chat() {
	const { history, setHistory, systemInstruction } = useChat();

	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const [] = useState<
		| string
		// | Part | Content
		| undefined
	>(undefined); // TEMPLATE_SYSTEM_INSTRUCTION

	const scrollToMessageRef = useRef<HTMLDivElement | null>(null);

	// ============================ ⚠️ NOTE: ⚠️ ====================================//
	// THIS PREV HANDLE SUBMIT FUNCTION USED API ROUTE TO GET CHAT MESSAGE.
	// IT IS REPLACED BY FOLLOWING HANDLE SUBMIT FUNCTION WHICH USES SERVER FUNCTION INSTEAD.
	// PS. IT IS NOT REMOVED TO HAVE A REFERENCE IF I NEED TO GO BACK 😉

	// const handleSubmit = async (event: React.FormEvent) => {
	// 	event.preventDefault();

	// 	if (!input.trim().length)
	// 		return alert("You cannot send empty message! Type something!");

	// 	setLoading(true);

	// 	try {
	// 		const res = await fetch("/api", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ prompt: input, systemInstruction }),
	// 		});

	// 		if (!res.ok) {
	// 			const errorData = await res.json();
	// 			throw new Error(errorData.message || "Something went wrong.");
	// 		}

	// 		const data = await res.json();

	// 		setHistory((prevHistory) => [
	// 			...prevHistory,
	// 			{ role: "user", parts: [{ text: input }] },
	// 			{ role: "model", parts: [{ text: data.message }] },
	// 		]);

	// 		setInput("");
	// 	} catch (error: unknown) {
	// 		console.error("Error generating content:", error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	// =============================================================================//

	async function handleSubmit() {
		if (!input.trim().length)
			return alert("You cannot send empty message! Type something!");

		setLoading(true);

		try {
			const message = await getChatMessage({
				input,
				systemInstruction,
			});

			if (!message) {
				alert("Something went wrong while generating chat answer...");
				return;
			}

			setHistory((prevHistory) => [
				...prevHistory,
				{ role: "user", parts: [{ text: input }] },
				{ role: "model", parts: [{ text: message }] },
			]);

			setInput("");
		} catch (error: unknown) {
			console.error("Error generating content:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (scrollToMessageRef && scrollToMessageRef.current) {
			scrollToMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [scrollToMessageRef]);

	// ⚠️ THIS USE EFFECT ONLY TESTS IF TEST API ROUTE STILL WORKING 😉
	useEffect(() => {
		async function testApiRoute() {
			const res = await fetch("/api");

			if (!res.ok) {
				console.error("Test API route failed...");
			}

			const testAnswer = await res.json();

			console.log("Test API route answered:", testAnswer);
		}

		testApiRoute();
	}, []);

	return (
		<>
			<ChatMessages
				history={
					loading
						? [
								...history,
								{ role: "user", parts: [{ text: input }] },
								{ role: "model", parts: [{ text: "Loading..." }] },
						  ]
						: history
				}
				ref={scrollToMessageRef}
			/>

			<ChatInput
				loading={loading}
				input={input}
				setInput={setInput}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}
