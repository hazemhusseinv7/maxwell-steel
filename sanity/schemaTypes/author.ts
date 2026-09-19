import { HiUsers } from "react-icons/hi2";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: HiUsers,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(1000),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "x", title: "X (Twitter) URL", type: "url" }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "avatar" },
  },
});
