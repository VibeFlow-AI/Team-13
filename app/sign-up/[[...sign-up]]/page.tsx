import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex items-center justify-center select-none lg:min-h-[40vh]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <SignUp />
      </div>
    </section>
  );
}
