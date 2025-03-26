"use client";

import useUser from "@/context/useUser";
import { ReactNode } from "react";
import SignInWithGoogleButton from "../SignInWithGoogleButton";

export default function PrivateRoute({ children }: { children: ReactNode }) {
	const { user } = useUser();

	if (!user) return (
		<p className="text-center">
			Sign in with Google to use chat for free 👉{" "}
			<SignInWithGoogleButton />
			<br />
			<small>
				This is needed to prevent abusing app API routes by malicious users.
			</small>
		</p>
	)

	return children;
}