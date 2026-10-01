import {createContext} from "react";
import {ChatContextValue} from "@/features/chat/types/chat.types";

export const ChatContext = createContext<ChatContextValue | undefined>(undefined);