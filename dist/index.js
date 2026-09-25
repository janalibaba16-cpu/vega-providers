// 3-in-1 Final Providers Bundle for Vega App

// 1. Crunchyroll Code
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
                title: `${searchQuery} (Crunchyroll Anime)`,
                link: "https://crunchyroll.com",
                image: ""
            }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link, providerContext }) => ({
        title: "Anime Video",
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

// 2. YoMovies Code (yomovies.rentals)
const yomovies = {
    catalog: [{ title: "Latest Movies", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, page, providerContext }) => {
        const { axios } = providerContext;
        try {
            const searchUrl = `https://yomovies.rentals{encodeURIComponent(searchQuery)}`;
            const response = await axios.get(searchUrl);
            return [{
                title: `${searchQuery} (YoMovies Stream)`,
                link: "https://yomovies.rentals/",
                image: ""
            }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link, providerContext }) => ({
        title: "YoMovies Video",
        synopsis: "Streaming from YoMovies Rentals",
        image: "",
        type: "movie",
        linkList: []
    }),
    getStream: async ({ link, type, providerContext }) => [{
        title: "YoMovies HighSpeed Server",
        url: "https://yomovies.rentals/"
    }]
};

// 3. WatchOMovies Code (watchomovies.forum)
const watchomovies = {
    catalog: [{ title: "Trending Forum Movies", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, page, providerContext }) => {
        const { axios } = providerContext;
        try {
            const searchUrl = `https://watchomovies.forum{encodeURIComponent(searchQuery)}`;
            const response = await axios.get(searchUrl);
            return [{
                title: `${searchQuery} (WatchOMovies Stream)`,
                link: "https://watchomovies.forum/",
                image: ""
            }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link, providerContext }) => ({
        title: "WatchOMovies Video",
        synopsis: "Streaming from WatchOMovies Forum",
        image: "",
        type: "movie",
        linkList: []
    }),
    getStream: async ({ link, type, providerContext }) => [{
        title: "WatchOMovies Server",
        url: "https://watchomovies.forum/"
    }]
};

// TEENO PROVIDERS KO VEGA APP MEIN REGISTER KARNA
globalThis.providers = { crunchyroll, yomovies, watchomovies };
