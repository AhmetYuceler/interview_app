// api.js

import axios from "axios";

const baseURL = "http://gateway.marvel.com/v1/public";
const apiKey = "4b958d61487caaeac6a82c695619f002";
const hash = "ab2456beba4dd2c84c8f75ac9c3643d2";

export const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${baseURL}/characters`, {
      params: {
        ts: "1",
        apikey: apiKey,
        hash: hash,
      },
    });
    return response.data.data.total || 0;
  } catch (error) {
    throw error;
  }
};

export const fetchSeries = async () => {
  try {
    const response = await axios.get(`${baseURL}/series`, {
      params: {
        ts: "1",
        apikey: apiKey,
        hash: hash,
      },
    });
    return response.data.data.total || 0;
  } catch (error) {
    throw error;
  }
};
