import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";

const HRVisaMangement = async () => {
  const session = await auth();
  return (
    <main className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="main-container">
        <h1 className="header-text text-3xl font-bold mt-4">
          This is a hr visa management Page
        </h1>
        <p className="mt-4 text-lg">
          Current User email: {session?.user?.email || "None"}
        </p>
      </section>
    </main>
  );
};

export default HRVisaMangement;
