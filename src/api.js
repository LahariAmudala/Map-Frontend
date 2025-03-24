import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const fetchDashboardData = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch dashboard data';
  }
};

export const fetchHealth = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch health check data';
  }
};
