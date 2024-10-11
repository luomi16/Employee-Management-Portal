// app/(protected)/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow p-8">
      {children}
    </main>
  );
}
