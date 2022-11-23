import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Mail from "./Mail";
import Navbar from "../componants/Navbar";

function Archives() {
  const [archives, setArchives] = useState();
  const [selectMail, setSelectMail] = useState();
  const [user, setUser] = useState();
  const [checkedId, setCheckedId] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")).data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/v1/archivesList/${user?.id}`)
        .then((res) => setArchives(res.data.data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  const checkBox = document.querySelectorAll(".select-option");
  // for (let i = 0; i < checkBox.length; i++) {
  //   if ((checkBox[i].checked = false)) {
  //     console.log(checkBox[i].value);
  //   }
  // }

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

  function handlerBtn(mail) {
    setSelectMail(mail);
  }

  function onSearchChanged(event) {
    const result = archives.filter((subject) =>
      subject.subject_txt.toLowerCase().includes(event)
    );
    setArchives(result);
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
                <Navbar
                  checkBox={checkBox}
                  checkedId={checkedId}
                  onSearch={onSearchChanged}
                />
              </div>
            </div>
            {archives?.map((mail, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-start items-center  border-b-[1px] my-[10px] h-[5vh] hover:shadow-md"
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
                      <p className="text-[12px] w-[220px] flex items-start">
                        {mail.office_from}
                      </p>
                      {mail.subject_txt.length > 50 ? (
                        <p className="text-[12px] ml-5 z-40">
                          {mail.subject_txt.slice(0, 50)} ...
                        </p>
                      ) : (
                        <p className="text-[12px] ml-5 ">{mail.subject_txt}</p>
                      )}
                    </div>
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

export default Archives;
