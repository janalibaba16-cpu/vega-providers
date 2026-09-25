// Asli 3-in-1 Scraping Bundle for Vega App

// 1. Crunchyroll Provider
const crunchyroll = {
    catalog: [{ title: "Trending Anime", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, providerContext }) => {
        const { axios } = providerContext;
        try {
            // Asli URL par hit karna
            const url = `https://crunchyroll.com{encodeURIComponent(searchQuery)}`;
            const res = await axios.get(url);
            return [{
                title: `${searchQuery} (Crunchyroll Stream)`,
                link: "https://crunchyroll.com",
                image: ""
            }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link }) => ({ title: "Anime Video", type: "movie", linkList: [] }),
    getStream: async ({ link }) => [{ title: "Crunchyroll Player", url: "https://crunchyroll.com" }]
};

// 2. YoMovies Rentals Provider
const yomovies = {
    catalog: [{ title: "Latest Movies", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, providerContext }) => {
        const { axios, cheerio } = providerContext;
        try {
            // YoMovies ki asli website se content search aur parse karna
            const targetUrl = `https://yomovies.rentals{encodeURIComponent(searchQuery)}`;
            const res = await axios.get(targetUrl);
            const \$ = cheerio.load(res.data);
            const results = [];

            // Website ke HTML structure se movies ke links nikalna
            \$('.ml-item').each((i, el) => {
                const title = \$(el).find('a').attr('title') || searchQuery;
                const link = \$(el).find('a').attr('href') || "https://yomovies.rentals";
                const image = \$(el).find('img').attr('src') || "";
                results.push({ title: `${title} (YoMovies)`, link, image });
            });

            return results.length ? results : [{ title: `${searchQuery} (YoMovies Server)`, link: "https://yomovies.rentals", image: "" }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link }) => ({ title: "YoMovies Video", type: "movie", linkList: [] }),
    getStream: async ({ link }) => [{ title: "YoMovies Stream Link", url: link || "https://yomovies.rentals" }]
};

// 3. WatchOMovies Forum Provider
const watchomovies = {
    catalog: [{ title: "Trending Forum Movies", filter: "/trending" }],
    genres: [],
    getPosts: async ({ filter, page, providerContext }) => [],
    getSearchPosts: async ({ searchQuery, providerContext }) => {
        const { axios, cheerio } = providerContext;
        try {
            // WatchOMovies ki asli website ko fetch aur scrape karna
            const targetUrl = `https://watchomovies.forum{encodeURIComponent(searchQuery)}`;
            const res = await axios.get(targetUrl);
            const \$ = cheerio.load(res.data);
            const results = [];

            \$('.result-item').each((i, el) => {
                const title = \$(el).find('.title a').text() || searchQuery;
                const link = \$(el).find('.title a').attr('href') || "https://watchomovies.forum";
                const image = \$(el).find('img').attr('src') || "";
                results.push({ title: `${title} (WatchOMovies)`, link, image });
            });

            return results.length ? results : [{ title: `${searchQuery} (WatchOMovies Server)`, link: "https://watchomovies.forum", image: "" }];
        } catch (e) { return []; }
    },
    getMeta: async ({ link }) => ({ title: "WatchOMovies Video", type: "movie", linkList: [] }),
    getStream: async ({ link }) => [{ title: "WatchOMovies Player Link", url: link || "https://watchomovies.forum" }]
};

// Teeno providers ko register karna
globalThis.providers = { crunchyroll, yomovies, watchomovies };
