import { HiQueueList } from "react-icons/hi2";
import { defineArrayMember, defineField, defineType } from "sanity";

export const series = defineType({
  name: "series",
  title: "Series",
  type: "document",
  icon: HiQueueList,
  fieldsets: [
    { name: "content", title: "Content" },
    { name: "ordering", title: "Posts order" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      fieldset: "content",
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      fieldset: "content",
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      fieldset: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "posts",
      title: "Posts (drag to reorder)",
      type: "array",
      fieldset: "ordering",
      description:
        "Array position is the display order everywhere (series page, post navigation, homepage). Posts linked via their Series field but missing here are appended by publish date.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      options: { sortable: true },
      validation: (Rule) =>
        Rule.custom((value) => {
          const refs = (value ?? [])
            .map((item) => (item as { _ref?: string } | null)?._ref)
            .filter(Boolean);
          return refs.length === new Set(refs).size
            ? true
            : "Each post may appear only once - remove the duplicate entry.";
        }),
    }),
  ],
  preview: {
    select: { title: "title", description: "description", posts: "posts" },
    prepare({ title, description, posts }) {
      const count = Array.isArray(posts) ? posts.length : 0;
      return {
        title,
        subtitle: `${description ?? ""} (${count} posts)`.trim(),
      };
    },
  },
});
