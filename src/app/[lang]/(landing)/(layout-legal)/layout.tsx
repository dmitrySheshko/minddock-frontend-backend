import {ReactNode} from "react";
import LandingLegalHeader from "@/widgets/landing/header/LandingLegalHeader";
import LandingFooter from "@/widgets/landing/footer/LandingFooter";

const LandingLegalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col h-full">
            <LandingLegalHeader/>
            <div className="flex-1">
                {children}
            </div>
            <LandingFooter />
        </div>
    );
};
export default LandingLegalLayout;