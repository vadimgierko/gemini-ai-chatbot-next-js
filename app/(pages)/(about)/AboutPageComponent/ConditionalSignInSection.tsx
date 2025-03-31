"use client";

import SignInSection from "@/components/SignInSection";
import useUser from "@/context/useUser";

export default function ConditionalSignInSection() {
    const { user } = useUser();

    if (user) return null;

    return <SignInSection />
}