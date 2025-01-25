import { useTheme } from "../../context/ThemeContext";

interface StatProps {
  first: number;
  second: number;
  third: number;
}

const StatContainer = ({ first, second, third }: StatProps) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-[50px]">
      <div
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
        } hover:bg-main-bg`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{first} </span>
          <br /> Boards Created
        </h1>
      </div>
      <div
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
        } hover:bg-main-bg`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{second} </span>
          <br />
          Total Columns
        </h1>
      </div>
      <div
        className={`flex items-center justify-center h-32 rounded-md ${
          isDarkMode ? " border border-[#1E201E]" : "shadow-custom"
        } hover:bg-main-bg`}
      >
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{third} </span> <br /> Total Tasks
        </h1>
      </div>
    </div>
  );
};

export default StatContainer;
