/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import ColumnHeader from "./ColumnHeader";
import Header from "./Header";
import TaskCard from "./TaskCard";
import { useEffect, useLayoutEffect, useState } from "react";
import { getBoard } from "../../../api/board";
import { BoardDetailsType } from "../../../lib/types";

const Board = () => {
  const [boardDetails, setBoardDetails] = useState<BoardDetailsType>();
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const { boardId } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!boardId) navigate("/main/boards");
  }, [boardId, navigate]);

  useEffect(() => {
    getBoardDetails();
  }, []);

  useEffect(() => {
    if (triggerRefresh) getBoardDetails();
  }, [triggerRefresh]);

  const getBoardDetails = async () => {
    try {
      const items = await getBoard(boardId!);
      const { boardDetails } = items.data;
      setBoardDetails(boardDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setTriggerRefresh(false);
    }
  };

  return (
    <div className="w-full h-full p-2 pb-0 overflow-hidden md:px-4">
      <div
        className={`w-full h-full overflow-hidden rounded-md flex flex-col p-2 ${
          isDarkMode ? "bg-transparent" : "shadow-custom"
        }`}
      >
        <Header
          boardId={boardId!}
          boardName={boardDetails?.boardName ?? "Board Name"}
          refresh={setTriggerRefresh}
        />
        <div
          className={`flex flex-col flex-1 w-full gap-2 p-1 mt-2 overflow-x-auto md:overflow-y-hidden rounded-md md:flex-row ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          {/* column */}
          {boardDetails?.columns &&
            boardDetails.columns.map(({ _id, columnName, tasks }) => (
              <div
                key={_id}
                className={`flex-1 rounded-md p-2 flex flex-col w-full md:min-w-72 md:max-w-72 md:overflow-x-auto ${
                  isDarkMode ? "bg-main-bg" : "bg-light-col"
                }`}
              >
                <ColumnHeader
                  isDarkMode={isDarkMode}
                  columnName={columnName}
                  columnId={_id}
                  refresh={setTriggerRefresh}
                />
                <div className="flex flex-col flex-1 gap-2 px-1 py-1 md:px-2">
                  {tasks.length > 0 &&
                    tasks?.map(
                      ({ _id: id, taskName, taskDesc, priority, dueDate }) => (
                        <TaskCard
                          key={id}
                          taskName={taskName}
                          taskDesc={taskDesc}
                          priority={priority}
                          dueDate={dueDate}
                          members={boardDetails.members}
                          _id={id}
                          refresh={setTriggerRefresh}
                        />
                      )
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
