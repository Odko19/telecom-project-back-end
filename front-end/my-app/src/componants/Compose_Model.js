import { useEffect, useState, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { composeServices } from "../services/composeServices";
import Modal from "react-modal";

function Compose_Model({ showModel, setShowModel }) {
  const [officeName, setOfficeName] = useState();
  const [user, setUser] = useState();
  const [fileList, setFileList] = useState([]);
  const [sent_mail, setSent_Mail] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    composeServices
      .getAllOfficeName()
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  function handlerBtn(e) {
    e.preventDefault();
    if (sent_mail === "sent") {
      var formdata = new FormData();
      if (fileList) {
        fileList.map((image) => {
          formdata.append("image", image);
        });
        formdata.append("office_name_from", user?.data.id);
        formdata.append("office_name_to", e.target.selected.value);
        formdata.append("subject_txt", e.target.subject.value);
        formdata.append("mail_time", e.target.mail_type.value);
      }
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch("http://localhost:3001/v1/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (JSON.parse(result).success === true) {
            toast("майл явсан");
            // window.location.href = "/sent";
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      setFileList(fileList.filter((a) => a.name !== sent_mail));
    }
  }

  /* form two button  */
  function handlerSent(sent) {
    setSent_Mail(sent);
    // setShowModel(false);
  }
  function handlerImage(name) {
    setSent_Mail(name);
  }

  // drag in drop
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop = (e) => {
    const newFile = e.target.files;
    if (newFile) {
      const updateList = [...fileList, ...newFile];
      setFileList(updateList);
    }
  };

  return (
    <Modal
      isOpen={showModel}
      ariaHideApp={false}
      onRequestClose={() => setShowModel(false)}
      className="absolute bottom-0 right-[2vw] bg-[white] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mb-6"
      style={{
        overlay: {
          backgroundColor: "none",
        },
      }}
    >
      <ToastContainer />
      <div className="p-3 bg-[#1e45a2] rounded-t-lg text-[rgba(255,255,255,0.7)] flex w-full justify-between">
        <p>Албан бичиг илгээх</p>
        <button
          className="hover:text-[white]"
          onClick={() => setShowModel(false)}
        >
          <RiCloseFill />
        </button>
      </div>

      <form
        onSubmit={handlerBtn}
        className="p-3 w-[500px] h-[450px] 2xl:w-[550px] 2xl:h-[500px] flex flex-col justify-between"
      >
        <div>
          <div className="mb-4 w-full flex  border-b-[1px] border-[rgba(217,217,217,0.6)]">
            <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-2 w-[60px]">
              To :
            </label>
            <select
              name="selected"
              className="bg-transparent w-full outline-0 focus:outline-0 text-[14px] mb-2"
            >
              {officeName?.map((name, index) => {
                if (
                  name.office_name !== "Админ" &&
                  name.office_name !== user?.data.office_name
                ) {
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
          <div className="mb-4 w-full flex  border-b-[1px] border-[rgba(217,217,217,0.6)]">
            <label className="text-[rgba(0,0,0,0.5)] text-[12px] mb-2 w-[60px]">
              Type
            </label>
            <select
              name="mail_type"
              className="bg-transparent w-full outline-0 focus:outline-0 text-[14px] mb-2"
            >
              <option value="Яаралтай">Яаралтай</option>
              <option value="Энгийн">Энгийн</option>
            </select>
          </div>

          <div className="mb-6 w-full flex items-center border-b-[1px] border-[rgba(217,217,217,0.8)]">
            <label className="block text-[rgba(0,0,0,0.5)] w-[60px] mb-2 text-[12px]">
              Subject :
            </label>
            <input
              name="subject"
              className="ml-1 rounded bg-transparent w-full text-[14px] mb-2"
              type="text"
            />
          </div>

          <div>
            <div
              ref={wrapperRef}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              multiple
              className="mb-4 w-full h-[50px] flex justify-center items-center relative border-[#243c5a] border-[2px] border-dashed rounded-lg hover:bg-[rgba(217,217,217,0.6)] "
            >
              <p className="text-[rgba(0,0,0,0.5)] text-[12px]">
                Image upload && Drop files here
              </p>
              <input
                accept="image/*"
                className="rounded w-full h-full bg-transparent text-[14px] absolute inset-0 opacity-0"
                type="file"
                multiple
                name="image"
                onChange={onFileDrop}
              />
            </div>
            <div className="flex w-full 2xl:h-[200px] h-[150px] overflow-y-scroll">
              {fileList.length > 0 ? (
                <div className="w-full text-[12px] m-2">
                  {fileList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex justify-between bg-[rgba(217,217,217,0.7)] p-2 mb-2 rounded-lg"
                      >
                        <p>{item.name}</p>
                        <button
                          onClick={() => handlerImage(item.name)}
                          className="hover:text-[#1e45a2]"
                        >
                          <RiCloseFill />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <button
          className="font-medium bg-[#1e45a2] text-[#fff] text-[12px] w-full hover:bg-[#1B3E91] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handlerSent("sent")}
        >
          Илгээх
        </button>
      </form>
    </Modal>
  );
}

export default Compose_Model;
