import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Layout from "./components/Layout";
import { ChatProvider } from "./context/useChat";
import { UserProvider } from "./context/useUser";
import { generateRouteMetadata } from "./lib/metadata";

export const metadata = generateRouteMetadata({
	isPrivate: false, routeTitle: "", slug: ""
});

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
				<UserProvider>
					<ChatProvider>
						<Layout>{children}</Layout>
					</ChatProvider>
				</UserProvider>
			</body>
		</html>
	);
}
