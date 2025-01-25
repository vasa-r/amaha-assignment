import { Navigate, Route, Routes } from "react-router-dom";
import AppBar from "../components/Main/AppBar";
import SideBar from "../components/Main/SideBar";
import Home from "../components/Main/Home";
import Board from "../components/Main/Board/Board";
import Settings from "../components/Main/Settings";
import AllBoards from "../components/Main/AllBoards";

const MainPage = () => {
  return (
    <div className="w-screen h-screen">
      <AppBar />
      <div className="flex w-full h-btm-height">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<AllBoards />} />
          <Route path="/boards/:id" element={<Board />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
