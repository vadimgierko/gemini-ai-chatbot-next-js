import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{
            maxWidth: 1024,
            margin: "auto",
            overflow: 'hidden',

            /* Hide the scrollbar in Firefox */
            scrollbarWidth: 'none',
            scrollbarColor: 'transparent transparent',

            /* Style the track (optional) */
            msScrollbarTrackColor: 'transparent',
            display: "flex",
            flexDirection: "column",
            height: "100dvh"
        }}>
            <Navbar />

            <Container
                as="main"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflow: "auto"
                }}
            >
                {children}
            </Container>

            <Footer />
        </div>
    )
}