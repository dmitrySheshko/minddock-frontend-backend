import {ChatStreamEvent} from "@/features/chat/types/chat.types";

export function encodeEvent(event: ChatStreamEvent): Uint8Array {
    return new TextEncoder().encode(
        `${JSON.stringify(event)}\n`,
    );
}