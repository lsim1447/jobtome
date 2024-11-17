"use client";

import { useState } from "react";
import client from "../../../lib/apolloClient";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Float!
  ) {
    createProduct(name: $name, description: $description, price: $price) {
      id
    }
  }
`;

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { name, description, price },
    });
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Product</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit">Create Product</button>
    </form>
  );
}
