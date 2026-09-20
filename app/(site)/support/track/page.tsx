import { HiMagnifyingGlass } from "react-icons/hi2";
import { TrackForm } from "./track-form";

interface Props {
  searchParams: Promise<{ ref?: string }>;
}

export default async function TrackPage({ searchParams }: Props) {
  const { ref } = await searchParams;
  return (
    <main className="mx-auto min-h-150 w-full max-w-2xl flex-1 px-4 py-10">
      <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold">
        <HiMagnifyingGlass
          className="text-foreground size-7 shrink-0"
          aria-hidden="true"
        />
        تتبع تذكرة
      </h1>
      <p className="text-muted mt-2 leading-8">
        أدخل رقم المرجع والبريد الإلكتروني أو رقم الجوال المستخدم عند إرسال
        التذكرة.
      </p>
      <div className="mt-6">
        <TrackForm initialRef={ref ?? ""} />
      </div>
    </main>
  );
}
