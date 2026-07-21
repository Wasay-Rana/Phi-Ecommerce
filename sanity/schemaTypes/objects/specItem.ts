import { defineType, defineField } from "sanity";

export const specItem = defineType({
  name: "specItem",
  title: "Spec",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
