// src/hooks/useAxiosSecure/index.js
import axios from "axios";
import useAuth from "../UseAuth"; // তোমার Firebase Auth hook
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();


  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut().then(() => navigate("/login"));
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
