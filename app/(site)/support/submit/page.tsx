import { FaPaperPlane } from "react-icons/fa6";
import { SubmitForm } from "./submit-form";

interface Props {
  searchParams: Promise<{ fresh?: string }>;
}

export default async function SubmitPage({ searchParams }: Props) {
  const { fresh } = await searchParams;
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
      <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold">
        <FaPaperPlane
          className="text-foreground size-7 shrink-0"
          aria-hidden="true"
        />
        إرسال تذكرة دعم
      </h1>
      <p className="text-muted mt-2 leading-8">
        املأ النموذج التالي وسنرد عليك. ستحصل على رقم مرجع لتتبع طلبك برقم
        جوالك.
      </p>
      <div className="mt-6">
        <SubmitForm fresh={fresh === "1"} />
      </div>
    </main>
  );
}
