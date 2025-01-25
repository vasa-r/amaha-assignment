import { Link } from "react-router-dom";
import DarkSettings from "../../assets/dark/dark-settings.svg";
import DarkLogout from "../../assets/dark/dark-logout.svg";
import DarkHome from "../../assets/dark/dark-home.svg";
import DarkBoard from "../../assets/dark/dark-board.svg";
import LightLogout from "../../assets/light/light-logout.svg";
import LightSettings from "../../assets/light/light-settings.svg";
import LightHome from "../../assets/light/light-home.svg";
import LightBoard from "../../assets/light/light-board.svg";
import { useApp } from "../../context/AppContext";

import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const { isDarkMode } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const { logoutContext } = useApp();

  return (
    <div
      className={`hidden border-r-[1px] md:py-6 md:pl-4 h-full  md:flex flex-col justify-between ${
        !isDarkMode ? "shadow-btm-shd" : "border-border"
      }`}
    >
      <div className="flex flex-col gap-4">
        <Link
          to={"/main/"}
          className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
            isActive("/main/") ? "bg-btnClr text-white" : ""
          }`}
        >
          <img
            src={isDarkMode ? LightHome : DarkHome}
            alt={"setting"}
            className="size-5"
          />
          <p className="text-base font-medium">Home</p>
        </Link>
        <Link
          to={"/main/boards"}
          className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
            isActive("/main/boards") ? "bg-btnClr text-white" : ""
          }`}
        >
          <img
            src={isDarkMode ? LightBoard : DarkBoard}
            alt={"setting"}
            className="size-5"
          />
          <p className="text-base font-medium">Boards</p>
        </Link>
      </div>
      <div>
        <hr className="w-full pb-4 border-t-2 border-border" />
        <div className="flex flex-col gap-4">
          <Link
            to={"/main/settings"}
            className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
              isActive("/main/settings") ? "bg-btnClr text-white" : ""
            }`}
          >
            <img
              src={isDarkMode ? LightSettings : DarkSettings}
              alt={"setting"}
              className="size-5"
            />
            <p className="text-base font-medium">Settings</p>
          </Link>

          <div
            onClick={() => logoutContext()}
            className="flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]"
          >
            <img
              src={isDarkMode ? LightLogout : DarkLogout}
              alt={"Logout"}
              className="size-5"
            />
            <p className="text-base font-medium">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
