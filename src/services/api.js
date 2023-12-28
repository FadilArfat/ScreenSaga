import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
});

export const getUpcoming = async ({ pageParam }) => {
  try {
    return (
      await axiosInstance.get(`${BASE_URL}/now_playing`, {
        params: {
          language: "en-US",
          page: pageParam,
          limit: 20,
        },
      })
    ).data;
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
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching search data:", error);
    throw error;
  }
};

export const getDetails = async ({ movieId }) => {
  return (
    await axiosInstance.get(`${BASE_URL}/${movieId}?language=en-US`, {
      params: {
        append_to_response: "credits",
      },
    })
  ).data;
};
