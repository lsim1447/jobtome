"use client";

import { gql } from "@apollo/client";
import { useState } from "react";
import client from "../lib/apolloClient";
import { Product } from "../types/product";

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
    <li key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={handleDelete}> Delete </button>
    </li>
  );
};
