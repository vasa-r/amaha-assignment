import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

const createTask = async (
  taskName: string,
  taskDesc: string,
  dueDate: string,
  priority: string,
  columnId: string
) => {
  try {
    const response = await apiClient.post(`/task/create/${columnId}`, {
      taskName,
      taskDesc,
      dueDate,
      priority,
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

const deleteTask = async (taskId: string) => {
  try {
    const response = await apiClient.delete(`/task/delete/${taskId}`);

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

export { createTask, deleteTask };
