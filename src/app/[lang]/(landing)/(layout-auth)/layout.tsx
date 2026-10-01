import {ReactNode} from "react";
import LandingLegalHeader from "@/widgets/landing/header/LandingLegalHeader";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col h-full">
            <LandingLegalHeader/>
            <div className="flex flex-1 items-center justify-center">
                {children}
            </div>
        </div>
    );
};
export default AuthLayout;