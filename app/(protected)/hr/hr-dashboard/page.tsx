"use client"
// import { auth } from "@/auth";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getUserRole } from "@/app/lib/actions";
import { redirect } from "next/navigation";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store"; // Adjust the path as needed

const HRDashboard = async () => {
  // const session = await auth();
  const user = useSelector((state: RootState) => state.user.user); // Get the user from Redux state

  useEffect(() => {
    // Check user role and redirect if not HR
    if (user && user.role !== "HR") {
      redirect("/unauthorized")
    }
  }, [user]);

  return (
    <main className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="main-container ml-4">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is a hr dashboard Page
        </h1>
        {/* <p className="mt-4 text-lg">
          Current User email: {session?.user?.email || "None"}
        </p> */}

      </section>
    </main>
  );
};

export default HRDashboard;
