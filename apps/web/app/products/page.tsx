import { ProductItem } from "../../components/ProductItem/ProductItem";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";
import { Product } from "../../types/product";
import styles from "./page.module.css";

const FETCH_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      productUrl
    }
  }
`;

export default async function ProductList() {
  const { products } = (await client.query({ query: FETCH_PRODUCTS })).data;

  return (
    <div className={styles.productListWrapper}>
      <ul className={styles.productList}>
        {products.map((product: Product) => (
          <li key={`product-${product.id}`}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
