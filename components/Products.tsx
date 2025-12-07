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
          })
        ) || [],
    },
  ];

  return (
    <section id="products" className="py-40">
      <h2 className="font-semibold text-2xl lg:text-7xl mx-auto w-fit text-teal-700 mb-4 z-200">
        {t("title")}
      </h2>
      <div className="max-w-300 mx-auto">
        <ExpandableCard items={productsData} />
      </div>
    </section>
  );
};

export default Products;
