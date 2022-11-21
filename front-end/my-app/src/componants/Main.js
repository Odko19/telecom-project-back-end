import Content from "./Content";
import User from "./User";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Main() {
  return (
    <div className="w-screen h-screen bg-[#f8f8f8] flex">
      <div className="w-[10vw] p-6 ">
        <Sidebar />
      </div>
      <div className="h-full w-[90vw] py-6 pr-6 ">
        <div className="w-full mb-4">
          <User />
        </div>
        <div className="bg-[#ffffff] h-[84vh] rounded-lg">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Main;
