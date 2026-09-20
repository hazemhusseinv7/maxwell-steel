"use client";
import NextLink from "next/link";
import { FaCopyright } from "react-icons/fa6";
import { AnimatedLogo } from "@/components/animated-logo";
import { FullWidthDivider } from "@/components/full-width-divider";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SocialButtons } from "@/components/social-buttons";
import { formatYearAr } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const siteLinks = [
  { title: "المدونة", href: "/" },
  { title: "الأكثر قراءة", href: "/#most-read" },
];

export function Footer({
  series,
  siteTitle,
  siteDescription,
  propertiesUrl,
  socialLinks,
}: {
  series: { title: string; slug: string }[];
  siteTitle: string[];
  siteDescription: string[];
  propertiesUrl?: string | null;
  socialLinks?: { platform?: string | null; url?: string | null }[];
}) {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4">
      <div
        className={cn(
          "lg:border-border texture-wash relative overflow-hidden lg:border-x",
        )}
      >
        <FullWidthDivider position="top" />
        <div className="grid max-w-6xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-3">
            {siteTitle.length > 0 ? (
              <p className="font-display text-lg font-bold">
                {siteTitle.map((line, i) => (
                  <span key={`${i}-${line}`}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            ) : null}
            {siteDescription.length > 0 ? (
              <p className="text-muted max-w-sm text-sm text-balance">
                {siteDescription.map((line, i) => (
                  <span key={`${i}-${line}`}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            ) : null}
            <SocialButtons links={socialLinks ?? []} />
            <NewsletterSignup />
          </div>
          <div className="col-span-2 w-full md:col-span-1">
            <span className="text-muted text-xs">روابط</span>
            <div className="mt-2 flex flex-col gap-2">
              {siteLinks.map(({ href, title }) => (
                <NextLink
                  className="hover:text-accent w-max text-sm"
                  href={href}
                  key={title}
                >
                  {title}
                </NextLink>
              ))}
              {propertiesUrl ? (
                <a
                  className="hover:text-accent w-max text-sm"
                  href={propertiesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تصفح العقارات
                </a>
              ) : null}
              <NextLink
                className="hover:text-accent w-max text-sm"
                href="/rss.xml"
              >
                RSS
              </NextLink>
            </div>
          </div>
          <div className="col-span-2 w-full md:col-span-1">
            <span className="text-muted text-xs">خدماتنا</span>
            <div className="mt-2 flex flex-col gap-2">
              <NextLink
                className="hover:text-accent w-max text-sm"
                href="/support"
              >
                الدعم
              </NextLink>
              <NextLink
                className="hover:text-accent w-max text-sm"
                href="/support/submit"
              >
                إرسال تذكرة
              </NextLink>
              <NextLink
                className="hover:text-accent w-max text-sm"
                href="/support/track"
              >
                تتبع تذكرة
              </NextLink>
            </div>
          </div>
          {series.length > 0 ? (
            <div className="col-span-2 w-full md:col-span-1">
              <span className="text-muted text-xs">سلسلة المقالات</span>
              <div className="mt-2 flex flex-col gap-2">
                {series.map(({ slug, title }) => (
                  <NextLink
                    className="hover:text-accent w-max text-sm"
                    href={`/blog/series/${slug}`}
                    key={slug}
                  >
                    {title}
                  </NextLink>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <FullWidthDivider />
        <div
          className="border-border border-y px-2 py-4 md:px-8"
          aria-hidden="true"
        >
          <AnimatedLogo className="h-32 w-full md:h-50" />
        </div>
        <div className="flex items-center justify-center gap-2 px-4 py-4">
          <p className="text-muted flex items-center gap-1 text-center text-sm">
            <FaCopyright />
            <span>
              {formatYearAr(new Date())} مدونـة مقرات - جميع الحقوق محفوظة
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
