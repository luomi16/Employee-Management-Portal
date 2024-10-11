// app/(protected)/onboarding-application/layout.tsx

export default function OnboardingApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow p-8">{children}</main>
  );
}
