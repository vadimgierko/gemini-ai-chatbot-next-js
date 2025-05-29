"use client";
import useUser from "@/context/useUser";
import SignInWithGoogleButton from "../SignInWithGoogleButton";

export default function SignInSection() {
    const { user } = useUser();

    if (user) return null;

    return (
        <p className="text-center">
            Sign in with Google to use chat for free.
            <br />
            <SignInWithGoogleButton className="my-2" />
            <br />
            <small>
                *This is needed to prevent abusing app API routes by malicious users.
            </small>
        </p>
    );
}