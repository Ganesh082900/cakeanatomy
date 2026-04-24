import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "CakeAnatomy Dashboard",
  description: "Internal bakery management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
