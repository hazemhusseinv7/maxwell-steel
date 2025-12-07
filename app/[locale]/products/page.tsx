import { getProductsData } from "@/lib/sanity/queries";

import Products from "@/components/Products";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const products: ProductsType | null = await getProductsData(locale);

  return (
    <main>
      <Products products={products} />
    </main>
  );
}
