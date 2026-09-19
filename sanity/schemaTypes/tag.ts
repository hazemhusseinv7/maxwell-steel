import { HiTag } from "react-icons/hi2";
import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: HiTag,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "title" } },
});
