// // pages/api/graphql.ts

// import { ApolloServer } from "@apollo/server";
// import { startServerAndCreateNextHandler } from "@as-integrations/next";
// import { PrismaClient } from "@prisma/client";
// import { gql } from "graphql-tag";

// const prisma = new PrismaClient();

// // Define GraphQL schema
// const typeDefs = gql`
//   enum Role {
//     HR
//     EMPLOYEE
//   }

//   enum OnboardingStatus {
//     PENDING
//     COMPLETED
//     REJECTED
//   }

//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     role: Role!
//     createdAt: String!
//     updatedAt: String!
//   }

//   type Employee {
//     id: ID!
//     firstName: String!
//     lastName: String!
//     department: String!
//     position: String!
//     startDate: String!
//     onboardingStatus: OnboardingStatus!
//     createdAt: String!
//     updatedAt: String!
//   }

//   type Query {
//     users: [User!]!
//     employees: [Employee!]!
//   }
// `;

// // Define GraphQL resolvers
// const resolvers = {
//   Query: {
//     users: async () => {
//       return prisma.user.findMany();
//     },
//     employees: async () => {
//       return prisma.employee.findMany();
//     },
//   },
// };

// // Initialize Apollo Server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// export default startServerAndCreateNextHandler(server);

import { ApolloServer } from "apollo-server-micro";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "../../graphql/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  schema,
  context: () => ({ prisma }),
  plugins: [
    require("apollo-server-plugin-landing-page-graphql-playground").ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export async function POST(req: NextRequest) {
  await startServer;
  const response = await apolloServer.createHandler({
    path: "/api/graphql",
  })(req as any, NextResponse as any);

  return response;
}
