import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

// Define in-memory product storage
export let products = [
  {
    id: "1",
    name: "Apple AirPods Pro (2nd Generation)",
    description:
      "High-quality wireless earbuds with active noise cancellation and spatial audio.",
    price: 249,
    productUrl:
      "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SX679_.jpg",
  },
  {
    id: "2",
    name: "Fitbit Charge 5 Advanced Fitness Tracker",
    description:
      "Fitness tracker with GPS, stress management, and sleep tracking.",
    price: 129.95,
    productUrl:
      "https://m.media-amazon.com/images/I/71pK7GtMi2L._AC_SX679_.jpg",
  },
  {
    id: "3",
    name: "GoPro HERO11 Black Action Camera",
    description:
      "Capture your adventures in 5.3K resolution with advanced stabilization.",
    price: 399.99,
    productUrl:
      "https://m.media-amazon.com/images/I/81eJg8CnF-L._AC_SX679_.jpg",
  },
  {
    id: "4",
    name: "Herman Miller Aeron Ergonomic Chair",
    description:
      "Premium ergonomic office chair with adjustable support and breathable mesh.",
    price: 1445,
    productUrl:
      "https://m.media-amazon.com/images/I/61mtZOTXSeL._AC_SX679_.jpg",
  },
  {
    id: "5",
    name: "Razer DeathAdder V3 Pro Gaming Mouse",
    description:
      "Ultra-lightweight wireless gaming mouse with 30K DPI optical sensor.",
    price: 149.99,
    productUrl:
      "https://m.media-amazon.com/images/I/71CFsCzOL9L._AC_SX679_.jpg",
  },
  {
    id: "6",
    name: "Segway Ninebot MAX Electric Scooter",
    description: "Foldable electric scooter with a range of up to 40 miles.",
    price: 799.99,
    productUrl:
      "https://m.media-amazon.com/images/I/61rNf4B9XAL._AC_SX679_.jpg",
  },
  {
    id: "7",
    name: "Anker Nebula Capsule Mini Projector",
    description:
      "Compact, portable projector with 100 ANSI lumens and 360° speaker.",
    price: 299.99,
    productUrl:
      "https://m.media-amazon.com/images/I/71SxQxk0rxL._AC_SX679_.jpg",
  },
  {
    id: "8",
    name: "Sony WF-1000XM4 Noise Cancelling Earbuds",
    description:
      "True wireless earbuds with industry-leading noise cancellation.",
    price: 278,
    productUrl:
      "https://m.media-amazon.com/images/I/71SWbXqXmnL._AC_SX679_.jpg",
  },
  {
    id: "9",
    name: "Hydro Flask Wide Mouth Water Bottle",
    description:
      "Durable, insulated water bottle with a straw lid for hydration on the go.",
    price: 49.95,
    productUrl:
      "https://m.media-amazon.com/images/I/61wXBKJZy6L._AC_SX679_.jpg",
  },
  {
    id: "10",
    name: "Echo Dot (5th Gen) Smart Speaker",
    description: "Compact smart speaker with Alexa and improved sound quality.",
    price: 49.99,
    productUrl:
      "https://m.media-amazon.com/images/I/61MbLLagiVL._AC_SX679_.jpg",
  },
  {
    id: "11",
    name: "Dell UltraSharp 27 Monitor",
    description:
      "27-inch 4K UHD monitor with HDR support for professional use.",
    price: 649.99,
    productUrl:
      "https://m.media-amazon.com/images/I/71eDW9UrfPL._AC_SX679_.jpg",
  },
  {
    id: "12",
    name: "Logitech MX Master 3S Mouse",
    description:
      "Advanced wireless mouse with ergonomic design and precise control.",
    price: 99.99,
    productUrl:
      "https://m.media-amazon.com/images/I/71fnj3qDbVL._AC_SX679_.jpg",
  },
  {
    id: "13",
    name: "Canon EOS R50 Mirrorless Camera",
    description:
      "Compact mirrorless camera with 24.2 MP sensor and 4K video recording.",
    price: 679,
    productUrl:
      "https://m.media-amazon.com/images/I/71CM6zESbAL._AC_SX679_.jpg",
  },
  {
    id: "14",
    name: "Ninja Foodi DualZone Air Fryer",
    description:
      "Air fryer with two independent cooking zones for versatility.",
    price: 169.99,
    productUrl:
      "https://m.media-amazon.com/images/I/81RcAB2d8kL._AC_SX679_.jpg",
  },
  {
    id: "15",
    name: "Apple Watch Series 8",
    description:
      "Smartwatch with advanced health monitoring and fitness tracking features.",
    price: 399,
    productUrl:
      "https://m.media-amazon.com/images/I/71fwbMm1NBL._AC_SX679_.jpg",
  },
];

// Define schema
export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    productUrl: String
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      productUrl: String
    ): Product
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
        productUrl: "",
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
