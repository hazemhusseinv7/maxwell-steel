import Image from "next/image";
import Link from "next/link";

import { getLocale } from "next-intl/server";
import { urlFor } from "@/lib/sanity/image";
import { getFeaturesData } from "@/lib/sanity/queries";

import Card from "@/components/Card";

import { MdShoppingCart } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";

const Features = async () => {
  const locale = await getLocale();
  const features: FeaturesType | null = await getFeaturesData(locale);

  const { title, block1, block2, block3 } = features || {};

  const cards = block3?.cards?.map((card) => ({
    title: card.title,
    description: card.description,
    image: urlFor(card.image).url(),
  }));

  return (
    <section className="py-20">
      <h2 className="text-primary-blue z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold lg:text-7xl">
        {title}
      </h2>

      <div className="mx-auto mb-20 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="aspect-16/7">
          <Image
            className="size-full rounded-xl object-cover"
            width={1300}
            height={600}
            src={urlFor(block1?.image).url()}
            alt="Image"
          />
        </div>

        {/* Grid */}
        <div className="mt-5 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-neutral-200">
              <span>{block1?.title} </span>
              <span className="text-primary-blue">Maxwell Steel</span>
            </h2>
            <p className="mt-2 text-gray-500 md:mt-4 dark:text-neutral-500">
              {block1?.description}
            </p>
          </div>
          {/* End Col */}

          <div className="lg:col-span-2">
            <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
              {block1?.items.map(({ title, description, icon }, i) => (
                <div className="flex gap-x-5" key={i}>
                  <Image
                    className="text-primary-blue mt-1 size-6 shrink-0 dark:text-blue-500"
                    width={500}
                    height={800}
                    src={urlFor(icon).url()}
                    alt={title}
                  />
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          <div>
            <h2 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:leading-tight dark:text-white">
              <span>{block2?.title}</span>{" "}
              <span className="text-primary-blue">Maxwell Steel</span>
            </h2>
            <p className="mt-3 text-xl font-medium text-gray-800 dark:text-neutral-400">
              {block2?.heading}
            </p>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
              {block2?.content}
            </p>

            {/* Buttons */}
            <div className="mt-7 grid w-full gap-3 sm:inline-flex">
              {block2?.button1 && (
                <Link
                  className="bg-primary-blue inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                  href={block2?.button1.link}
                >
                  {block2?.button1.title}
                  <IoChevronForward className="size-4 shrink-0 rtl:rotate-180" />
                </Link>
              )}
              {block2?.button2 && (
                <Link
                  className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-2xs transition-colors duration-300 hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  href={block2?.button2.link}
                >
                  {block2?.button2.title}
                  <MdShoppingCart className="size-4 shrink-0" />
                </Link>
              )}
            </div>
            {/* End Buttons */}
          </div>
          {/* End Col */}

          <div className="relative z-10 ms-4">
            <div className="h-50 w-full overflow-hidden rounded-md lg:h-180">
              <Image
                className="size-full object-cover"
                width={500}
                height={800}
                src={urlFor(block2?.image).url()}
                alt="Image"
              />
            </div>
            <div className="absolute inset-0 -z-1 -ms-4 me-4 mt-4 -mb-4 size-full rounded-md bg-linear-to-tr from-blue-300 via-white/0 to-white/0 lg:-ms-6 lg:me-6 lg:mt-6 lg:-mb-6 rtl:bg-linear-to-tl dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      <div className="relative mt-40">
        <Card cards={cards} title={block3?.title} />
      </div>
    </section>
  );
};

export default Features;
