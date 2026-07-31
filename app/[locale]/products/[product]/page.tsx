import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getProductBySlug,
  getProductSlugs,
  getSettingsData,
} from "@/lib/sanity/queries";
import { Link } from "@/i18n/navigation";
import { GoChevronLeft } from "react-icons/go";
import { RiVerifiedBadgeFill, RiPriceTagFill } from "react-icons/ri";
import {
  HiArrowRight,
  HiShieldCheck,
  HiCog6Tooth,
  HiBuildingStorefront,
  HiTrophy,
  HiCube,
  HiSquares2X2,
  HiQrCode,
} from "react-icons/hi2";
import ProductGallery from "@/components/product/ProductGallery";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ContactComponent from "@/app/[locale]/contact/ContactComponent";
import Testimonials from "@/components/Testimonials";
import { buildAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ product: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product: productSlug } = await params;
  const locale = await getLocale();
  const { product } = await getProductBySlug(productSlug, locale);

  if (!product) return { title: "Product Not Found" };

  const firstImageUrl = product.image?.[0]?.asset?.url;
  const ogImageUrl = product.ogImage?.asset?.url || firstImageUrl;
  const twitterImageUrl = product.twitterImage?.asset?.url || ogImageUrl;

  const title = product.seoTitle || `${product.name} | Maxwell Steel`;
  const description = product.seoDescription || product.description;

  const ogTitle = product.ogTitle || title;
  const ogDescription = product.ogDescription || description;

  const twitterTitle = product.twitterTitle || ogTitle;
  const twitterDescription = product.twitterDescription || ogDescription;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
      locale: locale === "ar" ? "ar" : "en",
    },
    twitter: {
      card:
        (product.twitterCardType as "summary_large_image" | "summary") ||
        "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImageUrl ? [twitterImageUrl] : [],
    },
    alternates: {
      ...buildAlternates(locale, `/products/${productSlug}`),
      ...(product.canonicalUrl ? { canonical: product.canonicalUrl } : {}),
    },
  };

  if (product.seoKeywords) {
    (metadata as Record<string, unknown>).keywords = product.seoKeywords;
  }

  if (product.noIndex) {
    metadata.robots = "noindex, nofollow";
  }

  return metadata;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productSlug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("ProductPage");
  const tProducts = await getTranslations("Products");
  const { product, allProducts } = await getProductBySlug(productSlug, locale);
  const settings = await getSettingsData(locale);
  const productTestimonials = product?.reviews?.length
    ? { testimonials: product.reviews }
    : null;

  if (!product) notFound();

  const imageUrls =
    product.image?.map((img) => img.asset?.url).filter(Boolean) || [];
  const relatedProducts = allProducts.filter((p) => p.slug !== productSlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const productUrl = `${baseUrl}/products/${productSlug}`;

  const youtubeId = product.youtubeUrl
    ? product.youtubeUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
      )?.[1]
    : null;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription || product.description,
    image: imageUrls,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: product.brandName || "Maxwell Steel",
    },
  };

  if (product.material) jsonLd.material = product.material;
  if (product.category) jsonLd.category = product.category;
  if (product.sku) jsonLd.sku = product.sku;
  if (product.mpn) jsonLd.mpn = product.mpn;

  if (productTestimonials?.testimonials?.length) {
    jsonLd.review = productTestimonials.testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.content,
      author: { "@type": "Person", name: t.name },
    }));
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.products"),
        item: `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─────────── Hero Section ─────────── */}
      <section className="overflow-hidden bg-linear-to-b from-blue-50/60 to-transparent pt-24 dark:from-blue-950/20">
        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-20">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.products"), href: "/products" },
              { label: product.name },
            ]}
          />

          <Link
            className="hover:text-primary-blue mb-8 inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-500 transition-colors"
            href="/products"
          >
            <GoChevronLeft className="size-4 shrink-0 rtl:rotate-180" />
            {t("backToProducts")}
          </Link>

          <div className="grid gap-10 pb-12 lg:grid-cols-2 lg:gap-16">
            {/* Gallery with decorative gradient wrapper */}
            <div className="relative min-w-0">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-tr from-blue-200/40 via-transparent to-transparent dark:from-blue-900/20" />
              <div className="lg:sticky lg:top-28 lg:h-fit">
                {youtubeId && (
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${product.name} video`}
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <ProductGallery images={imageUrls} productName={product.name} />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Categories pills */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
                    >
                      <RiPriceTagFill className="size-3 text-blue-500" />
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-primary-blue text-4xl leading-[1.1] font-bold lg:text-5xl xl:text-6xl">
                {product.name}
              </h1>

              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

              {/* Features as gradient pills */}
              {product.features && product.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-primary-blue inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-blue-50 to-blue-100/60 px-4 py-2 text-sm font-medium dark:from-blue-950/40 dark:to-blue-900/20 dark:text-blue-300"
                    >
                      <RiVerifiedBadgeFill className="size-4 shrink-0" />
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="bg-primary-blue inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02] hover:shadow-xl"
                >
                  {t("requestQuote.button")}
                  <HiArrowRight className="size-4 rtl:rotate-180" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-gray-100 pt-6 dark:border-gray-800">
                <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <HiShieldCheck className="size-5 text-green-500" />
                  {t("trust.haccp")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <HiShieldCheck className="size-5 text-green-500" />
                  {t("trust.stainless")}
                </span>
              </div>
            </div>
          </div>

          {/* ─────────── Quick Facts Bar ─────────── */}
          {(product.material || product.category || product.sku) && (
            <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {product.material && (
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-linear-to-br from-white to-blue-50/40 p-5 dark:border-gray-800 dark:from-gray-900 dark:to-blue-950/10">
                  <div className="from-primary-blue flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-blue-700 text-white shadow-md shadow-blue-600/20">
                    <HiCube className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      {t("material")}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {product.material}
                    </p>
                  </div>
                </div>
              )}
              {product.category && (
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-linear-to-br from-white to-blue-50/40 p-5 dark:border-gray-800 dark:from-gray-900 dark:to-blue-950/10">
                  <div className="from-primary-blue flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-blue-700 text-white shadow-md shadow-blue-600/20">
                    <HiSquares2X2 className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      {t("categories")}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {product.category}
                    </p>
                  </div>
                </div>
              )}
              {product.sku && (
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-linear-to-br from-white to-blue-50/40 p-5 dark:border-gray-800 dark:from-gray-900 dark:to-blue-950/10">
                  <div className="from-primary-blue flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-blue-700 text-white shadow-md shadow-blue-600/20">
                    <HiQrCode className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      SKU
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {product.sku}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─────────── CTA Banner ─────────── */}
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-20">
        <section className="relative my-8 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 px-8 py-12 text-white shadow-xl shadow-blue-600/20 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_54px]" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-2xl">
              <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
                {t("requestQuote.title")}
              </h2>
              <p className="opacity-90 lg:text-lg">
                {t("requestQuote.description")}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-10 py-4 font-semibold text-blue-600 shadow-xl transition hover:scale-[1.02] hover:bg-gray-100"
            >
              {t("requestQuote.button")}
              <HiArrowRight className="size-4 rtl:rotate-180" />
            </a>
          </div>
        </section>
      </div>

      {/* ─────────── Content Sections ─────────── */}
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-20">
        {/* Specifications — Alternating row table */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {tProducts("specifications")}
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
              {product.specifications.map((spec, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-blue-50/60 sm:px-6 dark:hover:bg-blue-950/20 ${
                    i % 2 === 0
                      ? "bg-gray-50/50 dark:bg-gray-900/30"
                      : "bg-white dark:bg-transparent"
                  } ${i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}`}
                >
                  <span className="bg-primary-blue/10 text-primary-blue flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Applications — Cards with circular gradient icons */}
        {product.applications && product.applications.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {t("applications")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.applications.map((application, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 p-6 transition-all hover:-translate-y-1 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-600/10 dark:border-blue-900/40 dark:bg-blue-950/30 dark:hover:bg-blue-950/40"
                >
                  <div className="absolute -top-6 left-[-1.5rem] size-24 rounded-full bg-blue-200/40 transition-transform group-hover:scale-150 rtl:right-[-1.5rem] rtl:left-auto dark:bg-blue-900/20" />
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="from-primary-blue flex size-12 items-center justify-center rounded-xl bg-linear-to-br to-blue-700 text-white shadow-md shadow-blue-600/20 transition-transform group-hover:scale-110">
                        <HiCog6Tooth className="size-6" />
                      </div>
                      <span className="text-3xl font-bold text-blue-100 dark:text-blue-900/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {application}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Industries Served — Centered icon circles */}
        {product.industries && product.industries.length > 0 && (
          <section className="bg-linear-to-b from-transparent to-blue-50/40 py-20 dark:to-blue-950/10">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {t("industries")}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {product.industries.map((industry, i) => (
                <div
                  key={i}
                  className="flex w-28 flex-col items-center gap-3 sm:w-32"
                >
                  <div className="from-primary-blue flex size-20 items-center justify-center rounded-full bg-linear-to-br to-blue-700 text-white shadow-lg shadow-blue-600/20 transition-transform hover:scale-105 sm:size-24">
                    <HiBuildingStorefront className="size-9 sm:size-10" />
                  </div>
                  <span className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Manufacturing Capabilities — Numbered timeline */}
        {product.manufacturing && product.manufacturing.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {t("manufacturing")}
              </h2>
            </div>
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="from-primary-blue/40 via-primary-blue/20 absolute start-[19px] top-2 bottom-2 w-0.5 bg-linear-to-b to-transparent" />
              <div className="flex min-w-0 flex-col gap-6">
                {product.manufacturing.map((capability, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="bg-primary-blue relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ring-4 shadow-blue-600/20 ring-white dark:ring-gray-900">
                      {i + 1}
                    </div>
                    <div className="flex-1 rounded-xl border border-gray-100 bg-white px-5 py-3.5 transition-colors hover:border-blue-200 dark:border-gray-800 dark:bg-transparent">
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {capability}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product Advantages — Dark gradient banner cards */}
        {product.advantages && product.advantages.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {t("advantages")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.advantages.map((advantage, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-1"
                >
                  <div className="absolute -top-4 left-[-1rem] size-24 rounded-full bg-white/5 transition-transform group-hover:scale-150 rtl:right-[-1rem] rtl:left-auto" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                      <HiTrophy className="size-5 text-amber-300" />
                    </div>
                    <span className="pt-0.5 text-sm leading-relaxed font-medium">
                      {advantage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────── Testimonials ─────────── */}
        <Testimonials testimonials={productTestimonials} />

        {/* ─────────── Related Products ─────────── */}
        {relatedProducts.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <div className="bg-primary-blue/30 mb-3 h-1 w-12 rounded-full" />
              <h2 className="text-primary-blue text-3xl font-bold lg:text-4xl xl:text-5xl">
                {t("relatedProducts")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProducts.map((related) => {
                const relImages =
                  related.image?.map((img) => img.asset?.url).filter(Boolean) ||
                  [];
                return (
                  <ProductCard
                    key={related.slug}
                    name={related.name}
                    slug={related.slug}
                    description={related.description}
                    images={relImages}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* ─────────── Contact Form ─────────── */}
        <section id="contact" className="scroll-mt-20 py-20">
          <ContactComponent settings={settings} />
        </section>
      </div>
    </main>
  );
}
