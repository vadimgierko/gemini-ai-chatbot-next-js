export default function About() {
	return (
		<>
			<header className="text-center">
				<h1>About</h1>
				<hr />
				<p>
					Gemini AI Chat App written in Next.js &amp; TypeScript by{" "}
					<a href="https://github.com/vadimgierko" target="_blank">
						Vadim Gierko
					</a>
				</p>
			</header>

			<h2 className="text-center">Tech Stack</h2>
			<hr />
			<ul>
				<li>Next.js 15+</li>
				<li>React 19+</li>
				<li>Gemini 2.0 Flash</li>
				<li>TypeScript 5+</li>
				<li>Bootstrap</li>
			</ul>
		</>
	);
}
