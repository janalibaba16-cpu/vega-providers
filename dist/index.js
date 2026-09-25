// Compiled Provider Bundle for Vega App
const crunchyroll = {
    catalog: [{ title: "Trending Anime", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, page, providerContext }) => {
        const { axios } = providerContext;
        try {
            const searchUrl = `https://crunchyroll.com{encodeURIComponent(searchQuery)}`;
            const response = await axios.get(searchUrl);
            return [{
                title: `${searchQuery} (Crunchyroll Stream)`,
                link: "https://crunchyroll.com",
                image: ""
            }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link, providerContext }) => ({
        title: "Anime Movie",
        synopsis: "Streaming directly from Crunchyroll",
        image: "",
        type: "movie",
        linkList: []
    }),
    getStream: async ({ link, type, providerContext }) => [{
        title: "Crunchyroll Server",
        url: "https://crunchyroll.com"
    }]
};

globalThis.providers = { crunchyroll };
