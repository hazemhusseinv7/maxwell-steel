import { getSettingsData } from "@/lib/sanity/queries";
import ContactComponent from "./ContactComponent";

export default async function Page() {
  const settings: SettingsType | null = await getSettingsData();

  return (
    <main className="relative py-10">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, var(--color-primary-blue) 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative z-10 mt-8 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <ContactComponent settings={settings} />
        </div>
      </div>
    </main>
  );
}
