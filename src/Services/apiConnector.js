import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Set base URL here
});

export const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method, // HTTP method (e.g., "POST", "GET")
      url, // Endpoint (baseURL is already part of axiosInstance)
      data: Object.keys(bodyData).length ? bodyData : undefined, // Send `data` only if it exists
      headers: Object.keys(headers).length ? headers : undefined, // Add headers only if provided
      params: Object.keys(params).length ? params : undefined, // Include query params if present
    });
    return response; // Return the response data
    
  } catch (error) {
    // console.error("Error in API Connector:", error.response);
    return error.response; // Re-throw the error to handle in calling code
  }
};
