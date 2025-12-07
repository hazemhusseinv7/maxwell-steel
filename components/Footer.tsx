import Link from "next/link";
// import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { getSettingsData } from "@/lib/sanity/queries";
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
  const t = await getTranslations("Footer");

  const settings: SettingsType | null = await getSettingsData();

  const links = [
    {
      title: t("links.link-1"),
      href: "/products",
    },
    {
      title: t("links.link-2"),
      href: "/about-us",
    },
    {
      title: t("links.link-3"),
      href: "/blog",
    },
    {
      title: t("links.link-4"),
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
    <footer className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <Image
            src="/logo/logo.png"
            width={80}
            height={80}
            alt="Logo"
            className="size-20"
          />
        </Link> */}

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-teal-700 block transition-colors duration-300"
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
              className="text-muted-foreground hover:text-teal-700 transition-colors duration-300"
            >
              <Icon className="size-6" />
            </Link>
          ))}
        </div>

        <p className="flex items-center justify-center gap-1 text-muted-foreground text-center text-sm">
          <FaRegCopyright className="inline" />
          <span>{new Date().getFullYear()}</span>
          <Link
            href="/"
            className="hover:text-teal-700 transition-colors duration-300"
          >
            Fine Edge
          </Link>
          <span>{t("copyright")}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
