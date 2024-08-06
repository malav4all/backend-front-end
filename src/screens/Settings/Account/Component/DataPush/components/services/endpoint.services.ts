import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getEndpoints = async (projectId: any, apiKey: any) => {
  const url = `${API_BASE_URL}/projects/${projectId}/endpoints`;
  try {
    console.log(url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.data.content.map((item: any) => ({
      uid: item.uid,
      url: item.target_url,
      status: item.status,
      name: item.title,
    }));
  } catch (error) {
    throw error;
  }
};

export const toggleEndpointStatus = async (
  projectId: any,
  endpointId: any,
  apiKey: any
) => {
  const url = `${API_BASE_URL}/projects/${projectId}/endpoints/${endpointId}/pause`;
  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEndpoint = async (
  projectId: any,
  payload: any,
  apiKey: any
) => {
  const url = `${API_BASE_URL}/projects/${projectId}/endpoints`;
  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
