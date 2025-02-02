import { auth } from "@/auth";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getUserRole } from "@/app/lib/actions";
import { redirect } from "next/navigation";

const HRDashboard = async () => {
  const session = await auth();

  return (
    <main className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="main-container ml-4">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is a hr dashboard Page
        </h1>
        <p className="mt-4 text-lg">
          Current User email: {session?.user?.email || "None"}
        </p>

      </section>
    </main>
  );
};

export default HRDashboard;
