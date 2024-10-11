"use client";
import { auth } from "@/auth";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import client from "../../lib/apolloClient";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;

const PersonalInfoPage = () => {
  // const session = await auth();

  const { loading, error, data } = useQuery(GET_USERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="main-container">
      {/* <h1 className="header-text text-3xl font-bold mt-4">
        This is a personal info Page
      </h1>
      <p className="mt-4 text-lg">
        Current User email: {session?.user?.email || "None"}
      </p> */}
      {/* <p className="mt-4 text-lg">Current User email</p> */}
      <h1>User List</h1>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Created At: {user.createdAt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PersonalInfoPage;
