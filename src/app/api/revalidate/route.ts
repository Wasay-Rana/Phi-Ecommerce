import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, process.env.SANITY_REVALIDATE_SECRET!))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const { _type, slug } = JSON.parse(body) as { _type?: string; slug?: string };
  if (_type !== "product") {
    return NextResponse.json({ revalidated: false });
  }

  // "max" = recommended stale-while-revalidate window in Next 16's revalidateTag API
  revalidateTag("products", "max");
  if (slug) revalidateTag(`product:${slug}`, "max");

  return NextResponse.json({ revalidated: true });
}
