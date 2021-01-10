import env from "../env";
import axios from "axios";
import store from "store2";

export const login = (payload) => {
  let url = `${env.api_endpoint}/api/auth/login`;
  return axios.post(url, payload);
};

export const getUserProfile = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/user/me`;
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

export const updateDistribute = (payload, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/distributor/${id}`;
  return axios.put(url, payload, config);
};

export const deleteDistribute = (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/distributor/${id}`;
  return axios.delete(url, config);
};
export const getProduct = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
    params: payload,
  };
  let url = `${env.api_endpoint}/api/product`;
  return axios.get(url, config);
};

export const postProduct = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/product`;
  return axios.post(url, payload, config);
};

export const updateProduct = (payload, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/product/${id}`;
  return axios.put(url, payload, config);
};

export const deleteProduct = (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/product/${id}`;
  return axios.delete(url, config);
};

export const getPurchase = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
    params: payload,
  };
  let url = `${env.api_endpoint}/api/purchase`;
  return axios.get(url, config);
};

export const createPurchase = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/purchase`;
  return axios.post(url, payload, config);
};

export const getPurchaseById = (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/purchase/${id}`;
  return axios.get(url, config);
};

export const updateStatusPurchase = (id, payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/purchase/${id}/status`;
  return axios.post(url, payload, config);
};

export const updatePurchaseInventory = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/inventory/stockIn`;
  return axios.post(url, payload, config);
};

export const generatePurchasePDF = (id, payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/purchase/${id}/generatePdf`;
  return axios.post(url, payload, config);
};

export const getMasterData = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/master`;
  return axios.get(url, config);
};

export const getUser = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
    params: payload,
  };
  let url = `${env.api_endpoint}/api/user`;
  return axios.get(url, config);
};

export const postUser = (payload) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/user`;
  return axios.post(url, payload, config);
};

export const updateUser = (payload, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + store.session.get("accessToken"),
    },
  };
  let url = `${env.api_endpoint}/api/user/${id}`;
  return axios.patch(url, payload, config);
};
