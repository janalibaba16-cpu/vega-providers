export const getPosts = async function ({ filter, page, providerContext }) {
  return [];
};

export const getSearchPosts = async function ({ searchQuery, page, providerContext }) {
  const { axios } = providerContext;
  try {
    const searchUrl = `https://crunchyroll.com{encodeURIComponent(searchQuery)}`;
    const response = await axios.get(searchUrl);
    
    return [
      {
        title: `${searchQuery} (Crunchyroll Stream)`,
        link: "https://crunchyroll.com",
        image: ""
      }
    ];
  } catch (error) {
    return [];
  }
};
