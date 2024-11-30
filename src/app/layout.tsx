import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
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
			<body>{children}</body>
		</html>
	);
}
