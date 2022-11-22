import SidebarAdmin from "../Admin/SidebarAdmin";
import User from "../User";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Mail from "../../page/Mail";

const mailtype = ["Ирсэн майл", "Явуулсан майл", "Архивласан майл"];

function Admin() {
  const [officeName, setOfficeName] = useState();
  const [allMail, setAllMail] = useState();
  const [selectMail, setSelectMail] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1")
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3001/v1/upload")
      .then((res) => setAllMail(res.data.data))
      .catch((error) => console.log(error));
  });
  function handlerBtn(mail) {
    setSelectMail(mail);
  }

  return (
    <div className="w-screen h-screen bg-[#f8f8f8] flex ">
      <div className="w-[10vw] p-6 ">
        <SidebarAdmin />
      </div>
      <div className="h-full w-[90vw] py-6 pr-6 ">
        <div className="w-full mb-4">
          <User />
        </div>
        <div className="bg-[#ffffff] h-[84vh] rounded-lg p-4 shadow-md ">
          <div>
            {selectMail ? (
              <Mail state={setSelectMail} data={selectMail} />
            ) : (
              <>
                <div className=" border-b-[1px] h-[14vh]">
                  <form>
                    <div className="mb-4 flex items-center">
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Cалбар нэгж :
                        </label>
                        <select
                          name="selected"
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                        >
                          {officeName?.map((name, index) => {
                            return (
                              <option key={index} className="text-[14px]">
                                {name.office_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Майл төрөл
                        </label>
                        <select
                          name="selected"
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                        >
                          {mailtype?.map((name, index) => {
                            return (
                              <option key={index} className="text-[14px]">
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Эхлэх он сар
                        </label>
                        <input
                          type="date"
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                          // defaultValue={moment(new Date())
                          //   .subtract(10, "days")
                          //   .calendar()}
                        />
                      </div>
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Сүүлийн он сар
                        </label>
                        <input
                          type="date"
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Хайлт хийх
                        </label>
                        <button className="rounded-lg p-2 bg-[#1e45a2] text-[#ffffff]">
                          хайх
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="h-[62vh] overflow-auto scrollbar-hide">
                  {allMail?.map((mail, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-start items-center  border-b-[1px] m-3 h-[5vh]  "
                      >
                        <button
                          className="flex w-full justify-between"
                          onClick={() => handlerBtn(mail)}
                        >
                          <p className="text-[12px]">{mail.subject_txt}</p>
                          <p className="text-[12px]">
                            {moment(mail.dateTime).format("lll")}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
