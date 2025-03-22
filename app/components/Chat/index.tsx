"use client";

import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import useChat from "@/context/useChat";

export default function Chat() {
	const { history, setHistory, systemInstruction } = useChat();

	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const scrollToMessageRef = useRef<HTMLDivElement | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!input.trim().length)
			return alert("You cannot send empty message! Type something!");

		setLoading(true);
		setHistory((prevHistory) => [
			...prevHistory,
			{ role: "user", parts: [{ text: input }] },
			{ role: "model", parts: [{ text: "" }] },
		]);

		try {
			const res = await fetch("/api/stream", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: input, systemInstruction }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Something went wrong.");
			}

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

					setHistory((prevHistory) => {
						const updatedHistory = [...prevHistory];

						updatedHistory[updatedHistory.length - 1].parts[0].text =
							botMessage;

						return updatedHistory;
					});
				}
			}
			setInput("");
		} catch (error: unknown) {
			console.error("Error generating content:", error);
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
				history={
					// loading
					// 	? [
					// 			...history,
					// 			{ role: "user", parts: [{ text: input }] },
					// 			{ role: "model", parts: [{ text: "Loading..." }] },
					// 	  ]
					// 	: history
					history
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
