export const baseURL = import.meta.env.VITE_API_URL

export const SummaryApi = {
    createPost: {
        url: "/api/v1/post",
        method: "post",
    },
    getAllPost: {
        url: '/api/v1/post',
        method: "get"
    },
    getAllTags: {
        url: "/api/v1/tag",
        method: "get"
    },
    createTags: {
        url: "/api/v1/tag",
        method: "post",
    },
}
