import { useState } from "react";
import DarkAdd from "../../../assets/dark/dark-column.svg";
import DarkOption from "../../../assets/dark/dark-option.svg";
import LightAdd from "../../../assets/light/light-column.svg";
import LightOption from "../../../assets/light/light-option.svg";
import AddTask from "../AddTask";

const ColumnHeader = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <>
      {showAddTask && <AddTask open={showAddTask} setOpen={setShowAddTask} />}
      <div
        className={`rounded-md p-2 ${
          isDarkMode ? "bg-main-bg" : "bg-light-col"
        }`}
      >
        <div
          className={`relative flex items-center justify-between w-full px-1 pb-3 md:px-2 ${
            isDarkMode ? "border-b border-border" : "shadow-light-btm"
          }`}
        >
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium md:text-base">Add New Column</p>
            <div
              className={`p-1 rounded-lg cursor-pointer ${
                isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
              }`}
              onClick={() => setShowAddTask(true)}
            >
              <img
                src={isDarkMode ? LightAdd : DarkAdd}
                alt="add task"
                title="add task"
                className="size-5"
              />
            </div>
          </div>
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
          {showOptions && (
            <div
              className={`z-50 absolute right-0 top-8 cursor-default w-32 flex flex-col rounded-md ${
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
                Edit column
              </p>
              <p
                className={`py-[2px] text-sm px-1 rounded-sm cursor-pointer ${
                  isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
                }`}
              >
                Delete Column
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ColumnHeader;
