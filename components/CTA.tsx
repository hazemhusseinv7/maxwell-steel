import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { HiArrowRight } from "react-icons/hi2";

const CTA = async () => {
  const t = await getTranslations("ProductPage");

  return (
    <section>
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-20">
        <div className="relative my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-12 text-white shadow-xl shadow-blue-600/20 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_54px]" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-2xl">
              <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
                {t("requestQuote.title")}
              </h2>
              <p className="opacity-90 lg:text-lg">
                {t("requestQuote.description")}
              </p>
            </div>
            <Link
              href="contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-10 py-4 font-semibold text-blue-600 shadow-xl transition hover:scale-[1.02] hover:bg-gray-100"
            >
              {t("requestQuote.button")}
              <HiArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
