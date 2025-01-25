import DarkOption from "../../../assets/dark/dark-option.svg";
import DarkInvite from "../../../assets/dark/dark-invite.svg";
import LightOption from "../../../assets/light/light-option.svg";
import LightInvite from "../../../assets/light/light-invite.svg";
import { useTheme } from "../../../context/ThemeContext";

const TaskCard = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`p-2 rounded-md ${
        isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">submit assignment</h1>
        <div
          className={`p-1 rounded-lg cursor-pointer ${
            isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
          }`}
        >
          <img
            src={isDarkMode ? LightOption : DarkOption}
            alt="add task"
            title="add task"
            className="size-5"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-base font-medium">Priority</p>
        <span>&#8942;</span>
        <div className="px-2 text-sm bg-red-400 rounded-lg">Low</div>
      </div>
      <p className="mt-2 text-sm font-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, dolore et.
        Nostrum, quia quasi.
      </p>

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
          <p className="text-xs font-medium">12/11/2002</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
