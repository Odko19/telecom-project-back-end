import { RiInboxArchiveFill, RiSearchLine } from "react-icons/ri";

function Navbar({ checkBox, checkedId, onSearch }) {
  function selectAllCheckbox() {
    const chkbxAll = document.querySelectorAll(".chkbxAll");
    for (let i = 0; i < checkBox.length; i++) {
      checkBox[i].checked = chkbxAll[0].checked;
    }
  }

  function handlerArchives() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      archives: checkedId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/archives", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).success === true) {
          alert("archives");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handlerSearch(e) {
    e.preventDefault();
    onSearch(e.target.value);
  }

  return (
    <div className="h-full flex  items-center bg-[#1e45a2]  rounded-t-lg text-[#ffffff]/[.6]">
      {/* <button className="ml-5">
        <RiArrowGoBackFill />
      </button> */}
      <button className="ml-3 p-3">
        <input
          type="checkbox"
          onChange={() => selectAllCheckbox()}
          className="chkbxAll"
        />
      </button>

      <button className="p-3" onClick={handlerArchives}>
        <RiInboxArchiveFill size="20px" />
      </button>

      <div className="mx-3 w-full  rounded-lg text-[12px] relative">
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
    </div>
  );
}

export default Navbar;
