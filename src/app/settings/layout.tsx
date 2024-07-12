import type { Metadata } from "next";
import { isMobile } from "@/utils/isMobile";
import { headers } from "next/headers";
import MMenu from "@/components/mobile/Menuber/";
import DMenu from "@/components/desktop/Menuber";

export const metadata: Metadata = {
  title: "Easy stay --[admins platform]",
  description: "It is a administration platform for easy stay customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <>
      {mobileCheck ? (
        <>
          <MMenu />
          {children}
        </>
      ) : (
        <div className="desktop_layout">
          <DMenu />
          {children}
        </div>
      )}
    </>
  );
}
