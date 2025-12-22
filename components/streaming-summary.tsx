"use client";
import { Product } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiveStarRating } from "./five-star-rating";
import { useState, useEffect } from "react";

export function StreamingSummary({ product }: { product: Product }) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.stars, 0) /
    product.reviews.length;

  useEffect(() => {
    async function fetchStream() {
      setIsLoading(true);
      setSummary("");
      try {
        const response = await fetch(`/api/summary/${product.slug}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) {
          throw new Error("No reader available");
        }
        setIsLoading(false);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setSummary((prevSummary) => prevSummary + chunk);
        }
      } catch (error) {
        console.log("Error fetching stream:", error);
        setSummary("Failed to fetch summary. Please try again later.");
        setIsLoading(false);
      }
    }
    fetchStream();
  }, [product.slug]);

  return (
    <Card className="w-full max-w-prose p-10 grid gap-10">
      <CardHeader className="items-center space-y-0 gap-4 p-0">
        <div className="grid gap-1 text-center">
          <CardTitle className="text-lg">AI Summary</CardTitle>
          <p className="text-xs text-muted-foreground">
            Based on {product.reviews.length} customer ratings
          </p>
        </div>
        <div className="bg-gray-100 px-3 rounded-full flex items-center py-2 dark:bg-gray-800">
          <FiveStarRating rating={Math.round(averageRating)} />
          <span className="text-sm ml-4 text-gray-500 dark:text-gray-400">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid gap-4">
        <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
          {isLoading ? (
            <span className="animate-pulse">Generating summary...</span>
          ) : (
            summary
          )}
        </p>
      </CardContent>
    </Card>
  );
}
