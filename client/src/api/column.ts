import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

const createColumn = async (boardId: string, columnName: string) => {
  try {
    const response = await apiClient.post(`/column/create/${boardId}`, {
      columnName,
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

const deleteColumn = async (columnId: string) => {
  try {
    const response = await apiClient.delete(`/column/delete/${columnId}`);

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

export { createColumn, deleteColumn };
