import { auth } from "@/auth";
import Link from "next/link";

const HiringManagementPage = async () => {
  const session = await auth();
  return (
    <section className="main-container">
      <h1 className="header-text text-3xl font-bold mt-4">
        This is a hiring management Page
      </h1>
      <p className="mt-4 text-lg">
        Current User email: {session?.user?.email || "None"}
      </p>
    </section>
  );
};

export default HiringManagementPage;
