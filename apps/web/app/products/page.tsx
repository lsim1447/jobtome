import { ProductItem } from "../../components/ProductItem";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";
import { Product } from "../../types/product";

const FETCH_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
    }
  }
`;

export default async function ProductList() {
  const { products } = (await client.query({ query: FETCH_PRODUCTS })).data;

  return (
    <div>
      <ul>
        {products.map((product: Product) => (
          <ProductItem key={`product-${product.id}`} product={product} />
        ))}
      </ul>
    </div>
  );
}
