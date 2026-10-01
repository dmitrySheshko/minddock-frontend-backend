export const documentClientService = {
    async upload(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
            '/api/v1/documents',
            {
                method: 'POST',
                body: formData,
            },
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error ?? 'Upload failed');
        }

        return data;
    },
};