import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import DarkMenu from "../../assets/dark-menu.svg";
import LightMenu from "../../assets/light-menu.svg";
import Light from "../../assets/light-mode.svg";
import Dark from "../../assets/dark-mode.svg";
import Arrow from "../../assets/arrow.png";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { menuItem } from "../../lib/constants";
import { useTheme } from "../../context/ThemeContext";

const AppBar = () => {
  const { user, logoutContext } = useApp();
  const { theme, setTheme, isDarkMode } = useTheme();
  const [showTheme, setShowTheme] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    setShowTheme(false);
  };

  return (
    <div
      className={`relative flex items-center justify-between w-full px-6 py-4 bg-transparent border-b md:px-10 md:py-4 backdrop-saturate-custom backdrop-blur-custom ${
        isDarkMode ? "border-b-border" : "shadow-btm-shd"
      } `}
    >
      <div className="flex items-center">
        <img
          src={isDarkMode ? LightMenu : DarkMenu}
          alt="menu"
          className="mr-2 size-8 md:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
        <Link to="/" className="flex items-center self-start gap-2">
          <img src={Logo} alt="app logo" className="size-8 animate-spin" />{" "}
          <p className="!text-xl !font-semibold !p-0 heading gradient-txt">
            TaskFlow
          </p>
        </Link>
      </div>

      {/* Mobile */}
      <div
        className={`text-white h-screen fixed inset-0 bg-black z-50 md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="relative flex flex-col items-center w-full h-full p-8 overflow-y-auto rounded-l-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={isDarkMode ? LightMenu : DarkMenu}
            alt="close menu"
            className="absolute left-5 top-5 size-8"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="flex flex-col w-full gap-4 mt-16 text-sm font-medium font-menu">
            {menuItem.map(({ name, to }) => (
              <Link
                to={to}
                key={name}
                className="flex items-center justify-between w-full hover-menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="text-lg font-medium text-white hover-menu">
                  {name}
                </p>
                <img src={Arrow} alt="navigate" width={20} height={20} />
              </Link>
            ))}

            <Link
              to={"/main/settings"}
              className="flex items-center justify-between w-full hover-menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="text-lg font-medium text-white hover-menu">
                Settings
              </p>
              <img src={Arrow} alt="navigate" width={20} height={20} />
            </Link>

            <div
              className="flex items-center justify-between w-full hover-menu"
              onClick={() => logoutContext()}
            >
              <div className="text-lg font-medium text-white hover-menu">
                Logout
              </div>
              <img src={Arrow} alt="navigate" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => setShowTheme(!showTheme)}
          className={`px-2 py-1 text-lg font-medium bg-transparent border border-[#1E201E] rounded-md cursor-pointer ${
            isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
          }`}
        >
          <img src={isDarkMode ? Light : Dark} alt="theme" className="size-7" />
        </div>
        <div
          className={`px-2 py-1 text-lg font-medium border border-[#1E201E] rounded-md cursor-pointer ${
            isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
          }  bg-transparent`}
        >
          {user.userName.slice(0, 2).toLocaleUpperCase()}
        </div>
      </div>
      {showTheme && (
        <div
          className={`absolute right-6 md:right-10 px-1 py-2 text-sm top-[76px] flex flex-col gap-2 border border-[#1E201E] rounded-md ${
            isDarkMode ? "bg-black" : "bg-main-bg text-white"
          }`}
        >
          <p
            className={`px-3 py-1 rounded-md cursor-pointer hover:bg-[#1E201E] ${
              theme === "light" ? "bg-btnClr" : "bg-transparent"
            }`}
            onClick={() => handleThemeChange("light")}
          >
            Light Mode
          </p>
          <p
            className={`px-3 py-1 rounded-md cursor-pointer hover:bg-[#1E201E] ${
              theme === "dark" ? "bg-btnClr" : "bg-transparent"
            }  ${isDarkMode ? "text-white" : "text-white"}`}
            onClick={() => handleThemeChange("dark")}
          >
            Dark Mode
          </p>
          <p
            className={`px-3 py-1 rounded-md cursor-pointer hover:bg-[#1E201E] ${
              theme === "system" ? "bg-btnClr" : "bg-transparent"
            }`}
            onClick={() => handleThemeChange("system")}
          >
            System
          </p>
        </div>
      )}
    </div>
  );
};

export default AppBar;
