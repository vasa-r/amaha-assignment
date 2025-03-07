import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Modal from "../UtilsUI/Modal";
import Input from "../UtilsUI/Input";
import Loader from "../Loaders/Loader";
import validateNewTask, { TaskError } from "../../validation/validateTask";
import toast from "react-hot-toast";
import { createTask, updateTask } from "../../api/task";
import { Task } from "../../lib/types";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  columnId?: string;
  refresh?: Dispatch<SetStateAction<boolean>>;
  taskId?: string;
  updateData?: Partial<Task>;
}

export interface TaskType {
  taskName?: string;
  taskDesc?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

const AddTask = ({
  open,
  setOpen,
  columnId,
  refresh,
  taskId,
  updateData,
}: Prop) => {
  const initialValues = {
    taskName: updateData ? updateData.taskName! : "",
    taskDesc: updateData ? updateData.taskDesc! : "",
    dueDate: updateData ? updateData.dueDate! : "",
    priority: updateData
      ? (updateData.priority! as "low" | "medium" | "high")
      : "low",
  };
  const [taskDetails, setTaskDetails] = useState<TaskType>(initialValues);
  const [taskErrors, setTaskErrors] = useState<Partial<TaskError>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateNewTask(taskDetails);
    setTaskErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        if (taskId) {
          await changeTaskDetails();
        } else {
          await newTask();
        }
      } catch (error) {
        console.log(error);
        toast.error("Couldn't create task, please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please give valid info");
    }
  };

  const newTask = async () => {
    try {
      const response = await createTask(
        taskDetails.taskName!,
        taskDetails.taskDesc!,
        taskDetails.dueDate!,
        taskDetails.priority!,
        columnId!
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        if (refresh) refresh(true);
        setTaskDetails(initialValues);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't create task. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during creating task. Please try again later."
      );
    }
  };

  const changeTaskDetails = async () => {
    setIsLoading(true);
    try {
      const response = await updateTask(taskId!, taskDetails);

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setTaskDetails(initialValues);
        if (refresh) refresh(true);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't update task. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during updating task. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">
          {taskId ? "Update task" : "Add New Task"}
        </h1>
        <div>
          <Input
            name="taskName"
            label="Task Name"
            type="text"
            placeholder="Enter task name"
            value={taskDetails.taskName!}
            onChange={handleChange}
          />
          {!taskDetails.taskName && (
            <p className="relative xs-error">{taskErrors.taskName}</p>
          )}
        </div>

        <div>
          <Input
            name="taskDesc"
            label="Description"
            type="text"
            placeholder="Enter task description"
            value={taskDetails.taskDesc!}
            onChange={handleChange}
          />
          {!taskDetails.taskDesc && (
            <p className="relative xs-error">{taskErrors.taskDesc}</p>
          )}
        </div>

        <div>
          <Input
            name="dueDate"
            label="Due Date"
            type="date"
            placeholder="Pick due date"
            value={taskDetails.dueDate!}
            onChange={handleChange}
          />
          {!taskDetails.dueDate && (
            <p className="relative xs-error">{taskErrors.dueDate}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="priority">What's this task priority?</label>
          <select
            id="priority"
            value={taskDetails.priority}
            onChange={handleChange}
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {!taskDetails.priority && (
            <p className="relative xs-error">{taskErrors.priority}</p>
          )}
        </div>

        <button
          type="submit"
          className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2"
        >
          {isLoading ? (
            <Loader height="24px" width="24px" />
          ) : taskId ? (
            "Update Task"
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default AddTask;
