const BASE_URL = "https://api.tvmaze.com";

export const fetchAllShows = async () => {
  const response = await fetch(`${BASE_URL}/shows`);
  const data = await response.json();
  return data;
};

export const fetchShowDetail = async (showId) => {
  const response = await fetch(`${BASE_URL}/shows/${showId}`);
  const data = await response.json();
  return data;
};

export const searchShows = async (query) => {
  const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  const data = await response.json();
  return data;
};
