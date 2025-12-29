import React from "react";
import ProductCard from "./ProductCard";

export default function ProductListings({ products }) {
  // Safeguard: ensure products is an array
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {productList.length > 0 ? (
          productList.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
