import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: "bearer " + import.meta.env.VITE_APP_TOKEN_TMDB,
};

// main fuction to fetch data with url/ different endpoints

const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default fetchDataFromApi;
