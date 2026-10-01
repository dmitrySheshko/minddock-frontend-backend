import {ReactNode} from "react";
import LandingHeader from "@/widgets/landing/header";
import LandingFooter from "@/widgets/landing/footer/LandingFooter";

type LayoutProps = {
    children: ReactNode;
};

const LandingDefaultLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-1 flex-col h-full">
            <LandingHeader />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
            <LandingFooter />
        </div>
    );
};
export default LandingDefaultLayout;