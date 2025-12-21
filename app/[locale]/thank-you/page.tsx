"use client";

import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";

export default function Page() {
  const t = useTranslations("ThankYou");

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <Image
          src="/thank-you.svg"
          width={100}
          height={100}
          alt="Image"
          className="size-40 lg:size-70"
        />
        <h1 className="text-primary-blue relative z-20 mx-auto w-fit text-center text-4xl font-semibold lg:text-7xl">
          {t("title")}
        </h1>

        <h1 className="text-primary-blue relative z-20 mx-auto w-fit text-center text-3xl">
          {t("description")}
        </h1>

        <Button
          as="a"
          href="/"
          className="group from-primary-blue/70 to-primary-blue flex gap-1 bg-linear-to-tr text-white"
        >
          <span>{t("button")}</span>
          <GoChevronRight className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Button>
      </div>
    </main>
  );
}
