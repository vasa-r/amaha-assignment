import { useTheme } from "../../../context/ThemeContext";
import ColumnHeader from "./ColumnHeader";
import Header from "./Header";
import TaskCard from "./TaskCard";

const Board = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="w-full h-full p-2 pb-0 overflow-hidden md:px-4">
      <div
        className={`w-full h-full overflow-hidden rounded-md flex flex-col p-2 ${
          isDarkMode ? "bg-transparent" : "shadow-custom"
        }`}
      >
        <Header />
        <div
          className={`flex flex-col flex-1 w-full gap-2 p-1 mt-2 overflow-x-auto overflow-y-hidden rounded-md md:flex-row ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          <div
            className={`flex-1 rounded-md p-2 flex flex-col min-w-72 max-w-72 overflow-x-auto ${
              isDarkMode ? "bg-main-bg" : "bg-light-col"
            }`}
          >
            <ColumnHeader isDarkMode={isDarkMode} />
            <div className="flex flex-col flex-1 gap-2 px-1 py-1 md:px-2">
              <TaskCard />
              <TaskCard />
              <TaskCard />
              <TaskCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
