import Logo from "@/shared/components/logo";

const LandingLegalHeader = () => {
    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Logo/>
            </div>
        </header>
    );
};
export default LandingLegalHeader;