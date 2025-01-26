import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getBoards } from "../../api/board";
import { Board } from "../../lib/types";

const AllBoards = () => {
  const [boards, setBoards] = useState<Board[] | []>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    getAllBoards();
  }, []);

  const getAllBoards = async () => {
    try {
      const items = await getBoards();
      const { boards } = items.data;
      setBoards(boards);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold md:block">
            The Boards - All
          </h1>
        </div>
        <div
          className={`flex-1 px-8 py-8 overflow-auto rounded-md ${
            isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
          }`}
        >
          {boards?.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="text-xl">
                <tr>
                  <th className="px-4 text-left">S.No</th>
                  <th className="px-4 text-left">Board Name</th>
                  <th className="px-4 text-left">Total Columns</th>
                  <th className="px-4 text-left">Total Members</th>
                  <th className="px-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {boards?.map(({ boardName, columns, members, _id }, index) => (
                  <tr key={_id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{boardName}</td>
                    <td className="px-4 py-2">{columns.length}</td>
                    <td className="px-4 py-2">{members.length}</td>
                    <td>
                      <Link
                        to={`/main/boards/${_id}`}
                        className="underline hover:text-lightPur underline-offset-2"
                      >
                        View Board
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBoards;
