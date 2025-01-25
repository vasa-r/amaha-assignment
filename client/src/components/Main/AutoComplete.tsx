import { Dispatch, SetStateAction, useState } from "react";
import AutoCompleteModal from "../UtilsUI/AutoCompleteModal";
import Input from "../UtilsUI/Input";
import { useTheme } from "../../context/ThemeContext";
import { dummyData } from "../../lib/constants";

interface AutoCompleteProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AutoComplete = ({ open, setOpen }: AutoCompleteProp) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<string[]>(["john", "mary", "vicky"]);

  const { isDarkMode } = useTheme();

  const handleAddUser = (user: string) => {
    setUsers((prev) => [...prev, user]);
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
            className={`w-full rounded-md p-2 flex  gap-1 max-h-[344px] ${
              isDarkMode
                ? "bg-main-bg border border-[#1E201E]"
                : "shadow-custom bg-white"
            } flex-wrap`}
          >
            {users?.map((user) => (
              <p className={`w-fit !text-black px-2 rounded-xl bg-green-400`}>
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
          {dummyData?.map((user) => (
            <p
              className={`px-2 cursor-pointer ${
                !isDarkMode ? "hover:bg-light-hover" : "hover:bg-dark-hover"
              }`}
              key={user.id}
            >
              {user.name}
            </p>
          ))}
        </div>
        <button className="bg-green-400 btn">Add Members</button>
      </div>
    </AutoCompleteModal>
  );
};

export default AutoComplete;
