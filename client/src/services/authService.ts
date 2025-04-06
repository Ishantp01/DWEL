import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Replace with your backend URL if different

// Register a new user
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

// Login a user
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Login failed';
  }
};