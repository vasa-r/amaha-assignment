import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const { isDarkMode } = useTheme();

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
              {boards?.map(
                ({ boardName, totalColumns, totalMembers, _id }, index) => (
                  <tr key={_id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{boardName}</td>
                    <td className="px-4 py-2">{totalColumns}</td>
                    <td className="px-4 py-2">{totalMembers}</td>
                    <td>
                      <Link
                        to={`/admin/${_id}`}
                        className="underline hover:text-lightPur underline-offset-2"
                      >
                        View Board
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBoards;
