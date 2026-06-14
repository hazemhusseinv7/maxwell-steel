import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getProductsData, getSettingsData } from "@/lib/sanity/queries";
import { buildAlternates } from "@/lib/seo";
import Products from "@/components/Products";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSettingsData(locale);

  const title = settings?.productsSeoTitle;
  const description = settings?.productsSeoDescription;

  const metadata: Metadata = {
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "ar" ? "ar" : "en",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: buildAlternates(locale, "/products"),
  };

  if (title) metadata.title = title;
  if (description) metadata.description = description;

  return metadata;
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const products: ProductItem[] | null = await getProductsData(locale);

  return (
    <main>
      <Products products={products} />
    </main>
  );
}
