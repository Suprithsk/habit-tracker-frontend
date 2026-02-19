import apiClient from "./apiClient";
import { AxiosError } from "axios";
import { RegisterInput, LoginInput, UpdateProfileInput, ChangePasswordInput } from "../schemas/authSchema";
import { User, AuthResponse } from "@/types/types";

export const login = async (credentials: LoginInput): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Something went wrong!");
    }
    throw new Error("Invalid username or password");
  }
};

export const register = async (userInfo: RegisterInput): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post("/auth/register", userInfo);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Something went wrong!");
    }
    throw new Error("Registration failed");
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data.user;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Something went wrong!");
    }
    throw new Error("Failed to fetch user");
  }
};

export const updateProfile = async (data: UpdateProfileInput): Promise<User> => {
  try {
    const response = await apiClient.put("/auth/me", data);
    return response.data.user;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    }
    throw new Error("Failed to update profile");
  }
};

export const changePassword = async (data: ChangePasswordInput): Promise<{ message: string }> => {
  try {
    const response = await apiClient.put("/auth/change-password", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    }
    throw new Error("Failed to change password");
  }
};

// Admin endpoints
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/auth/admin/users");
    return response.data.users;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    }
    throw new Error("Failed to fetch users");
  }
};