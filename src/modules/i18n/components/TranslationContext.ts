import {createContext} from "react";
import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";

export const TranslationContext = createContext<Dictionary | undefined>(undefined);