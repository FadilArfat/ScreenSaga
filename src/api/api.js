import axios from "axios";

export const getUpcoming = async (page = 1) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing`,
      {
        params: {
          language: "en-US",
          page: page,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        },
      }
    );
    const { results, total_pages } = response.data;
    return { results, total_pages, page };
  } catch (error) {
    console.error("Error fetching upcoming data:", error);
    throw error;
  }
};

export const getSearch = async ({ keyword, page = 1 }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: keyword,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          // Add any other headers as needed
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching search data:", error);
    throw error;
  }
};