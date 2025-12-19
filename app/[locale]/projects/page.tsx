import { getProductsData } from "@/lib/sanity/queries";

import Projects from "@/components/Projects";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const products: ProductsType | null = await getProductsData(locale);

  return (
    <main>
      <Projects />

      {/* <Products products={products} /> */}
    </main>
  );
}
