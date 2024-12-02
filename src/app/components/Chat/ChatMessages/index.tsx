import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { History } from "..";

export default function ChatMessages({
    history
}: { history: History }) {
    return (
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
    )
}