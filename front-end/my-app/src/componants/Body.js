import { Routes, Route } from "react-router-dom";
import Inbox from "../page/Inbox";
import Sent from "../page/Sent";
import Archives from "../page/Archives";
import Navbar from "./Navbar";

function Body() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/archives" element={<Archives />} />
      </Routes>
    </div>
  );
}

export default Body;
