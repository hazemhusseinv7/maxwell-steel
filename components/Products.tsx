"use client";

import { urlFor } from "@/lib/sanity/image";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/product/ProductCard";

const Products = ({ products }: { products: ProductItem[] | null }) => {
  const t = useTranslations("Products");

  return (
    <section id="products" className="relative py-40">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_54px]" />
      <h2 className="text-primary-blue relative z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold lg:text-7xl">
        {t("title")}
      </h2>
      <div className="mx-auto max-w-300">
        <div className="relative z-20 grid w-full gap-6 px-4 sm:grid-cols-2">
          {products?.map((product, index) => {
            const images =
              product.image
                ?.map((img) => urlFor(img as any).url())
                .filter(Boolean) || [];

            return (
              <ProductCard
                key={index}
                name={product.name}
                slug={product.slug}
                description={product.description}
                images={images}
                categories={product.categories}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
