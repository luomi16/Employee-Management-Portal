export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow p-8">{children}</main>;
}
