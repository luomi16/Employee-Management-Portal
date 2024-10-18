// app/(protected)/create-employee/layout.tsx
export default function CreateEmployeeLayout({
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
  