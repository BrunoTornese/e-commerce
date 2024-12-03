import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <TopMenu />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="px-0 sm:px-10 flex-grow">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
