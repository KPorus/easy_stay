import React from "react";
import DSettings from "@/components/desktop/Settings";
import MSettings from "@/components/mobile/Settings";
import { isMobile } from "@/utils/isMobile";
import { headers } from "next/headers";
const page = () => {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return mobileCheck ? <MSettings /> : <DSettings />;
};

export default page;
