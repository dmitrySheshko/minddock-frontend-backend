import {createContext} from "react";
import {LanguageContextValue} from "@/modules/i18n/i18n.types";

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);