import StatContainer from "../Main/StatContainer";
import DarkSearch from "../../assets/dark/dark-search.svg";
import DarkDelete from "../../assets/dark/dark-delete.svg";
import LightSearch from "../../assets/light/light-search.svg";
import LightDelete from "../../assets/light/light-delete.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import CreateBoard from "./CreateBoard";
import { deleteBoard, getBoards } from "../../api/board";
import { Board } from "../../lib/types";
import toast from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";

const Home = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[] | []>([]);
  const [mutableId, setMutableId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!showCreateModal) getAllBoards();
  }, [showCreateModal]);

  useEffect(() => {
    if (!showDeleteModal) getAllBoards();
  }, [showDeleteModal]);

  const getAllBoards = async () => {
    try {
      const items = await getBoards();
      const { boards } = items.data;
      setBoards(boards);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBoardData = async () => {
    setIsLoading(true);
    try {
      const response = await deleteBoard(mutableId!);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        setMutableId("");
        setShowDeleteModal(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't delete Board data. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during deleting board. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setMutableId(id);
    setShowDeleteModal(true);
  };

  const totalColumns = boards?.reduce(
    (acc, curr) => acc + curr.columns.length,
    0
  );

  const filteredBoards = boards?.filter((board) =>
    Object.values(board).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {showCreateModal && (
        <CreateBoard open={showCreateModal} setOpen={setShowCreateModal} />
      )}
      {showDeleteModal && (
        <ConfirmDelete
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          isLoading={isLoading}
          onPress={() => deleteBoardData()}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:overflow-hidden md:py-7 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
            Manage your Management
          </h1>
        </div>
        <StatContainer
          first={boards?.length || 0}
          second={0}
          third={totalColumns || 0}
        />
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
          {boards?.length > 0 ? (
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
                  ({ boardName, columns, members, _id }, index) => (
                    <tr key={_id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{boardName}</td>
                      <td className="px-4 py-2">{columns.length}</td>
                      <td className="px-4 py-2">{members.length}</td>
                      <td className="px-4 py-2">
                        <img
                          src={isDarkMode ? LightDelete : DarkDelete}
                          alt="Delete invoice"
                          onClick={() => handleDelete(_id)}
                          className="cursor-pointer size-4"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/main/boards/${_id}`}
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
          ) : (
            <div className="center">No data available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
