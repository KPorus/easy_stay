import { isMobile } from '@/utils/isMobile';
import { headers } from 'next/headers';
import DSettings from "@/components/desktop/Settings";
import MSettings from "@/components/mobile/Settings";

const Index = async() => {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    return (
        mobileCheck ? <MSettings /> : <DSettings/>
    );
};

export default Index;