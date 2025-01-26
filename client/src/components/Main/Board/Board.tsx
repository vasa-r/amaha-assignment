import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import ColumnHeader from "./ColumnHeader";
import Header from "./Header";
import TaskCard from "./TaskCard";
import { useLayoutEffect } from "react";

const Board = () => {
  const { isDarkMode } = useTheme();
  const { boardId } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!boardId) navigate("/main/boards");
  }, [boardId, navigate]);

  return (
    <div className="w-full h-full p-2 pb-0 overflow-hidden md:px-4">
      <div
        className={`w-full h-full overflow-hidden rounded-md flex flex-col p-2 ${
          isDarkMode ? "bg-transparent" : "shadow-custom"
        }`}
      >
        <Header boardId={boardId!} />
        <div
          className={`flex flex-col flex-1 w-full gap-2 p-1 mt-2 overflow-x-auto md:overflow-y-hidden rounded-md md:flex-row ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          {/* column */}
          <div
            className={`flex-1 rounded-md p-2 flex flex-col w-full md:min-w-72 md:max-w-72 md:overflow-x-auto ${
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
