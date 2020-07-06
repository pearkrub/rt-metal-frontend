import env from "../env";
import axios from "axios";
import store from "store2";

export const login = (payload) => {
  let url = `${env.api_endpoint}/api/login`;
  return axios.post(url, payload);
};

export const getUserProfile = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/user`;
  return axios.get(url, config);
};

export const getDistribute = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
    params: payload,
  };
  let url = `${env.api_endpoint}/api/distributor`;
  return axios.get(url, config);
};

export const postDistribute = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/distributor`;
  return axios.post(url, payload, config);
};
