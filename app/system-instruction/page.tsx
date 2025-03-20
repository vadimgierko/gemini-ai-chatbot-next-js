"use client";

import useChat from "@/context/useChat";
import { Button } from "react-bootstrap";

export default function SystemInstructionsPage() {
	const { systemInstruction, promptSystemInstruction, setSystemInstruction } =
		useChat();

	return (
		<>
			<>
				<Button className="mb-2" onClick={promptSystemInstruction}>
					Set System Instruction
				</Button>
				<Button
					variant="outline-secondary"
					onClick={() => setSystemInstruction(undefined)}
				>
					Reset System Instruction
				</Button>
			</>
			<hr />
			{systemInstruction ? (
				<>
					<h1 className="text-center">Current System Instruction (Context)</h1>
					<p>{systemInstruction}</p>
				</>
			) : (
				<p>No system instructions/ context provided...</p>
			)}
		</>
	);
}
