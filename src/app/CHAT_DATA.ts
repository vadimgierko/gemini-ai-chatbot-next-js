import { History } from "./components/Chat";

export const chatData: History = [
	{
		role: "user",
		parts: [
			{
				text: "## Let's chat! `hello world`",
			},
		],
	},
	{
		role: "model",
		parts: [
			{
				text: "Great! What's on your mind?  I'm ready to chat about anything you'd like, from current events to your favorite hobbies.  Let's get started!\n",
			},
		],
	},
	{
		role: "user",
		parts: [
			{
				text: "Actually, I'm working on ai chat app and I ame using your model!",
			},
		],
	},
	{
		role: "model",
		parts: [
			{
				text: "That's fantastic!  I'm glad you're finding my model useful for your AI chat app.  What aspects of my model are you using, and what are some of the challenges you're facing in developing your app?  I'd be happy to offer any assistance or insights I can based on my experience.  I'm curious to hear more about your project!\n",
			},
		],
	},
	{
		role: "user",
		parts: [
			{
				text: "I had challanges with creating an interactive chat & history in my next.js app",
			},
		],
	},
	{
		role: "model",
		parts: [
			{
				text: "Ah, managing interactive chat and history in a Next.js app can definitely present some challenges.  The key is to choose the right approach for handling the state and persistence of your chat data.  Let's break down some potential solutions and considerations:\n\n* **State Management:**  How are you managing the chat state?  For a simple chat, you might be able to get away with using `useState` and `useEffect` hooks directly in your component.  However, for a more complex chat with multiple users or features, a dedicated state management solution like `zustand`, `jotai`, `recoil`, or even Context API might be more appropriate.  These libraries provide better ways to manage data updates efficiently across different parts of your application.\n\n* **Persistence:** How are you storing the chat history?  For a simple app, you might store the history in the component's state.  However, this will be lost on refresh.  Better options include:\n    * **Local Storage:**  Simple for single-user chats, but doesn't sync across devices.\n    * **Server-Side Storage:**  This is the most robust solution.  You could use a database (like Supabase, Firebase, MongoDB, or a more traditional SQL database) to store the chat history persistently.  This would allow you to scale your app and handle multiple users.  You'd need backend functionality to handle storing and retrieving the chat messages.\n    * **IndexedDB:**  A browser-based database, more robust than local storage but still client-side.\n\n* **Real-time Updates:**  If you want real-time updates, you'll need a mechanism for pushing new messages to the clients.  This often involves WebSockets (using libraries like `socket.io`) or server-sent events (SSE).  WebSockets are generally preferred for bidirectional communication in chat applications.\n\n* **API Design:** If you're using a server, you'll need well-defined APIs to handle things like:\n    * Sending messages\n    * Retrieving chat history\n    * Potentially handling user authentication and authorization.\n\nTo help me give you more specific advice, could you tell me more about:\n\n* **The scale of your app:** Is it a simple personal chat, or something with multiple users?\n* **Your current state management solution (if any):**\n* **Your current approach to persisting chat history (if any):**\n* **Whether you need real-time updates:**\n\nKnowing these details will allow me to provide more tailored guidance.\n",
			},
		],
	},
	{
		role: "user",
		parts: [
			{
				text: "I'm going to do that definitely. I also am chatting with you now to check, if you really follow the conversation. So, to check that, tell me, what was my first prompt in this chat?",
			},
		],
	},
	{
		role: "model",
		parts: [
			{
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
			},
		],
	},
	{
		role: "user",
		parts: [
			{text: "Give me the code for chat component in react"}
		]
	},
	{
		role: "model",
		parts: [
			{
				text: `
${"```ts"}
"use client";

import { chatData } from "@/app/CHAT_DATA";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

interface HistotyChunk {
    role: "user" | "model";
    parts: { text: string }[];
}

export type History = HistotyChunk[];

export default function Chat() {
    const [history, setHistory] = useState<History>(chatData); // [] || chatData

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

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

        if (scrollToMessageRef && scrollToMessageRef.current) {
            scrollToMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, scrollToMessageRef.current]);

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
};
${"```"}
				`
			}
		]
	}
];
