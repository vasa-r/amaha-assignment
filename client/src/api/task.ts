import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

const createTask = async (
  taskName: string,
  taskDesc: string,
  dueDate: string,
  priority: string,
  columnId: string = "679583bc2c454d313779d969"
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

export { createTask };
