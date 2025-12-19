import products from "../data/products";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";

export default function Home() {
  return (
    <div className="home-container">
      <PageHeading title="Template App">
        Refactor this into a Recipe Card App
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
}
