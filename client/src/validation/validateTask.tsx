import { TaskType } from "../components/Main/AddTask";

export type TaskError = {
  taskName: string;
  taskDesc: string;
  dueDate: string;
  priority: string;
};

const validateNewTask = (values: TaskType) => {
  const errors: Partial<TaskError> = {};

  if (!values.taskName) {
    errors.taskName = "Task name is required";
  }

  if (!values.taskDesc) {
    errors.taskDesc = "Task description is required";
  }

  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  }

  if (!values.priority) {
    errors.priority = "Please select priority";
  }

  return errors;
};

export default validateNewTask;
