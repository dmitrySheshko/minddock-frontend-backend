import {FC} from "react";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";
import {FileSearch, MessageSquareText, Upload} from "lucide-react";

const FeaturesSection: FC = async () => {
    const language = await getLanguage();
    const dictionary = await getDictionary(language);

    const featuresSection = dictionary?.pages?.home?.featuresSection;

    return (
        <section
            id="features"
            className="border-t border-gray-200 bg-gray-50 px-6 py-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        {featuresSection?.heading}
                    </h2>
                    <p className="mt-3 text-gray-500">
                        {featuresSection?.description}
                    </p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {featuresSection?.features?.map(({ title, text, icon }) => {
                        let Icon = null;
                        switch (icon) {
                            case 'Upload':
                                Icon = Upload;
                                break;
                            case 'MessageSquareText':
                                Icon = MessageSquareText;
                                break;
                            case 'FileSearch':
                                Icon = FileSearch;
                                break;
                            default:
                                break;
                        }

                        return (
                            <div
                                key={title}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >
                                <div
                                    className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                    {Icon && <Icon size={20}/>}
                                </div>
                                <h3 className="mt-5 font-semibold">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {text}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>

    );
};
export default FeaturesSection;