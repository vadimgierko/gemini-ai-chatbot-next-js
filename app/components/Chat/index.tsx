"use client";

import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import useChat from "@/context/useChat";

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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!input.trim().length)
			return alert("You cannot send empty message! Type something!");

		setLoading(true);

		try {
			const res = await fetch("/api", {
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

			const data = await res.json();

			setHistory((prevHistory) => [
				...prevHistory,
				{ role: "user", parts: [{ text: input }] },
				{ role: "model", parts: [{ text: data.message }] },
			]);

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
