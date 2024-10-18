"use client";

import { useQuery, gql } from "@apollo/client";

const GET_REGISTRATION_TOKENS = gql`
  query Query {
    registrationTokenHistory {
      email
      isOnboarded
      name
      tokenExpiration
    }
  }
`;

const RegistrationTokenHistory = () => {
  const { loading, error, data } = useQuery(GET_REGISTRATION_TOKENS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10)); // Convert the timestamp to a number and create a date object
    const now = new Date(); // Get the current date and time

    // Check if the token expiration date is in the past
    if (date < now) {
      return "Expired";
    }

    return date.toLocaleString(); // Return a readable date and time
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Registration History</h2>
      <table className="min-w-full divide-y-2  text-sm divide-gray-700 bg-gray-900">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium  dark:text-white">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium  dark:text-white">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium  dark:text-white">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium  dark:text-white">
              Token Expiration
            </th>
          </tr>
        </thead>
        <tbody className="divide-y  dark:divide-gray-700">
          {data.registrationTokenHistory.map((token: any) => (
            <tr key={token.id} className="odd:bg-gray-800/50">
              {" "}
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {token.email}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {token.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {token.isOnboarded ? "Used" : "Unused"}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-200">
                {formatDate(token.tokenExpiration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTokenHistory;
