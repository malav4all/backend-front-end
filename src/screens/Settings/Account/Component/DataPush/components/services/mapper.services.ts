import axios from "axios";

const API_BASE_URL_UTILS = process.env.REACT_APP_API_BASE_URL_UTILS;
export const getAllDataFeeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_UTILS}/getAllDataFeeds`);
    return response.data.map((item: any) => ({
      _id: item._id,
      data: item.dynamicData,
    }));
  } catch (error) {
    throw error;
  }
};

export const saveDataFeed = async (payload: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_UTILS}/saveDataFeed`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDataFeedByAccount = async (payload: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_UTILS}/updateDataFeedByAccount`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
