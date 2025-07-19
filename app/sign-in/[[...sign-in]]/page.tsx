"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  return (
    <section className="flex items-center justify-center lg:min-h-[40vh]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <SignIn redirectUrl={redirect} />
      </div>
    </section>
  );
}
