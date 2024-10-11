import { makeSchema, objectType, stringArg } from "nexus";
import path from "path";

// Define the User type
const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("image");
    t.field("createdAt", { type: "String" });
    t.field("updatedAt", { type: "String" });
  },
});

// Define Employee type
const Employee = objectType({
  name: "Employee",
  definition(t) {
    t.string("id");
  },
});

// Define the Mutation type
const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        username: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { username, email, password }, { prisma }) => {
        return await prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });
      },
    });
  },
});

// Define a Query type
const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: async (_, __, { prisma }) => {
        return await prisma.user.findMany();
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User],
  outputs: {
    schema: path.join(process.cwd(), "graphql", "schema.graphql"),
    typegen: path.join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen.ts"
    ),
  },
});
