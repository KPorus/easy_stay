import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
const lato = Lato({ subsets: ["latin"], weight: ["400", "700","900"] });

export const metadata: Metadata = {
  title: "Easy stay --[admins platform]",
  description: "It is a administration platform for easy stay customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="body" className={lato.className}>{children}</body>
    </html>
  );
}
