export const uploadService = {
    uploadFile: async (file: File, apiEndpoint: string, apiKey: string) => {
        const data = new FormData();
        data.append("files", file);
        return fetch(`${apiEndpoint}/upload`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
        .then((httpResponse) => httpResponse.json())
        .then((data) => {
            return data[0].id;
        });
    },

    uploadFiles: async (files: File[], apiEndpoint: string, apiKey: string) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        return fetch(`${apiEndpoint}/upload`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
        .then((httpResponse) => httpResponse.json())
        .then((data) => data.map((file: any) => file.id));
    },
};