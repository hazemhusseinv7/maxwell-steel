import type { SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { category } from "./category";
import { faq } from "./faq";
import { post } from "./post";
import { series } from "./series";
import { siteSettings } from "./siteSettings";
import { subscriber } from "./subscriber";
import { tag } from "./tag";
import { ticket } from "./ticket";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    category,
    tag,
    author,
    series,
    ticket,
    faq,
    siteSettings,
    subscriber,
  ],
};
