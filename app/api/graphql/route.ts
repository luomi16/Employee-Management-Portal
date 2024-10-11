import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { schema } from "../../../graphql/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }), // Apollo Studio Explorer
  ],
});

export const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async () => ({ prisma }), // Set up context here
});

export const GET = handler;
export const POST = handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
