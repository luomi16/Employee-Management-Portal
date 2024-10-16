export default function EmployeeInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow p-8">{children}</main>;
}
