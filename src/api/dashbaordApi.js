import axios from "axios";

const API = "http://localhost:5000";

export const fetchStats = async () => {
  const res = await axios.get(`${API}/stats`);
  return res.data;
};

export const fetchSales = async () => {
  const res = await axios.get(`${API}/sales`);
  return res.data;
};

export const fetchProducts = async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API}/products/${id}`);
};

export const addProduct = async (newProduct) => {
  const res = await axios.post(`${API}/products`, newProduct);
  return res.data;
};

export const updateProduct = async (updatedProduct) => {
  const res = await axios.put(
    `${API}/products/${updatedProduct.id}`,
    updatedProduct
  );
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
};

export const addUser = async (newUser) => {
  const res = await axios.post(`${API}/users`, newUser);
  return res.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API}/users/${id}`);
};

export const updateUser = async (updatedUser) => {
  const res = await axios.put(
    `${API}/users/${updatedUser.id}`,
    updatedUser
  );
  return res.data;
};

export const fetchOrders = async () => {
  const res = await axios.get(`${API}/orders`);
  return res.data;
};

export const deleteOrder = async (id) => {
  await axios.delete(`${API}/orders/${id}`);
};

export const updateOrder = async (updatedOrder) => {
  const  res = await axios.put(
    `${API}/orders/${updatedOrder.id}`,
    updatedOrder
  );
  return res.data;
};