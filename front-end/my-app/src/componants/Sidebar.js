import { NavLink } from "react-router-dom";
import Compose_Model from "./Compose_Model";
import { useEffect, useState } from "react";

import {
  RiInboxFill,
  RiArchiveDrawerFill,
  RiSendPlane2Fill,
  RiLogoutBoxRLine,
  RiPencilLine,
} from "react-icons/ri";

function Sidebar() {
  const [showModel, setShowModel] = useState(false);

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "white" : "rgba(255,255,255,0.6)",
    };
  };
  function handlerExit() {
    window.localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="h-full rounded-lg bg-[#1e45a2] text-[#ffffff]/[.6]">
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between items-center">
          <button
            className="p-3 mt-4 bg-[rgba(217,217,217,0.3)] hover:text-[white] hover:text-[white] rounded-md"
            onClick={() => setShowModel(true)}
          >
            <RiPencilLine size="30px" />
          </button>

          <NavLink style={navLinkStyles} to="/" className="p-3 mt-2">
            <RiInboxFill size="21px" />
          </NavLink>
          <NavLink style={navLinkStyles} to="/sent" className="p-3">
            <RiSendPlane2Fill size="21px" />
          </NavLink>
          <NavLink style={navLinkStyles} to="/archives" className="p-3">
            <RiArchiveDrawerFill size="21px" />
          </NavLink>
        </div>
        <div className="mb-8">
          <button onClick={handlerExit} className="hover:text-[white]">
            <RiLogoutBoxRLine size="21px" />
          </button>
        </div>
      </div>
      <Compose_Model showModel={showModel} setShowModel={setShowModel} />
    </div>
  );
}

export default Sidebar;
