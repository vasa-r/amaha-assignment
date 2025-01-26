import DarkOption from "../../../assets/dark/dark-option.svg";
import DarkInvite from "../../../assets/dark/dark-invite.svg";
import LightOption from "../../../assets/light/light-option.svg";
import LightInvite from "../../../assets/light/light-invite.svg";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import AutoComplete from "../AutoComplete";
import { Task } from "../../../lib/types";
import { deleteTask } from "../../../api/task";
import toast from "react-hot-toast";
import ConfirmDelete from "../ConfirmDelete";

const TaskCard = ({
  taskName,
  taskDesc,
  priority,
  dueDate,
  _id,
  refresh,
}: Partial<Task>) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  const handleDeleteTask = async () => {
    setIsLoading(true);
    try {
      const response = await deleteTask(_id!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't delete task. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during deleting task. Please try again later."
      );
    } finally {
      setIsLoading(false);
      if (refresh) refresh(true);
    }
  };
  return (
    <>
      {showDeleteModal && (
        <ConfirmDelete
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          isLoading={isLoading}
          onPress={handleDeleteTask}
        />
      )}
      {showAutoComplete && (
        <AutoComplete open={showAutoComplete} setOpen={setShowAutoComplete} />
      )}
      <div
        className={`relative p-2 rounded-md ${
          isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
        }`}
      >
        {showOptions && (
          <div
            className={`absolute z-50 right-0 top-10 cursor-default w-36 flex flex-col rounded-md ${
              isDarkMode
                ? "bg-main-bg border border-[#1E201E]"
                : "shadow-custom bg-white"
            }`}
          >
            <p
              className={`py-[2px] text-sm px-1 rounded-sm cursor-pointer ${
                isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
              }`}
            >
              Edit Task
            </p>
            <p
              className={`py-[2px] text-sm px-1 rounded-sm cursor-pointer ${
                isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
              }`}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Task
            </p>
            <p
              className={`py-[2px] text-sm px-1 rounded-sm cursor-pointer ${
                isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
              }`}
            >
              Assigned Members
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">{taskName}</h1>
          <div
            className={`p-1 rounded-lg cursor-pointer ${
              isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
            }`}
            onClick={() => setShowOptions(!showOptions)}
          >
            <img
              src={isDarkMode ? LightOption : DarkOption}
              alt="options"
              title="options"
              className="size-5"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-base font-medium">Priority</p>
          <span>&#8942;</span>
          <div
            className={`px-2 text-sm rounded-lg ${
              priority === "low"
                ? "bg-priority-low"
                : priority === "medium"
                ? "bg-priority-medium"
                : priority === "high"
                ? "bg-priority-high"
                : ""
            }`}
          >
            {priority}
          </div>
        </div>
        <p className="mt-2 text-sm font-normal">{taskDesc}</p>

        <div
          className={`w-full my-3 ${
            isDarkMode ? "border-b border-border" : "border-b"
          }`}
        ></div>
        <div className="flex items-center justify-between">
          <div
            className={`flex w-fit items-center gap-2 p-1 rounded-md cursor-pointer shadow-custom ${
              isDarkMode && "bg-dark-hover"
            }`}
            onClick={() => setShowAutoComplete(true)}
          >
            <img
              src={isDarkMode ? LightInvite : DarkInvite}
              alt="assign member"
              title="assign member"
              className="size-5"
            />
          </div>
          <div className="flex items-center">
            <p className="text-xs font-medium">Due</p>
            <span className="text-xs font-medium">&#8942;</span>
            <p className="text-xs font-medium">{dueDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
