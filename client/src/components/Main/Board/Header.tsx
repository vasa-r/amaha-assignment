import DarkBack from "../../../assets/dark/dark-arrow-left.svg";
import DarkInvite from "../../../assets/dark/dark-invite.svg";
import DarkFilter from "../../../assets/dark/dark-filter.svg";
import DarkSort from "../../../assets/dark/dark-sort.svg";
import DarkAdd from "../../../assets/dark/dark-column.svg";
import LightBack from "../../../assets/light/light-arrow-left.svg";
import LightInvite from "../../../assets/light/light-invite.svg";
import LightFilter from "../../../assets/light/light-filter.svg";
import LightAdd from "../../../assets/light/light-column.svg";
import LightSort from "../../../assets/light/light-sort.svg";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import AddColumn from "../AddColumn";
import AutoComplete from "../AutoComplete";
import { Link } from "react-router-dom";

const Header = ({ boardId }: { boardId: string }) => {
  const [showAddColumn, setShowAddColumn] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSearchUser, setShowSearchUser] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  return (
    <>
      {showAddColumn && (
        <AddColumn
          open={showAddColumn}
          setOpen={setShowAddColumn}
          boardId={boardId}
        />
      )}
      {showSearchUser && (
        <AutoComplete open={showSearchUser} setOpen={setShowSearchUser} />
      )}
      <div
        className={`flex flex-col gap-4 pb-4 ${
          isDarkMode ? "border-b border-border" : "shadow-light-btm"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to={"/main/boards"}
              className={`rounded-md cursor-pointer size-7 center ${
                isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
              }`}
            >
              <img
                src={isDarkMode ? LightBack : DarkBack}
                alt="go back"
                title="go back"
                className="rounded-full size-5"
              />
            </Link>

            <h1 className="text-base font-semibold md:font-bold md:text-4xl">
              Board Title
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer shadow-custom ${
                isDarkMode && "bg-dark-hover"
              }`}
              onClick={() => setShowSearchUser(true)}
            >
              <img
                src={isDarkMode ? LightInvite : DarkInvite}
                alt="invite member"
                title="invite member"
                className="size-5"
              />
              <p className="hidden text-sm font-medium md:block">Add Members</p>
            </div>
            <p className="text-sm font-light cursor-pointer hover:underline underline-offset-4">
              View Members
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer shadow-custom w-fit ${
                isDarkMode && "bg-dark-hover"
              }`}
              onClick={() => setShowAddColumn(true)}
            >
              <img
                src={isDarkMode ? LightAdd : DarkAdd}
                alt="invite member"
                title="invite member"
                className="size-5"
              />
              <p className="text-xs font-medium md:text-sm">Add New Column</p>
            </div>
            <div
              className={`relative flex items-center gap-2 p-2 rounded-md cursor-pointer shadow-custom w-fit ${
                isDarkMode && "bg-dark-hover"
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <img
                src={isDarkMode ? LightFilter : DarkFilter}
                alt="invite member"
                title="invite member"
                className="size-5"
              />
              <p className="text-xs font-medium md:text-sm">Filter Tasks</p>
              {showFilters && (
                <div
                  className={`z-50 absolute left-0 top-11 cursor-default w-32 rounded-md ${
                    isDarkMode
                      ? "bg-main-bg border border-[#1E201E]"
                      : "shadow-custom bg-white"
                  }`}
                >
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Priority - Low
                  </p>
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Priority - Medium
                  </p>
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Priority - High
                  </p>
                </div>
              )}
            </div>
            <div
              className={`relative flex items-center gap-2 p-2 rounded-md cursor-pointer shadow-custom w-fit ${
                isDarkMode && "bg-dark-hover"
              }`}
              onClick={() => setShowSort(!showSort)}
            >
              <img
                src={isDarkMode ? LightSort : DarkSort}
                alt="invite member"
                title="invite member"
                className="size-5"
              />
              <p className="text-xs font-medium md:text-sm">Sort By</p>
              {showSort && (
                <div
                  className={`z-50 absolute -left-[88px] md:left-0 top-11 cursor-default w-[200px] rounded-md ${
                    isDarkMode
                      ? "bg-main-bg border border-[#1E201E]"
                      : "shadow-custom bg-white"
                  }`}
                >
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Priority - Low to High
                  </p>
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Priority - High to Low
                  </p>
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Due Date - Newest to Oldest
                  </p>
                  <p className={`py-[2px] text-sm px-1 rounded-sm`}>
                    Due Date - Oldest to Newest
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
