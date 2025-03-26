import SignInWithGoogleButton from "./components/SignInWithGoogleButton";

export default function IndexPage() {
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
				<p>
					Sign in with Google to use chat for free 👉{" "}
					<SignInWithGoogleButton />
					<br />
					<small>
						This is needed to prevent abusing app API routes by malicious users.
					</small>
				</p>
			</header>

			<section>
				<h2 className="text-center">Features</h2>
				<hr />
				<ul>
					<li>Sign in using Google Account to use the app for free.</li>
					<li>Text based temporary (not stored in database) chat with streaming response with Gemini.</li>
					<li>Set system instruction (context).</li>
					<li>Markdown support.</li>
					<li>Code highlighting.</li>
					<li>Dark mode</li>
				</ul>
			</section>

			<section>
				<h2 className="text-center">Tech Stack</h2>
				<hr />
				<ul>
					<li>Next.js 15+</li>
					<li>React 19+</li>
					<li>Gemini 2.0 Flash</li>
					<li>Firebase 11+</li>
					<li>TypeScript 5+</li>
					<li>Bootstrap 5.3+</li>
					<li>Markdown</li>
				</ul>
			</section>
		</>
	);
}