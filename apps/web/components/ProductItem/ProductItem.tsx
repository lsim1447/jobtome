"use client";

import { gql } from "@apollo/client";
import { useState } from "react";
import client from "../../lib/apolloClient";
import { Product } from "../../types/product";
import styles from "./ProductItem.module.css";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const ProductItem = ({ product }: ProductItemProps) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      await client.mutate({
        mutation: DELETE_PRODUCT,
        variables: { id: product.id },
      });
      setIsDeleted(true); // Mark as deleted
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  if (isDeleted) {
    return null; // Remove the item from the UI
  }

  return (
    <li className={styles.productItem}>
      <div className={styles.productImageWrapper}>
        <Image
          src={product.productUrl || ""}
          alt={product.name}
          width={300} // Adjust as needed
          height={200} // Adjust as needed
        />
      </div>
      <div className={styles.productDetails}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </li>
  );
};
