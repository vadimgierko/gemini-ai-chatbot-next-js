import Link from "next/link";
import { Container } from "react-bootstrap";

export default function Navbar() {
    return (
        <header>
            <Container>
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: "1em"
                    }}
                >
                    <div>
                        <span>
                            <strong>Gemini AI Chat App</strong>
                        </span>
                    </div>
                    <div>
                        <Link href="/">chat</Link> |{" "}
                        <Link href="/about">about</Link>
                    </div>
                </nav>
                <hr />
            </Container>
        </header>
    )
}