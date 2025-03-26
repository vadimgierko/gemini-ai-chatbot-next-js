"use client";

import useUser from "@/context/useUser";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { Container, NavDropdown } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

export default function Navbar() {
	const { user } = useUser();

	return (
		<header>
			<Container>
				<nav
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						paddingTop: "1em",
					}}
				>
					<div>
						<span>
							<strong>Gemini AI Chatbot</strong>
						</span>
					</div>
					<div>
						<Link href="/chat/temporary">chat</Link> |{" "}
						<Link href="/system-instruction">context</Link> |{" "}
						<Link href="/">about</Link>

						{/* {
							!user && <Button variant="outline-primary" onClick={signInWithGoogle}>
								Sign in with Google
							</Button>
						} */}

						{
							user && <NavDropdown
								className="d-inline-block"
								title={
									<>
										{user.photoURL ? (
											<img
												width={30}
												height={30}
												src={user.photoURL}
												style={{ borderRadius: "50%", marginLeft: "1em" }}
												alt={`${user.displayName} avatar`}
											/>
										) : (
											<BsPersonCircle />
										)}
									</>
								}
								menuVariant="dark"
								drop="down-centered"
							>
								<NavDropdown.Item onClick={() => signOut(auth)}>
									<AiOutlineLogout /> Log out
								</NavDropdown.Item>
							</NavDropdown>
						}
					</div>
				</nav>
				<hr />
			</Container>
		</header>
	);
}
