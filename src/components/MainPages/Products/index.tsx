import { isMobile } from "@/utils/isMobile";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import React from "react";
const DProducts = dynamic(() => import("@/components/desktop/Products"));
const MProducts = dynamic(() => import("@/components/mobile/Products"));
const Index = () => {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <>{mobileCheck ? <MProducts/> : <DProducts/>}</>
  );
};

export default Index;
