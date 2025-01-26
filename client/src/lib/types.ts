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

export interface User {
  _id: string;
  userName: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Refresh {
  refresh: React.Dispatch<SetStateAction<boolean>>;
  members: User[];
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

// interface User {
//   email: string;
//   userName: string;
//   profilePic?: string;
//   _id: string;
// }

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
