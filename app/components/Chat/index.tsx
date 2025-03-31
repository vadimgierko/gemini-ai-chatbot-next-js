"use client";

import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import useChat, { History } from "@/context/useChat";
import useUser from "@/context/useUser";

export default function Chat() {
	const { user } = useUser();
	const { history, setHistory, systemInstruction } = useChat();

	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const scrollToMessageRef = useRef<HTMLDivElement | null>(null);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!user) return alert("You need to be logged with Google Account to use the chat for free.");

		if (!input.trim().length)
			return alert("You cannot send empty message! Type something!");

		const savedUserPrompt = input;

		try {
			setLoading(true);
			setInput("");

			let updatedHistory: History = [];

			setHistory((prevHistory) => {
				updatedHistory = [
					...prevHistory,
					{ role: "user", parts: [{ text: input }] },
					// { role: "model", parts: [{ text: "" }] },
				];

				return updatedHistory;
			});

			const token = await user.getIdToken(true);

			const res = await fetch("/api/chat/stream", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					prompt: input,
					systemInstruction: systemInstruction || "",
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Something went wrong.");
			}

			// add empty ai response to populate during stream:
			updatedHistory.push({
				role: "model",
				parts: [{ text: "" }]
			});

			// Read response as a stream
			const reader = res.body?.getReader();
			const decoder = new TextDecoder();
			let botMessage = "";

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					botMessage += decoder.decode(value, { stream: true });

					// Update UI progressively
					const chatAnswer = updatedHistory[updatedHistory.length - 1];
					chatAnswer.parts[0].text =
						botMessage;

					setHistory(updatedHistory);
				}
			}
		} catch (error: unknown) {
			alert(`Error generating content: ${error}`);
			// recreate user's prompt:
			setInput(savedUserPrompt);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (scrollToMessageRef && scrollToMessageRef.current) {
			scrollToMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [scrollToMessageRef]);

	return (
		<>
			<ChatMessages
				history={history}
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
