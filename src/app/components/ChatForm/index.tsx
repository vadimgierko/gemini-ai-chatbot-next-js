'use client';

import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'

interface HistotyChunk {
  role: "user" | "model",
  parts: { text: string }[],
}

type History = HistotyChunk[]

const chatData: History = [
  {
    role: "user",
    parts: [
      {
        text: "## Let's chat! `hello world`"
      }
    ]
  },
  {
    role: "model",
    parts: [
      {
        text: "Great! What's on your mind?  I'm ready to chat about anything you'd like, from current events to your favorite hobbies.  Let's get started!\n"
      }
    ]
  },
  {
    role: "user",
    parts: [
      {
        text: "Actually, I'm working on ai chat app and I ame using your model!"
      }
    ]
  },
  {
    role: "model",
    parts: [
      {
        text: "That's fantastic!  I'm glad you're finding my model useful for your AI chat app.  What aspects of my model are you using, and what are some of the challenges you're facing in developing your app?  I'd be happy to offer any assistance or insights I can based on my experience.  I'm curious to hear more about your project!\n"
      }
    ]
  },
  {
    role: "user",
    parts: [
      {
        text: "I had challanges with creating an interactive chat & history in my next.js app"
      }
    ]
  },
  {
    role: "model",
    parts: [
      {
        text: "Ah, managing interactive chat and history in a Next.js app can definitely present some challenges.  The key is to choose the right approach for handling the state and persistence of your chat data.  Let's break down some potential solutions and considerations:\n\n* **State Management:**  How are you managing the chat state?  For a simple chat, you might be able to get away with using `useState` and `useEffect` hooks directly in your component.  However, for a more complex chat with multiple users or features, a dedicated state management solution like `zustand`, `jotai`, `recoil`, or even Context API might be more appropriate.  These libraries provide better ways to manage data updates efficiently across different parts of your application.\n\n* **Persistence:** How are you storing the chat history?  For a simple app, you might store the history in the component's state.  However, this will be lost on refresh.  Better options include:\n    * **Local Storage:**  Simple for single-user chats, but doesn't sync across devices.\n    * **Server-Side Storage:**  This is the most robust solution.  You could use a database (like Supabase, Firebase, MongoDB, or a more traditional SQL database) to store the chat history persistently.  This would allow you to scale your app and handle multiple users.  You'd need backend functionality to handle storing and retrieving the chat messages.\n    * **IndexedDB:**  A browser-based database, more robust than local storage but still client-side.\n\n* **Real-time Updates:**  If you want real-time updates, you'll need a mechanism for pushing new messages to the clients.  This often involves WebSockets (using libraries like `socket.io`) or server-sent events (SSE).  WebSockets are generally preferred for bidirectional communication in chat applications.\n\n* **API Design:** If you're using a server, you'll need well-defined APIs to handle things like:\n    * Sending messages\n    * Retrieving chat history\n    * Potentially handling user authentication and authorization.\n\nTo help me give you more specific advice, could you tell me more about:\n\n* **The scale of your app:** Is it a simple personal chat, or something with multiple users?\n* **Your current state management solution (if any):**\n* **Your current approach to persisting chat history (if any):**\n* **Whether you need real-time updates:**\n\nKnowing these details will allow me to provide more tailored guidance.\n"
      }
    ]
  },
  {
    role: "user",
    parts: [
      {
        text: "I'm going to do that definitely. I also am chatting with you now to check, if you really follow the conversation. So, to check that, tell me, what was my first prompt in this chat?"
      }
    ]
  },
  {
    role: "model",
    parts: [
      {
        text: "*Your first prompt in this chat was*: \"Let's chat!\"\n"
      }
    ]
  }
];

const ChatForm = () => {
  const [history, setHistory] = useState<History>([]); // [] || chatData

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, history }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      const data = await res.json();
      console.log(data.message);
      setHistory([...history, { role: "user", parts: [{ text: input }] }, { role: "model", parts: [{ text: data.message }] }])
    } catch (error) {
      console.error('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { console.log(history) }, [history])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>

      {history && <>
        {history.map((h, i) =>
          <div key={i}>
            <p><strong>{h.role}:</strong></p>
            <br />
            <div>
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
              >
                {h.parts[0].text}
              </Markdown>
            </div>
            <br />
          </div>)}
      </>}
    </div>
  );
};

export default ChatForm;
