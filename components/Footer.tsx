import Link from "next/link";
import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";
import { getSettingsData, getProjectsData } from "@/lib/sanity/queries";
import {
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa6";
import { RiWhatsappLine } from "react-icons/ri";

const Footer = async () => {
  const locale = await getLocale();
  const t = await getTranslations("Footer");

  const [settings, projects] = await Promise.all([
    getSettingsData(),
    getProjectsData(locale),
  ]);

  const hasProjects = projects?.images && projects.images.length > 0;

  const links = [
    {
      title: t("links.link-1"),
      href: "/products",
    },
    ...(hasProjects ? [{ title: t("links.link-2"), href: "/projects" }] : []),
    {
      title: t("links.link-3"),
      href: "/why-us",
    },
    {
      title: t("links.link-4"),
      href: "/about-us",
    },
    {
      title: t("links.link-5"),
      href: "/blog",
    },
    {
      title: t("links.link-6"),
      href: "/contact",
    },
  ];

  const socialMedia = [
    {
      name: "LinkedIn",
      link: settings?.linkedin,
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      link: settings?.twitter,
      icon: FaXTwitter,
    },
    {
      name: "TikTok",
      link: settings?.tiktok,
      icon: FaTiktok,
    },
    {
      name: "Instagram",
      link: settings?.instagram,
      icon: FaInstagram,
    },
    {
      name: "Snapchat",
      link: settings?.snapchat,
      icon: FaSnapchat,
    },
    {
      name: "WhatsApp",
      link: settings?.whatsapp,
      icon: RiWhatsappLine,
    },
    {
      name: "Facebook",
      link: settings?.facebook,
      icon: FaFacebook,
    },
    {
      name: "YouTube",
      link: settings?.youtube,
      icon: FaYoutube,
    },
  ].filter((item) => item.link);

  return (
    <footer className="border-t py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/" className="mx-auto block size-fit">
          <Image
            src="/logo/logo.png"
            width={512}
            height={187}
            alt="Logo"
            className="h-auto w-32"
          />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground block transition-colors duration-300 hover:text-blue-700"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {socialMedia.map(({ name, link, icon: Icon }, i) => (
            <Link
              key={i}
              href={link!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-muted-foreground transition-colors duration-300 hover:text-blue-700"
            >
              <Icon className="size-6" />
            </Link>
          ))}
        </div>

        <p className="text-muted-foreground flex items-center justify-center gap-1 text-center text-sm">
          <FaRegCopyright className="inline" />
          <span>{new Date().getFullYear()}</span>
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-blue-700"
          >
            Maxwell Steel
          </Link>
          <span>{t("copyright")}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
