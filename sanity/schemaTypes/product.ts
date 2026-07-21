import { defineType, defineField } from "sanity";

// Keep in sync with `ProductCategory`/`categoryLabels` in src/types/product.ts and src/data/taxonomy.ts.
// Deliberately duplicated here (not imported) so the Studio bundle never reaches into the Next.js app graph.
const CATEGORY_OPTIONS = [
  { title: "Audio", value: "audio" },
  { title: "Charging", value: "charging" },
  { title: "Wearables", value: "wearables" },
  { title: "Phone Accessories", value: "phone-accessories" },
  { title: "Smart Home", value: "smart-home" },
  { title: "Desk Setup", value: "desk" },
  { title: "3D-Printed Lamps", value: "lamps" },
  { title: "Decor", value: "decor" },
  { title: "STEM Kits", value: "kits" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specs",
      type: "array",
      of: [{ type: "specItem" }],
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare-at price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: CATEGORY_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badges",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Bestseller", value: "bestseller" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "colorVariants",
      title: "Color variants",
      type: "array",
      of: [{ type: "colorVariant" }],
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review count",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
});
