import Review from "./review";
import { Product } from "@/lib/types";
import { Separator } from "./ui/separator";

const Reviews = ({ product }: { product: Product }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-6">
        {product.reviews.map((review, index) => (
          <div key={index}>
            <Review review={review} />
            {index < product.reviews.length - 1 && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
