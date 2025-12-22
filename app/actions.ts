"use server";

import { revalidateTag } from "next/cache";

export async function invalidateProductCache(productSlug: string) {
  revalidateTag(`product-summary-${productSlug}`, {}); // Fix: Expected 2 arguments, but got 1.
  revalidateTag(`product-insights-${productSlug}`, {}); // Fix: Expected 2 arguments, but got 1.
}