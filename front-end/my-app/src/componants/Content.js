import Body from "./Body";
import Compose from "./Compose";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Content() {
  return (
    <div className="h-[84vh] w-full flex p-4 shadow-md rounded-lg">
      <div className="w-[70vw]">
        <div>
          <Body />
        </div>
      </div>
      <div className="w-[30vw] ml-5 bg-[rgba(217,217,217,0.4)] h-[79vh] rounded-lg shadow-md ">
        <Compose />
      </div>
    </div>
  );
}

export default Content;
