import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = "2026-07-19";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // No CDN layer: revalidation is webhook-driven via Next's tagged fetch cache,
  // and Sanity's own CDN has an independent ~60s staleness that would undercut that.
  useCdn: false,
});
