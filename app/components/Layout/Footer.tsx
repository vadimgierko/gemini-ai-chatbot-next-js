export default function Footer() {
	const currYear = new Date().getFullYear();

	return (
		<footer>
			<p className="text-center small">
				&copy; 2024-{currYear}{" "}
				<a href="https://github.com/vadimgierko" target="_blank">
					Vadim Gierko
				</a>{" "}
				|{" "}
				<a
					href="https://github.com/vadimgierko/gemini-ai-chat-next-js-ts"
					target="_blank"
				>{`<code />`}</a>
			</p>
		</footer>
	);
}
