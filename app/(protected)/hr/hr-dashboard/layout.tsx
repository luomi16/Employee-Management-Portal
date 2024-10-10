import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HRDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
