import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freedom Leg - Hands-Free Mobility for Injury Recovery",
  description: "Revolutionary hands-free crutch alternative. Complete off-loading for foot, ankle, lower leg, and knee injuries. Walk naturally with both hands free during recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
