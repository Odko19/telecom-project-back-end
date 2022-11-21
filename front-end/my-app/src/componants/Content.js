import Body from "./Body";
import Compose from "./Compose";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Content() {
  return (
    <div className="h-[84vh] w-full flex p-4 shadow-md ">
      <div className="w-[70vw]">
        {/* <div className="w-full h-[8vh]">
          <Navbar />
        </div> */}
        <div>
          <Body />
        </div>
      </div>
      <div className="w-[30vw] ml-3 bg-[#f8f8f8] h-[78vh] rounded-lg">
        <Compose />
      </div>
    </div>
  );
}

export default Content;
