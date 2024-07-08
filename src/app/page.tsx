import Mstyles from "@/components/mobile/Login/MLogin.module.scss";
import Dstyles from "@/components/desktop/Login/DLogin.module.scss";
import DLogin from "@/components/desktop/Login";
import MLogin from "@/components/mobile/Login/";
import Image from "next/image";
import img from "/public/images/Login1.png";
import { headers } from "next/headers";
import { isMobile } from "@/utils/isMobile";
export default function Home() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <main className={Dstyles.loginContainer}>
      {!mobileCheck ? (
        <div id="ts--desktop-login" className={Dstyles.loginBody}>
          <div className={Dstyles.loginMain}>
            <Image src={img} alt="image" />
            <DLogin />
          </div>
        </div>
      ) : (
        <div id="ts--mobile-login">
          <div className={Mstyles.loginMain}>
            <Image src={img} alt="image" />
            <MLogin />
          </div>
        </div>
      )}
    </main>
  );
}
