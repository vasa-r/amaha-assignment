/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AutoCompleteModal from "../UtilsUI/AutoCompleteModal";
import Input from "../UtilsUI/Input";
import { useTheme } from "../../context/ThemeContext";
import { getUsers } from "../../api/auth";
import { User } from "../../lib/types";
import { addMembers } from "../../api/board";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";
import { assignTask } from "../../api/task";

interface AutoCompleteProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: Dispatch<SetStateAction<boolean>>;
  boardId?: string;
  taskId?: string;
  members?: User[];
}

const AutoComplete = ({
  open,
  setOpen,
  refresh,
  boardId,
  taskId,
  members = [],
}: AutoCompleteProp) => {
  const [value, setValue] = useState("");
  const [apiData, setApiData] = useState<User[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [usersId, setUsersId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => console.log(usersId), [usersId]);

  const handleAddUser = (userId: string, userName: string) => {
    setUsers((prev) => [...prev, userName]);
    setUsersId((prev) => [...prev, userId]);
  };

  useEffect(() => {
    if (value.trim() === "") {
      setApiData([]);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      if (taskId) {
        // Search locally if taskId is present
        const filteredMembers = members.filter((member) =>
          member.userName.toLowerCase().includes(value.toLowerCase())
        );
        setApiData(filteredMembers);
      } else {
        // Fetch users from the server
        fetchUsers(value);
      }
    }, 200);
    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (boardId) {
        await addBoardMembers();
      } else {
        await assignMembers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't add members, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async (query: string) => {
    try {
      const response = await getUsers(query);
      const { data } = response.data;
      setApiData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addBoardMembers = async () => {
    try {
      const response = await addMembers(boardId!, usersId);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        if (refresh) refresh(true);
        setApiData([]);
        setUsers([]);
        setUsersId([]);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't add members. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during adding members. Please try again later."
      );
    }
  };

  const assignMembers = async () => {
    try {
      const response = await assignTask(taskId!, usersId);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        if (refresh) refresh(true);
        setApiData([]);
        setUsers([]);
        setUsersId([]);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't assign members. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during assigning members. Please try again later."
      );
    }
  };

  return (
    <AutoCompleteModal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full gap-4">
        <Input
          name="autocomplete"
          type="text"
          label="Add members to board"
          placeholder="Search for user"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {users.length !== 0 && (
          <div
            className={`w-full rounded-md p-2 flex gap-1 max-h-[344px] ${
              isDarkMode
                ? "bg-main-bg border border-[#1E201E]"
                : "shadow-custom bg-white"
            } flex-wrap`}
          >
            {users?.map((user, index) => (
              <p
                key={index}
                className="w-fit !text-black px-2 rounded-xl bg-green-400"
              >
                {user}
              </p>
            ))}
          </div>
        )}

        <div
          className={`w-full rounded-md py-2 flex flex-col gap-1 max-h-[344px] ${
            isDarkMode
              ? "bg-main-bg border border-[#1E201E]"
              : "shadow-custom bg-white"
          }`}
        >
          {apiData?.map((user, index) => (
            <p
              className={`px-2 cursor-pointer ${
                !isDarkMode ? "hover:bg-light-hover" : "hover:bg-dark-hover"
              }`}
              key={index}
              onClick={() => handleAddUser(user._id, user.userName)}
            >
              {user.userName}
            </p>
          ))}
        </div>
        <button className="bg-green-400 btn" onClick={handleSubmit}>
          {isLoading ? <Loader width="24px" height="24px" /> : "Add members"}
        </button>
      </div>
    </AutoCompleteModal>
  );
};

export default AutoComplete;
