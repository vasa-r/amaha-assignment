import DarkAdd from "../../../assets/dark/dark-column.svg";
import DarkOption from "../../../assets/dark/dark-option.svg";
import LightAdd from "../../../assets/light/light-column.svg";
import LightOption from "../../../assets/light/light-option.svg";

const ColumnHeader = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div
      className={`rounded-md p-2 ${isDarkMode ? "bg-main-bg" : "bg-light-col"}`}
    >
      <div
        className={`flex items-center justify-between w-full px-1 pb-3 md:px-2 ${
          isDarkMode ? "border-b border-border" : "shadow-light-btm"
        }`}
      >
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium md:text-base">Add New Column</p>
          <div
            className={`p-1 rounded-lg cursor-pointer ${
              isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
            }`}
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
        >
          <img
            src={isDarkMode ? LightOption : DarkOption}
            alt="add task"
            title="add task"
            className="size-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnHeader;
