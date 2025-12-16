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
            image: urlFor(product.image).url(),
            features: product.features,
            specifications: product.specifications,
          }),
        ) || [],
    },
  ];

  return (
    <section id="products" className="py-40">
      <h2 className="z-200 mx-auto mb-10 w-fit text-center text-4xl font-semibold text-blue-700 lg:text-7xl">
        {t("title")}
      </h2>
      <div className="mx-auto max-w-300">
        <ExpandableCard items={productsData} />
      </div>
    </section>
  );
};

export default Products;
