import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Layout from "./components/Layout";
import { ChatProvider } from "./context/useChat";

export const metadata: Metadata = {
	authors: [{ name: "Vadim Gierko", url: "https://github.com/vadimgierko" }],
	title: "Gemini AI Chat App Next.js",
	description:
		"Gemini AI Chat App written in Next.js 15+, React 19 & TypeScript 5+",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-bs-theme="dark">
			<head>
				{
					// css for highlighting code in vs2015 dark mode style (without this rehype-highlight will not be highlighting)
				}
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.css"
				/>
			</head>
			<body>
				<ChatProvider>
					<Layout>{children}</Layout>
				</ChatProvider>
			</body>
		</html>
	);
}
