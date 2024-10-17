"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

// GraphQL mutation for sending registration token
const SEND_REGISTRATION_TOKEN = gql`
  mutation Mutation($name: String!, $email: String!) {
    sendRegistrationToken(name: $name, email: $email) {
      id
      name
    }
  }
`;

const SendRegistrationToken = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sendToken, { loading, error, data }] = useMutation(
    SEND_REGISTRATION_TOKEN
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendToken({ variables: { name, email } });
      setName(""); // Reset the form fields after successful submission
      setEmail("");
    } catch (err) {
      console.error("Error while sending registration token:", err);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Send Registration Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Sending..." : "Send Registration Link"}
        </button>
      </form>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}

      {/* Display success message if mutation is successful */}
      {data && data.sendRegistrationToken && (
        <p className="text-white mt-2">Registration token sent successfully!</p>
      )}
    </div>
  );
};

export default SendRegistrationToken;
