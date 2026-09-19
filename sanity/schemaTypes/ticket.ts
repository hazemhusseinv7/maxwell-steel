import { HiClock, HiTicket, HiUser, HiUsers } from "react-icons/hi2";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "../../lib/constants";

const messageFields = [
  defineField({
    name: "body",
    title: "Body",
    type: "text",
    rows: 4,
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "authorName",
    title: "Author",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "createdAt",
    title: "Created at",
    type: "datetime",
    validation: (Rule) => Rule.required(),
  }),
];

export const ticket = defineType({
  name: "ticket",
  title: "Ticket",
  type: "document",
  icon: HiTicket,
  initialValue: { status: "open", priority: "medium" },
  groups: [
    { name: "details", title: "Details", icon: HiTicket },
    { name: "requester", title: "Requester", icon: HiUser },
    { name: "staff", title: "Staff", icon: HiUsers },
    { name: "timeline", title: "Timeline", icon: HiClock },
  ],
  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      group: "details",
      readOnly: true,
      description: "Auto-generated (TKT-XXXXXX). Set by the server action.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "requester",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "requester",
      description: "Identity credential for public tracking lookup.",
      validation: (Rule) =>
        Rule.required().regex(/^\+?\d{7,15}$/, "Invalid phone number"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "requester",
      description: "Optional. Used only for the confirmation email.",
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
      options: {
        list: TICKET_CATEGORIES.map((c) => ({
          title: c.label,
          value: c.value,
        })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      group: "details",
      options: {
        list: TICKET_PRIORITIES.map((p) => ({
          title: p.label,
          value: p.value,
        })),
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "details",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attachments",
      title: "Screenshots",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "image" })],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "details",
      options: {
        list: TICKET_STATUSES.map((s) => ({ title: s.label, value: s.value })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned to",
      type: "object",
      group: "staff",
      fields: [
        defineField({ name: "clerkId", title: "Clerk ID", type: "string" }),
        defineField({ name: "name", title: "Name", type: "string" }),
      ],
    }),
    defineField({
      name: "replies",
      title: "Public replies (visible to requester)",
      type: "array",
      group: "staff",
      of: [
        defineArrayMember({
          name: "reply",
          title: "Reply",
          type: "object",
          fields: messageFields,
        }),
      ],
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes (staff only - never public)",
      type: "array",
      group: "staff",
      of: [
        defineArrayMember({
          name: "internalNote",
          title: "Note",
          type: "object",
          fields: messageFields,
        }),
      ],
    }),
    defineField({
      name: "events",
      title: "Timeline events (auto-generated)",
      type: "array",
      group: "timeline",
      of: [
        defineArrayMember({
          name: "event",
          title: "Event",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "actor", title: "Actor", type: "string" }),
            defineField({
              name: "createdAt",
              title: "Created at",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "reference", subtitle: "subject", status: "status" },
    prepare({ title, subtitle, status }) {
      const statusLabel =
        TICKET_STATUSES.find((s) => s.value === status)?.label ?? status;
      return { title, subtitle: `${subtitle ?? ""} - ${statusLabel}` };
    },
  },
});
