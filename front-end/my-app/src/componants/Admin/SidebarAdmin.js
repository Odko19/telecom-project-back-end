import { RiLogoutBoxRLine } from "react-icons/ri";

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
    <div className="h-full rounded-lg bg-[#1e45a2] text-[#ffffff]/[.6]">
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between items-center"></div>
        <div className="mb-8">
          <button onClick={handlerExit} className="hover:text-[white]">
            <RiLogoutBoxRLine size="21px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
