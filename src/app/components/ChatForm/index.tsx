"use client";

import { useState, useEffect } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { BsSend } from "react-icons/bs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface HistotyChunk {
	role: "user" | "model";
	parts: { text: string }[];
}

export type History = HistotyChunk[];

const ChatForm = () => {
	const [history, setHistory] = useState<History>([]); // [] || chatData

	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

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
				body: JSON.stringify({ prompt: input, history }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Something went wrong.");
			}

			const data = await res.json();
			console.log(data.message);
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

	useEffect(() => {
		console.log(history);
	}, [history]);

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
			<div style={{ flex: 1, overflowY: "auto" }}>
				{history && (
					<>
						{history.map((h, i) => (
							<div
								key={i}
								className={
									h.role === "user"
										? "border p-2 my-2 rounded w-75 ms-auto"
										: ""
								}
								style={{
									backgroundColor: h.role === "user" ? "rgb(56, 56, 56)" : "",
								}}
							>
								<Markdown
									rehypePlugins={[rehypeHighlight]}
									remarkPlugins={[remarkGfm]}
								>
									{h.parts[0].text}
								</Markdown>
							</div>
						))}
					</>
				)}
			</div>

			<Form onSubmit={handleSubmit} className="mb-2">
				<InputGroup>
					<Form.Control
						as="textarea"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Ask Gemini AI about anything 😎"
					/>
					<Button
						type="submit"
						disabled={loading}
						variant="primary"
						style={{ width: "3em" }}
					>
						{loading ? <Spinner /> : <BsSend />}
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
};

export default ChatForm;
