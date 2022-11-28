import { useEffect, useState } from "react";
import { inboxServices } from "../../services/inboxServices";
import moment from "moment";
import Mail from "./Mail";
import Navbar from "../Navbar";

function Inbox() {
  const [inbox, setInbox] = useState();
  const [selectMail, setSelectMail] = useState();
  const [user, setUser] = useState();
  const [checkedId, setCheckedId] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);
  useEffect(() => {
    if (user) {
      inboxServices
        .getAllInbox(user?.data.id)
        .then((res) => setInbox(res.data.data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  const checkBox = document.querySelectorAll(".select-option");

  function checkedAll() {
    const array = [];
    const checkBox1 = document.querySelectorAll(".select-option");
    for (let i = 0; i < checkBox1.length; i++) {
      if (checkBox1[i].checked === true) {
        array.push(Number(checkBox1[i].value));
      }
    }
    setCheckedId(array);
  }

  function handlerBtn(mail, id) {
    setSelectMail(mail);
    inboxServices
      .getNewMail(id)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).success === true) {
          if (user) {
            inboxServices
              .getAllInbox(user?.data.id)
              .then((res) => setInbox(res.data.data))
              .catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => console.log("error", error));
  }

  function onSearchChanged(event) {
    const result = inbox.filter((subject) =>
      subject.subject_txt.toLowerCase().includes(event)
    );
    setInbox(result);
  }

  return (
    <div className="h-full relative rounded-lg bg-[white] shadow-md">
      {selectMail ? (
        <Mail state={setSelectMail} data={selectMail} />
      ) : (
        <div className="h-full">
          <div className="border-b-[1px] w-full ">
            <div className="w-full h-[9vh]">
              <Navbar
                checkBox={checkBox}
                checkedId={checkedId}
                onSearch={onSearchChanged}
              />
            </div>
          </div>
          <div className="px-5 h-[82vh] overflow-y-scroll">
            {inbox?.map((mail, index) => {
              return mail.new_msg === 0 ? (
                <div
                  key={index}
                  className="flex justify-start items-center font-semibold border-b-[1px] my-[10px] h-[5vh] hover:shadow-md "
                >
                  <input
                    type="checkbox"
                    value={mail.id}
                    className="mr-2 select-option"
                    onChange={checkedAll}
                  />
                  <button
                    className="flex w-full justify-between"
                    onClick={() => handlerBtn(mail, mail.id)}
                  >
                    <div className="flex ">
                      <p className="text-[12px] w-[300px] flex items-start">
                        {mail.office_from}
                      </p>
                      {mail.subject_txt.length > 50 ? (
                        <p className="text-[12px]">
                          {mail.subject_txt.slice(0, 50)} ...
                        </p>
                      ) : (
                        <p className="text-[12px]">{mail.subject_txt}</p>
                      )}
                    </div>

                    <p className="text-[12px]">
                      {moment(mail.dateTime_now).format("lll")}
                    </p>
                  </button>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex justify-start items-center  font-light border-b-[1px] my-[10px] h-[5vh] hover:shadow-md "
                >
                  <input
                    type="checkbox"
                    value={mail.id}
                    className="mr-2 select-option"
                    onChange={checkedAll}
                  />
                  <button
                    className="flex w-full justify-between"
                    onClick={() => handlerBtn(mail)}
                  >
                    <div className="flex ">
                      <p className="text-[12px] w-[300px] flex items-start">
                        {mail.office_from}
                      </p>
                      {mail.subject_txt.length > 50 ? (
                        <p className="text-[12px]">
                          {mail.subject_txt.slice(0, 50)} ...
                        </p>
                      ) : (
                        <p className="text-[12px]">{mail.subject_txt}</p>
                      )}
                    </div>

                    <p className="text-[12px]">
                      {moment(mail.dateTime_now).format("lll")}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
