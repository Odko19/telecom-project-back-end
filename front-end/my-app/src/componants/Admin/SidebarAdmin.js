import { NavLink } from "react-router-dom";
import {
  RiInboxFill,
  RiArchiveDrawerFill,
  RiSendPlane2Fill,
  RiLogoutBoxRLine,
} from "react-icons/ri";

function SidebarAdmin() {
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
    <div className="h-full rounded-lg bg-[#1e45a2] shadow-[0_7px_15px_0px_#1e45a2] text-[#ffffff]/[.6]">
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between items-center">
          {/* <img src="./logo.png" alt="" className="mt-2" /> */}
          <NavLink style={navLinkStyles} to="/" className="p-3 mt-[3.5vw]">
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
          <button onClick={handlerExit}>
            <RiLogoutBoxRLine size="21px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
