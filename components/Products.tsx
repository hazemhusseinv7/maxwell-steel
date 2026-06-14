"use client";

import { urlFor } from "@/lib/sanity/image";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { HiArrowRight } from "react-icons/hi2";

const Products = ({ products }: { products: ProductItem[] | null }) => {
  const t = useTranslations("Products");

  return (
    <section id="products" className="relative py-40">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_54px]" />
      <h2 className="text-primary-blue relative z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold lg:text-7xl">
        {t("title")}
      </h2>
      <div className="mx-auto max-w-300">
        <div className="relative z-20 grid w-full gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product, index) => {
            const imageUrl = product.image?.[0]
              ? urlFor(product.image[0] as any).url()
              : null;

            return (
              <Link key={index} href={`/products/${product.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-background flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-md transition-shadow hover:shadow-xl"
                >
                  {/* Image with hover zoom + overlay */}
                  <div className="relative h-44 w-full overflow-hidden sm:h-48 lg:h-52">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Category badges on image */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="absolute top-3 start-3 flex flex-wrap gap-1.5">
                        {product.categories.slice(0, 2).map((cat, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>

                    {/* View Details */}
                    <div className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-medium text-primary-blue">
                      {t("viewDetails")}
                      <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
