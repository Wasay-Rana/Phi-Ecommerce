import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "@/types/sanity";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function sanityLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return `${src}?w=${width}&q=${quality ?? 75}&auto=format`;
}
