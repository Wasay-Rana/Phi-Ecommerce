import { defineType, defineField } from "sanity";

export const colorVariant = defineType({
  name: "colorVariant",
  title: "Color variant",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "hex",
      type: "string",
      description: "Hex color, e.g. #1a1a1a",
      validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, { name: "hex color" }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "hex" },
  },
});
