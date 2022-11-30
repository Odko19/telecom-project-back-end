import { RiInboxArchiveFill, RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { archivesServices } from "../services/navbarServices";
import { ToastContainer, toast } from "react-toastify";

function Navbar({ checkBox, checkedId, onSearch }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")).data);
    }
  }, []);

  function handlerArchives() {
    archivesServices
      .getArchives(checkedId)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).success === true) {
          toast("архивласан");
        } else {
          toast("чек хийнэ үү");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handlerSearch(e) {
    e.preventDefault();
    onSearch(e.target.value);
  }

  return (
    <div className="h-full flex items-center bg-[#1e45a2]  rounded-t-lg text-[#ffffff]/[.6] px-7">
      <ToastContainer />
      <button onClick={handlerArchives}>
        <RiInboxArchiveFill size="20px" />
      </button>
      <div className="mx-5 w-full  rounded-lg text-[12px] relative">
        <button
          type="submit"
          className="absolute ml-[8px] mt-[7px] text-[rgba(0,0,0,0.6)]"
        >
          <RiSearchLine size="20px" />
        </button>
        <input
          type="search"
          placeholder="хайлт"
          name="search"
          className=" w-full rounded-lg pr-3 pl-10 py-2 ring-2 focus:ring-2  text-[#000000]"
          onChange={handlerSearch}
        />
      </div>
      <p className="text-[#ffffff]/[.9] text-[13px] text-center">
        {user?.office_name}
      </p>
    </div>
  );
}

export default Navbar;
