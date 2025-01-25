import StatContainer from "../Main/StatContainer";
import DarkSearch from "../../assets/dark/dark-search.svg";
import DarkDelete from "../../assets/dark/dark-delete.svg";
import LightSearch from "../../assets/light/light-search.svg";
import LightDelete from "../../assets/light/light-delete.svg";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Home = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [boards, setBoards] = useState([]);
  const [mutableId, setMutableId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  const handleDelete = (id: string) => {
    setMutableId(id);
    setShowDeleteModal(true);
  };

  const resetId = useCallback(() => {
    setMutableId("");
  }, []);

  const filteredBoards = boards?.filter((board) =>
    Object.values(board).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:overflow-hidden md:py-7 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
            Manage your Management
          </h1>
        </div>
        <StatContainer first={boards?.length || 0} second={0} third={0} />
        <div
          className={`flex items-center gap-3 px-4 py-4 rounded-md md:px-8 ${
            isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
          }`}
        >
          <button
            className="!text-white btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Board
          </button>
          <div
            className={`flex items-center flex-1 ${
              isDarkMode ? "border-b border-border" : "border-b"
            }`}
          >
            <input
              type="text"
              placeholder="Search for boards"
              className="w-full text-lg !border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="cursor-pointer w-11">
              <img
                src={isDarkMode ? LightSearch : DarkSearch}
                alt="search"
                className="size-7 md:size-8"
              />
            </div>
          </div>
        </div>

        <div
          className={`flex-1 px-8 py-8 overflow-x-auto rounded-md ${
            isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
          }`}
        >
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Board Name</th>
                <th className="px-4 text-left">Total Columns</th>
                <th className="px-4 text-left">Total Members</th>
                <th className="px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBoards?.map(
                ({ boardName, totalColumns, totalMembers, _id }, index) => (
                  <tr key={_id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{boardName}</td>
                    <td className="px-4 py-2">{totalColumns}</td>
                    <td className="px-4 py-2">{totalMembers}</td>
                    <td
                      className="px-4 py-2"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={isDarkMode ? LightDelete : DarkDelete}
                        alt="Delete invoice"
                        onClick={() => handleDelete(_id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>
                      <Link
                        to={`/farmer/${_id}`}
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

export default Home;
