import { HiQuestionMarkCircle } from "react-icons/hi2";
import { defineArrayMember, defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  icon: HiQuestionMarkCircle,
  preview: {
    select: { items: "items" },
    prepare({ items }: { items?: unknown[] }) {
      const count = items?.length ?? 0;
      return { title: `FAQ (${count})` };
    },
  },
  fields: [
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
