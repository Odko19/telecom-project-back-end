import SidebarAdmin from "../Admin/SidebarAdmin";
import User from "../User";
import axios from "axios";
import moment from "moment";
import Mail from "../../page/Mail";
import { useEffect, useState } from "react";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";

const mailtype = [
  { type: "Ирсэн майл", name: "office_name_to" },
  { type: "Явуулсан майл", name: "office_name_from" },
  { type: "Архивласан майл", name: "archives" },
];

function Admin() {
  const [officeName, setOfficeName] = useState();
  const [allMail, setAllMail] = useState();
  const [selectMail, setSelectMail] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1")
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1/upload")
      .then((res) => setAllMail(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  function handlerBtn(mail) {
    setSelectMail(mail);
  }

  function handlerBtnFilter(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      office_id: e.target.select_name.value,
      mail_type: e.target.select_mail.value,
      start_date: e.target.start_date.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/filter", requestOptions)
      .then((response) => response.text())
      .then((result) => setAllMail(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  }

  /*  SEARCH */

  function handlerSearch(e) {
    e.preventDefault();
    const result = allMail.filter((subject) =>
      subject.subject_txt.toLowerCase().includes(e.target.value)
    );
    setAllMail(result);
  }

  return (
    <div className="w-screen h-screen bg-[rgba(217,217,217,0.4)] flex ">
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
                <div className="border-b-[1px] h-[18vh] ">
                  <form onSubmit={handlerBtnFilter}>
                    <div className="mb-4 flex items-center">
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Cалбар нэгж :
                        </label>
                        <select
                          name="select_name"
                          className="bg-[rgba(217,217,217,0.4)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                        >
                          {officeName?.map((name, index) => {
                            return (
                              <option
                                key={index}
                                value={name.id}
                                className="text-[14px]"
                              >
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
                          name="select_mail"
                          className="bg-[rgba(217,217,217,0.4)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                        >
                          {mailtype?.map((mail, index) => {
                            return (
                              <option
                                key={index}
                                value={mail.name}
                                className="text-[14px]"
                              >
                                {mail.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Он сар
                        </label>
                        <input
                          type="date"
                          name="start_date"
                          className="bg-[rgba(217,217,217,0.4)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                          // defaultValue={moment(new Date())
                          //   .subtract(10, "days")
                          //   .calendar()}
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Хайлт хийх
                        </label>
                        <button
                          type="submit"
                          className="rounded-lg p-[10px]  hover:bg-[#1B3E91] bg-[#1e45a2]  flex justify-center text-[#ffffff]/[.6] hover:text-[white]"
                        >
                          <RiFilterLine />
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className=" w-full  rounded-lg text-[12px]">
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
                <div className="h-[61vh] overflow-auto scrollbar-hide">
                  {allMail?.map((mail, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-start items-center  border-b-[1px]  my-[10px] h-[5vh]  "
                      >
                        <button
                          className="flex w-full justify-between"
                          onClick={() => handlerBtn(mail)}
                        >
                          <div className="flex ">
                            <p className="text-[12px] w-[300px] flex items-start">
                              {mail.office_from}
                            </p>
                            {mail.subject_txt.length > 50 ? (
                              <p className="text-[12px] ml-5 z-40">
                                {mail.subject_txt.slice(0, 50)} ...
                              </p>
                            ) : (
                              <p className="text-[12px] ml-5 ">
                                {mail.subject_txt}
                              </p>
                            )}
                          </div>
                          <p className="text-[12px] mr-[10px]">
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
