
export default function PersonalInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow p-8">{children}</main>
  );
}
