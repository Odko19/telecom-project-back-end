import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Compose() {
  const [officeName, setOfficeName] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  function handlerBtn(e) {
    e.preventDefault();
    console.log(e.target.image.files[0]);
    var formdata = new FormData();
    formdata.append("image", e.target.image.files[0]);
    formdata.append("office_name_from", user?.data.id);
    formdata.append("office_name_to", e.target.selected.value);
    formdata.append("subject_txt", e.target.subject.value);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/upload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).success === true) {
          alert("sent mail");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1")
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
  });

  return (
    <div className="h-full  p-6">
      <h4 className="mb-4">New message</h4>
      <form onSubmit={handlerBtn}>
        <div className="mb-4">
          <label className="block text-[rgba(0,0,0,0.5)]  mb-2 text-[12px]">
            To :
          </label>

          <select
            name="selected"
            className="w-full bg-transparent  outline-0 focus:outline-0 text-[14px]"
          >
            {officeName?.map((name, index) => {
              return (
                <option
                  key={index}
                  value={`${name.id}`}
                  className="text-[14px]"
                >
                  {name.office_name}
                </option>
              );
            })}
          </select>
          <hr />
        </div>
        <div className="mb-4">
          <label className="block text-[rgba(0,0,0,0.5)]  mb-2 text-[12px] mb-2">
            Subject :
          </label>

          <input
            name="subject"
            className=" rounded w-full bg-transparent outline-0 focus:outline-0 text-[14px]"
            type="text"
          />
          <hr />
        </div>
        <div className="mb-4">
          <input
            accept="image/*"
            className="rounded w-full bg-transparent  outline-0 focus:outline-0 mb-4 text-[14px]"
            type="file"
            multiple
            name="image"
          />
        </div>
        <div className="flex items-center justify-between w-full mt-[30vh]">
          <button
            className="uppercase bg-[#1e45a2] text-[#fff]  text-[12px] w-full  hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Илгээх
          </button>
        </div>
      </form>
    </div>
  );
}

export default Compose;
