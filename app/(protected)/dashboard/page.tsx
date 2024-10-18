import { auth } from "@/auth";
import Link from "next/link";
import ESidebar from "@/components/ESidebar";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="flex">
      <ESidebar />
      <section className="ml-4 main-container">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is employee dashboard Page
        </h1>
        <p className="mt-4 text-lg">
          Current User email: {session?.user?.email || "None"}
        </p>
      </section>
    </main>
  );
};

export default DashboardPage;
