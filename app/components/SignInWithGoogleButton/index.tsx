"use client";

import { signInWithGoogle } from "@/lib/signInWithGoogle";
import { Button } from "react-bootstrap";

export default function SignInWithGoogleButton(
    { className = "" }: { className?: string }
) {
    return (
        <Button
            className={className}
            variant="outline-primary"
            onClick={signInWithGoogle}
        >
            Sign in with Google
        </Button>
    );
}