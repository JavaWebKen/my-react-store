import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useState, useEffect } from "react";

// Hooks
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Run once when the component mounts
  // Mounting is the process of creating and adding the component into DOM
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/products"); // Axios GET Request
      console.log("API Response:", response.data);
      // Ensure we get an array - handle both response.data and response.data.products
      const productsData = Array.isArray(response.data)
        ? response.data
        : response.data?.products || [];
      console.log("Products Data:", productsData);
      setProducts(productsData); // Update products state with fetched data
    } catch (error) {
      console.error("Fetch error:", error);
      console.error("Error details:", error.message);
      setError(
        error.code === "ECONNREFUSED" || error.message.includes("Network Error")
          ? "Backend server is not running. Please start the server on http://localhost:8080"
          : error.response?.data?.message ||
              "Failed to fetch products. Please try again."
      ); // Extract error message if available
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeading title="Buy My Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
}
