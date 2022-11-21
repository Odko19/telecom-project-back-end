import {
  RiDeleteBinFill,
  RiInboxArchiveFill,
  RiCheckboxBlankLine,
} from "react-icons/ri";

function Navbar({ checkBox, checkedId }) {
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
      <button className="p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}

export default Navbar;
