import 'server-only';

import { documentRepository } from '@/db/repositories/document.repository';

export const documentServerService = {
    getUserDocuments(userId: string) {
        return documentRepository.findByUser(userId);
    },
};