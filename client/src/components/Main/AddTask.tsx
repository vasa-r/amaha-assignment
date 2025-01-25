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

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface TaskType {
  taskName: string;
  taskDesc: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const initialValues: TaskType = {
  taskName: "",
  taskDesc: "",
  dueDate: "",
  priority: "low",
};

const AddTask = ({ open, setOpen }: Prop) => {
  const [taskDetails, setTaskDetails] = useState<TaskType>(initialValues);
  const [taskErrors, setTaskErrors] = useState<Partial<TaskError>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateNewTask(taskDetails);
    setTaskErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        console.log("submitted");
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

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Add New Task</h1>
        <div>
          <Input
            name="taskName"
            label="Task Name"
            type="text"
            placeholder="Enter task name"
            value={taskDetails.taskName}
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
            value={taskDetails.taskDesc}
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
            value={taskDetails.dueDate}
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
          {isLoading ? <Loader height="24px" width="24px" /> : "Add Task"}
        </button>
      </form>
    </Modal>
  );
};

export default AddTask;
