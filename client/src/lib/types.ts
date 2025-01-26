import React, { SetStateAction } from "react";

export type Board = {
  _id: string;
  boardName: string;
  createdAt: string;
  createdBy: string;
  columns: string[];
  members: string[];
  updatedAt: string;
  __v: number;
};

// interface AssignedUser {
//   // Define the structure for assigned users if available
//   // Add fields like user ID, email, or other details
// }

interface Refresh {
  refresh: React.Dispatch<SetStateAction<boolean>>;
}

export interface Task extends Refresh {
  columnId: string;
  createdAt: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  taskDesc: string;
  taskName: string;
  updatedAt: string;
  __v: number;
  _id: string;
  assignedUsers: string[];
}

interface Column {
  boardId: string;
  columnName: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  __v: number;
  _id: string;
}

interface User {
  email: string;
  userName: string;
  profilePic?: string;
  _id: string;
}

export interface BoardDetailsType {
  boardName: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  createdBy: User;
  members: User[];
}
