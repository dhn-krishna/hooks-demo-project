import axiosInstance from "utils/axios";

export const apiGet = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiGetWithToken = async (url, token) => {
  const response = await axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.data;
};
export const apiPost = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response;
};
export const apiPostWithToken = async (url, token, data) => {
  const response = await axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      //"Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};
export const apiPut = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response;
};
export const apiPutWithToken = async (url, token, data) => {
  const response = await axiosInstance.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    //body: JSON.stringify(data),
  });
  return response;
};
export const apiDelete = async (url) => {
  const response = await axiosInstance.delete(url);
  return response;
};
export const apiDeleteWithToken = async (url, token) => {
  const response = await axiosInstance.delete(url,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    //body: JSON.stringify(data),
  });
  return response;
};
