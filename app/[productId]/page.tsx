import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/sample-data";
import Reviews from "@/components/reviews";
import { Metadata } from "next";
import { StreamingSummary } from "@/components/ai-review-summary";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  let product;
  try {
    product = getProduct(productId);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Product Header */}
        <div>
          <h1 className="text-4xl font-bold">{product?.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            {product?.description}
          </p>
        </div>
        {/* AI Summary */}
        <StreamingSummary product={product} />
        {/* Reviews */}
        <Reviews product={product} />
      </div>
    </main>
  );
};
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    productId: product.slug,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const productId = await params;
  let product;
  try {
    product = getProduct(productId.productId);
  } catch {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${product.name} - Customer Reviews`,
    description: product.description,
  };
}
export default ProductPage;
