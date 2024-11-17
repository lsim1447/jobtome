import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

// Define in-memory product storage
export let products = [
  {
    id: "1",
    name: "Product A",
    description: "Description of Product A",
    price: 100,
  },
];

// Define schema
export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, description: String!, price: Float!): Product
    deleteProduct(id: ID!): Product
  }
`;

// Define resolvers
export const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((product) => product.id === id),
  },
  Mutation: {
    createProduct: (_, { name, description, price }) => {
      const newProduct = {
        id: `${products.length + 1}`,
        name,
        description,
        price,
      };
      products.push(newProduct);
      return newProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((product) => product.id === id);
      return index !== -1 ? products.splice(index, 1)[0] : null;
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
