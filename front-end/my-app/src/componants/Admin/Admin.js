import SidebarAdmin from "../Admin/SidebarAdmin";
import User from "../User";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Mail from "../../page/Mail";

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
                <div className="border-b-[1px] h-[14vh] ">
                  <form onSubmit={handlerBtnFilter}>
                    <div className="mb-4 flex items-center">
                      <div className="flex flex-col mr-4">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Cалбар нэгж :
                        </label>
                        <select
                          name="select_name"
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
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
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
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
                          className="bg-[#f8f8f8] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                          // defaultValue={moment(new Date())
                          //   .subtract(10, "days")
                          //   .calendar()}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                          Хайлт хийх
                        </label>
                        <button
                          type="submit"
                          className="rounded-lg p-1.5 hover:bg-[red] bg-[#1e45a2]  text-[#ffffff]"
                        >
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
