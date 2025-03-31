import { Button, Form, InputGroup } from "react-bootstrap";
import { BsSend, BsStopFill } from "react-icons/bs";

interface ChatInputProps {
	loading: boolean;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (event: React.FormEvent) => Promise<void>;
}

export default function ChatInput({
	input,
	setInput,
	loading,
	handleSubmit,
}: ChatInputProps) {
	return (
		<Form
			//onSubmit={handleSubmit}
			className="mb-2"
		>
			<InputGroup>
				<Form.Control
					name="user-chat-input"
					as="textarea"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask Gemini AI about anything 😎"
					required
				/>
				<Button
					type="submit"
					disabled={loading}
					variant="primary"
					style={{ width: "3em" }}
					onClick={handleSubmit}
				>
					{
						loading ?
							// <Spinner />
							<BsStopFill />

							: <BsSend />
					}
				</Button>
			</InputGroup>
		</Form>
	);
}
