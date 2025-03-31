"use client";

import useUser from "@/context/useUser";
import { ReactNode } from "react";
import SignInSection from "../SignInSection";

export default function PrivateRoute({ children }: { children: ReactNode }) {
	const { user } = useUser();

	if (!user) return <SignInSection />

	return children;
}