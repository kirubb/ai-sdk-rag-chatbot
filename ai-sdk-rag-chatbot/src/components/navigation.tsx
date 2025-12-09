"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/nextjs";
import { deleteUserData } from "@/lib/user-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="border-b border-(--foreground)/10">
      <div className="flex container h-16 items-center justify-between px-4  mx-auto">
        
        <Link 
          href="/" 
          className="inline-flex items-center text-2xl font-bold text-foreground transition-colors hover:text-muted-foreground/80"
        >
          RAG Chatbot
        </Link>

        <div className="flex gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <CustomSignOut />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

const CustomSignOut = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await deleteUserData();
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};