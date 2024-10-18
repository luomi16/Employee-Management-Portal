"use client"
// import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store"; // Adjust the path as needed

const HRVisaMangement = async () => {

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
      <section className="main-container">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is a hr visa management Page
        </h1>
        {/* <p className="mt-4 text-lg">
          Current User email: {session?.user?.email || "None"}
        </p> */}
      </section>
    </main>
  );
};

export default HRVisaMangement;
