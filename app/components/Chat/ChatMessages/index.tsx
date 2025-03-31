import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { History } from "@/context/useChat";
import { Spinner } from "react-bootstrap";
import useUser from "@/context/useUser";
import { BsPersonCircle } from "react-icons/bs";
import { SiGooglegemini } from "react-icons/si";

export default function ChatMessages({
	history,
	ref,
}: {
	history: History;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	const { user } = useUser();

	return (
		<div
			style={{
				flex: 1,
				overflowY: "auto",
				paddingBottom: "7em",
			}}
		>
			{history.map((h, i) => (
				<div
					key={i}
					ref={i === history.length - 1 ? ref : null}
					className={`message ${h.role === "user" ? "border p-2 my-2 rounded w-75 ms-auto" : ""
						}`}
					style={{
						backgroundColor: h.role === "user"
							? "rgb(56, 56, 56)"
							: "",
						display: "flex"
					}}
				>
					{
						user && h.role === "user"
							? user.photoURL
								? (
									<img
										width={30}
										height={30}
										src={user.photoURL}
										style={{ borderRadius: "50%", marginRight: "1em" }}
										alt={`${user.displayName} avatar`}
									/>
								) : (
									<BsPersonCircle />
								)
							: <SiGooglegemini size={30} className="me-3" />
					}
					<div className="message-content">
						{h.role === "model" && h.parts[0].text === "Loading..." ? (
							<Spinner />
						) : (
							<Markdown
								rehypePlugins={[rehypeHighlight]}
								remarkPlugins={[remarkGfm]}
							>
								{h.parts[0].text}
							</Markdown>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
