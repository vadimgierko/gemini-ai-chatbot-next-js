"use client";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import useUser from "./useUser";

const ChatContext = createContext<{
	history: History;
	setHistory: Dispatch<SetStateAction<History>>;
	systemInstruction: string | undefined;
	setSystemInstruction: Dispatch<SetStateAction<string | undefined>>;
	promptSystemInstruction: () => void;
} | null>(null);

export default function useChat() {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error("useChat has to be used within <ChatContext.Provider>");
	}

	return context;
}

interface ChatProps {
	children: React.ReactNode;
}

interface HistotyChunk {
	role: "user" | "model";
	parts: { text: string }[];
}

export type History = HistotyChunk[];

export function ChatProvider({ children }: ChatProps) {
	const {user} = useUser();
	const [history, setHistory] = useState<History>([]); // [] || TEMPLATE_CHAT_HISTORY

	const [systemInstruction, setSystemInstruction] = useState<
		| string
		// | Part | Content
		| undefined
	>(undefined); // TEMPLATE_SYSTEM_INSTRUCTION

	function promptSystemInstruction() {
		const systemInstructionPrompt = prompt(
			"You can provide any system instruction/ context for AI for more narrowed answers if you want to:"
		);

		if (systemInstructionPrompt) {
			setSystemInstruction(systemInstructionPrompt);
		}
	}

	// CLEAR STATE AFTER USER LOGGED OUT:
	useEffect(() => {
		if (!user) {
			setHistory([]);
			setSystemInstruction(undefined);
		}
	}, [user]);

	const value = {
		history,
		setHistory,
		systemInstruction,
		setSystemInstruction,
		promptSystemInstruction,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
