import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

const getBoards = async () => {
  try {
    const response = await apiClient.get("/board");

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

const getBoard = async (boardId: string) => {
  try {
    const response = await apiClient.get(`/board/${boardId}`);

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

const deleteBoard = async (id: string) => {
  try {
    const response = await apiClient.delete(`/board/${id}`);

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

const addMembers = async (boardId: string, memberIds: string[]) => {
  try {
    const response = await apiClient.put(`/board/add-members/${boardId}`, {
      memberIds,
    });

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

export { getBoards, getBoard, createBoard, deleteBoard, addMembers };
