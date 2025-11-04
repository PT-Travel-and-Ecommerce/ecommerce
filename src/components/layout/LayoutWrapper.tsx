"use client";

import { usePathname } from "next/navigation";
import TopBanner from "./Banner/TopBanner";
import TopNavbar from "./Navbar/TopNavbar";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Skip layout for all admin pages
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Return with TopBanner, TopNavbar, content, and Footer
  return (
    <>
      <TopBanner />
      <TopNavbar />
      {children}
      <Footer />
    </>
  );
}
