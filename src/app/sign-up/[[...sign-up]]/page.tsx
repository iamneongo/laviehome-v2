"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="site-shell min-h-dvh px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="page-panel w-full max-w-md p-3 md:p-4">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </main>
  );
}

