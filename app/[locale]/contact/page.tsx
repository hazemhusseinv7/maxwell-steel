import ContactComponent from "./ContactComponent";

export default function Page() {
  return (
    <main>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #1447e6 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <ContactComponent />
        </div>
      </div>
    </main>
  );
}
