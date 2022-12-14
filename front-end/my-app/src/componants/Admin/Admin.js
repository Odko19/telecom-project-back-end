import SidebarAdmin from "../Admin/SidebarAdmin";
import moment from "moment";
import Mail from "../page/Mail";
import { useEffect, useState } from "react";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";
import { adminServices } from "../../services/adminServices";

function Admin() {
  const [officeName, setOfficeName] = useState();
  const [allMail, setAllMail] = useState();
  const [selectMail, setSelectMail] = useState();
  const [mailType, setMailType] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    adminServices
      .getAllOfficeName()
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    adminServices
      .getAllMail()
      .then((res) => setAllMail(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    adminServices
      .getMailType()
      .then((res) => setMailType(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  function handlerBtn(mail) {
    setSelectMail(mail);
  }

  function handlerBtnFilter(e) {
    e.preventDefault();
    adminServices
      .getAllFilter(
        e.target.select_name.value,
        e.target.select_mail.value,
        e.target.start_date.value
      )
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
    if (result.length === 0) {
      setSearch("Илэрч алга");
    } else {
      setAllMail(result);
    }
  }

  return (
    <div className="w-screen h-screen bg-[rgba(217,217,217,0.7)] flex ">
      <div className="w-[10vw] p-6 ">
        <SidebarAdmin />
      </div>
      <div className="h-[100vh] w-[90vw] py-6 pr-6 ">
        <div className="h-full bg-[white] rounded-lg shadow-md p-5">
          {selectMail ? (
            <Mail state={setSelectMail} data={selectMail} />
          ) : (
            <>
              <div className="border-b-[1px] h-[20vh] min-[1400px]:h-[20vh]">
                <form onSubmit={handlerBtnFilter}>
                  <div className="mb-4 flex items-center">
                    <div className="flex flex-col mr-4">
                      <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                        Cалбар нэгж :
                      </label>
                      <select
                        name="select_name"
                        className="bg-[rgba(217,217,217,0.7)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                      >
                        {officeName?.map((name, index) => {
                          if (name.office_name !== "Админ") {
                            return (
                              <option
                                key={index}
                                value={`${name.id}`}
                                className="text-[14px]"
                              >
                                {name.office_name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col mr-4">
                      <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-3">
                        Майл төрөл
                      </label>
                      <select
                        name="select_mail"
                        className="bg-[rgba(217,217,217,0.7)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
                      >
                        {mailType?.map((mail, index) => {
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
                        className="bg-[rgba(217,217,217,0.7)] rounded-lg outline-0 focus:outline-0 text-[14px] p-2"
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
              {search ? (
                <div className=" px-5 h-[67vh] flex justify-center items-center">
                  <p className="text-[12px]"> {search}</p>
                </div>
              ) : (
                <div className="h-[67vh] overflow-auto scrollbar-hide">
                  {allMail?.map((mail, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-start items-center  border-b-[1px]  my-[10px] h-[5vh]  hover:shadow-md"
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
                            {moment(mail.dateTime_now).format("lll")}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
