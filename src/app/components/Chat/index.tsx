"use client";

import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

interface HistotyChunk {
	role: "user" | "model";
	parts: { text: string }[];
}

export type History = HistotyChunk[];

export default function Chat() {
	const [history, setHistory] = useState<History>([]); // [] || TEMPLATE_CHAT_HISTORY

	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const [systemInstruction, setSystemInstruction] = useState<
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
			// console.log(data.message);
			setHistory([
				...history,
				{ role: "user", parts: [{ text: input }] },
				{ role: "model", parts: [{ text: data.message }] },
			]);

			setInput("");
		} catch (error) {
			console.error("An error occurred while fetching the response:", error);
		} finally {
			setLoading(false);
		}
	};

	// ask user about system instruction before chat init:
	useEffect(() => {
		const systemInstructionPrompt = prompt(
			"Provide system instruction/context for AI if you want to:"
		);

		if (systemInstructionPrompt) {
			setSystemInstruction(systemInstructionPrompt);
		}
	}, []);

	useEffect(() => {
		if (scrollToMessageRef && scrollToMessageRef.current) {
			scrollToMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [scrollToMessageRef]);

	return (
		<>
			{systemInstruction && (
				<p>
					*Provided system instruction:
					<br />
					<strong>
						<em>{systemInstruction}</em>
					</strong>
					<br />
					<small>
						TIP: To change the instruction, refresh the page and start a new
						chat.
					</small>
				</p>
			)}
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
