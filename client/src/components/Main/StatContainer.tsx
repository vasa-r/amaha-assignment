import { useTheme } from "../../context/ThemeContext";

interface StatProps {
  first: number;
  second: number;
  third?: number;
}

const StatContainer = ({ first, second }: StatProps) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-[50px]">
      <div
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode
            ? " border border-[#1E201E] hover:bg-dark-hover"
            : "shadow-custom hover:bg-light-hover"
        }`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{first} </span>
          <br /> Boards Created
        </h1>
      </div>
      <div
        // isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode
            ? " border border-[#1E201E] hover:bg-dark-hover"
            : "shadow-custom hover:bg-light-hover"
        }`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{second} </span>
          <br />
          Total Columns
        </h1>
      </div>
      {/* <div
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode
            ? " border border-[#1E201E] hover:bg-dark-hover"
            : "shadow-custom hover:bg-light-hover"
        }`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{third} </span> <br /> Total Tasks
        </h1>
      </div> */}
    </div>
  );
};

export default StatContainer;
