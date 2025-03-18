import { ChickenCareSidebar } from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ChickenCareSidebar />
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
