import { SignIn } from "@clerk/nextjs";
import { CornerFrame } from "@/components/corner-frame";

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-start justify-center px-4 py-10">
      <CornerFrame>
        <SignIn routing="path" path="/sign-in" />
      </CornerFrame>
    </main>
  );
}
