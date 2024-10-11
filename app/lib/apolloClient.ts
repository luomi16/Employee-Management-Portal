// lib/apolloClient.ts

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.API_URL || "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
