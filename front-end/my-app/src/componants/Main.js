import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Inbox from "../componants/page/Inbox";
import Sent from "../componants/page/Sent";
import Archives from "../componants/page/Archives";

function Main() {
  return (
    <div className="w-screen h-screen bg-[rgba(217,217,217,0.7)] flex">
      <div className="lg:w-[10vw] w-[20vw] p-6 ">
        <Sidebar />
      </div>
      <div className="lg:w-[90vw] w-[80vw] py-6 pr-6">
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/archives" element={<Archives />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
