import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PersonalInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-gray-900 text-white flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">{children}</main>
      <Footer />
    </body>
  );
}
