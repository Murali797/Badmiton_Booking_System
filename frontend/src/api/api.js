import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});


API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;


export const auth = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
};
export const courtsAPI = {
  getAll: () => API.get("/courts"),
  create: (data) => API.post("/courts", data),
};
export const coachesAPI = {
  getAll: () => API.get("/coaches"),
  create: (data) => API.post("/coaches", data),
};
export const equipmentAPI = {
  getAll: () => API.get("/equipment"),
  create: (data) => API.post("/equipment", data),
};
export const rulesAPI = {
  getAll: () => API.get("/pricingRules"),
  create: (data) => API.post("/pricingRules", data),
  update: (id, data) => API.put(`/pricingRules/${id}`, data),
};
export const bookingsAPI = {
  create: (data) => API.post("/bookings", data),
  getByUser: (email) => API.get(`/bookings/${encodeURIComponent(email)}`),
};
