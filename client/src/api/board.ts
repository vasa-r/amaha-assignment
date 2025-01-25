import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

const createBoard = async (boardName: string) => {
  try {
    const response = await apiClient.post("/board/create", { boardName });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { createBoard };
