"use client";

import { urlFor } from "@/lib/sanity/image";
import ExpandableCard, { CardItem, CardList } from "./expandable-card";
import { useTranslations } from "next-intl";

const Products = ({ products }: { products: ProductsType | null }) => {
  const t = useTranslations("Products");

  const productsData: CardList[] = [
    {
      list:
        products?.productsList?.map(
          (product): CardItem => ({
            name: product.name,
            description: product.description,
            images: product.image?.map((img) => urlFor(img).url()) || [],
            features: product.features,
            specifications: product.specifications,
          }),
        ) || [],
    },
  ];

  return (
    <section id="products" className="relative py-40">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_54px]" />
      <h2 className="text-primary-blue relative z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold lg:text-7xl">
        {t("title")}
      </h2>
      <div className="mx-auto max-w-300">
        <ExpandableCard items={productsData} />
      </div>
    </section>
  );
};

export default Products;
