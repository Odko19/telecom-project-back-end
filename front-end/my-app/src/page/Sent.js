import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Mail from "./Mail";
import Navbar from "../componants/Navbar";

function Sent() {
  const [sent, setSent] = useState();
  const [selectMail, setSelectMail] = useState();
  const [user, setUser] = useState();
  const [checkedId, setCheckedId] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/sent/${user?.data.id}`)
      .then((res) => setSent(res.data.data))
      .catch((error) => console.log(error));
  }, [user, sent]);
  const checkBox = document.querySelectorAll(".select-option");
  function handlerBtn(mail) {
    setSelectMail(mail);
  }

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

  return (
    <div>
      {selectMail ? (
        <Mail state={setSelectMail} data={selectMail} />
      ) : (
        <>
          <div className="h-[78vh] w-full overflow-auto scrollbar-hide">
            <div className="border-b-[1px] w-full">
              <div className="w-full h-[8vh]">
                <Navbar checkBox={checkBox} checkedId={checkedId} />
              </div>
            </div>
            {sent?.map((mail, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-start items-center  border-b-[1px] m-3 h-[5vh] "
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
  );
}

export default Sent;
