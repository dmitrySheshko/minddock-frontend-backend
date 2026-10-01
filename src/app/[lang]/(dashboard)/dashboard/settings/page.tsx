const DashboardPageSettings = () => {
    return (
        <div>
            <header className="flex h-16 items-center border-b border-gray-200 bg-white px-8">
                <h1 className="font-semibold">
                    Settings
                </h1>
            </header>

            <div className="p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
                        <h2 className="font-semibold">
                            Settings section
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Settings list
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="font-semibold">
                            Settings section
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Settings list
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPageSettings;