import { auth } from "@/auth";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
<<<<<<< Updated upstream
  return (
    <section className="main-container">
=======
  return (    
<section className="main-container">
>>>>>>> Stashed changes
      <h1 className="header-text text-3xl font-bold mt-4">
        This is employee dashboard Page
      </h1>
      <p className="mt-4 text-lg">
        Current User email: {session?.user?.email || "None"}
<<<<<<< Updated upstream
      </p>
    </section>
=======
      </p>    </section>

>>>>>>> Stashed changes
  );
};

export default DashboardPage;
