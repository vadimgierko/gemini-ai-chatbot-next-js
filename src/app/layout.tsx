import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
	authors: [{ name: "Vadim Gierko", url: "https://vadimgierko.com" }],
	title: "Gemini AI Chat Next.js",
	description: "Gemini AI chat written in TypeScript & Next.js",
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
			<body>{children}</body>
		</html>
	);
}
