import { MdPageview } from "react-icons/md";
import { HiChartBar, HiLink, HiShare } from "react-icons/hi2";
import { RiSettingsFill } from "react-icons/ri";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  getPlatformFallbackIcon,
  SOCIAL_PLATFORMS,
} from "../../lib/social-platforms";
import PlatformSelect from "../lib/components/PlatformSelect";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: RiSettingsFill,
  groups: [
    { name: "hero", title: "Hero", icon: MdPageview },
    { name: "links", title: "Links", icon: HiLink },
    { name: "social", title: "Social", icon: HiShare },
    { name: "analytics", title: "Analytics", icon: HiChartBar },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Main hero heading. Press Enter for each new line (lines render as separate rows).",
      group: "hero",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Supporting text under the title. Preserves line breaks.",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "logosTitle",
      title: "Logos Title",
      type: "string",
      group: "hero",
      description:
        'Use | to split muted and highlighted parts, e.g. "بالشراكة مع | نخبة المطورين".',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "partnerLogos",
      title: "Partner Logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "hero",
    }),
    defineField({
      name: "propertiesUrl",
      title: "Properties URL",
      type: "url",
      group: "links",
      description: "External website for browsing properties.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      description: "Select each social platform and add its link URL",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              components: { input: PlatformSelect },
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "Snapchat", value: "snapchat" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Threads", value: "threads" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link URL",
              type: "url",
              placeholder: "https://…",
              validation: (rule) =>
                rule
                  .uri({ scheme: ["http", "https"] })
                  .error("Enter a valid http(s) URL"),
            }),
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare({ platform, url }: { platform?: string; url?: string }) {
              const meta = platform ? SOCIAL_PLATFORMS[platform] : undefined;
              return {
                title:
                  meta?.title ??
                  (platform ? "Unknown platform" : "Select platform"),
                subtitle: url,
                media: meta?.icon ?? getPlatformFallbackIcon(),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "gaMeasurementId",
      title: "Google Analytics Measurement ID",
      type: "string",
      group: "analytics",
      description: 'Google Analytics 4 ID (format "G-XXXXXXXXXX")',
      placeholder: "G-XXXXXXXXXX",
      validation: (Rule) =>
        Rule.regex(/^G-[A-Z0-9]{4,}$/, {
          name: "GA4 measurement ID",
          invert: false,
        }).error('Must look like "G-XXXXXXXXXX"'),
    }),
    defineField({
      name: "gtmId",
      title: "Google Tag Manager ID",
      type: "string",
      group: "analytics",
      description: 'Google Tag Manager container ID (format "GTM-XXXXXXX")',
      placeholder: "GTM-XXXXXXX",
      validation: (Rule) =>
        Rule.regex(/^GTM-[A-Z0-9]+$/, {
          name: "GTM container ID",
          invert: false,
        }).error('Must look like "GTM-XXXXXXX"'),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
