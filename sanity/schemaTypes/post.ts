import { HiDocumentText, HiTag } from "react-icons/hi2";
import { RiSettingsFill } from "react-icons/ri";

import { defineArrayMember, defineField, defineType } from "sanity";

import { getYouTubeId } from "../../lib/constants";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: HiDocumentText,
  groups: [
    { name: "content", title: "Content", icon: HiDocumentText },
    { name: "taxonomy", title: "Taxonomy", icon: HiTag },
    { name: "settings", title: "Settings", icon: RiSettingsFill },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "content",
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
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
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
        defineArrayMember({ type: "faq" }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      group: "content",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "content",
      validation: (Rule) =>
        Rule.custom((url) => {
          if (!url) return true;
          return getYouTubeId(url)
            ? true
            : "Must be a valid YouTube URL (watch, embed, shorts, or youtu.be)";
        }),
    }),
    defineField({
      name: "videoCaption",
      title: "Video caption",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "taxonomy",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "taxonomy",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "series" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "number",
      group: "settings",
      initialValue: 0,
      readOnly: true,
      description: "Anonymous like counter. Incremented by the like API only.",
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "number",
      group: "settings",
      initialValue: 0,
      readOnly: true,
      description:
        "Auto-counted post views (one per browser session). Incremented by the view API only.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "broadcastSentAt",
      title: "Broadcast sent at",
      type: "datetime",
      group: "settings",
      readOnly: true,
      description:
        "Set automatically after the new-post email goes to confirmed subscribers. Clear it to resend on the next publish webhook.",
    }),
    defineField({
      name: "broadcastId",
      title: "Broadcast ID",
      type: "string",
      group: "settings",
      readOnly: true,
      description:
        "Resend broadcast id for this post (analytics in the Resend dashboard). Clear alongside Broadcast sent at to resend.",
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "cover" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "no author", media };
    },
  },
});
