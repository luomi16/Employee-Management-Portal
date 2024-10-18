"use client";

import { useState } from "react";
import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import SendRegistrationToken from "@/components/SendRegistrationToken";
import RegistrationTokenHistory from "@/components/RegistrationTokenHistory";
import PendingApplications from "@/components/PendingApplications";

const HiringManagement = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <main className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="container px-4 mx-auto">
        <h1 className="header-text text-3xl font-bold mt-4">Hiring Manage</h1>
        <SendRegistrationToken />
        <button
          className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {showHistory && <RegistrationTokenHistory />}
        <PendingApplications />
      </section>
    </main>
  );
};

export default HiringManagement;
