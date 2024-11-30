import { Container } from "react-bootstrap";
import ChatForm from "./components/ChatForm";

export default function Home() {
	return (
		<Container>
			<main>
				<ChatForm />
			</main>
			<footer></footer>
		</Container>
	);
}
