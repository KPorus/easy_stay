import DHome from '@/components/desktop/Home';
import MHome from '@/components/mobile/Home';
import { isMobile } from '@/utils/isMobile';
import { headers } from 'next/headers';

const Index = async () => {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    return (
        !mobileCheck ? (
            <DHome />
        ) : (
            <MHome /> 
        )
    );
};

export default Index;
