import axios from "axios";
import { useEffect, useState } from "react";

function Login() {
  const [officeName, setOfficeName] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/v1")
      .then((res) => setOfficeName(res.data.data))
      .catch((error) => console.log(error));
  });

  function handlerBtn(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: Number(e.target.selected.value),
      password: Number(e.target.password.value),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/userLogin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).success === false) {
          alert("amjiltgui");
        } else {
          window.localStorage.setItem("user", result);
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#ffffff] ">
      <div className="w-[15vw] bg-[#1e45a2] text-[#ffffff]  text-[30px] h-full flex justify-center items-center rounded-r-lg">
        {/* <p className="uppercase">telecom mongolia</p> */}
      </div>
      <div className="w-[85vw] flex justify-center items-center">
        <div className="w-[35vw]  p-5 flex flex-col justify-center items-center">
          <img src="./logo-white.png" alt="" className="w-[15vw] mb-[4vw]" />
          <form onSubmit={handlerBtn}>
            <div className="mb-4">
              <select
                name="selected"
                className="w-full bg-[rgba(217,217,217,0.4)] outline-0 focus:outline-0 text-[14px] p-3 rounded-lg"
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

              <input
                type="password"
                placeholder="Нууц үгээ оруулна уу. "
                name="password"
                className="w-full bg-[rgba(217,217,217,0.4)] outline-0 focus:outline-0 text-[14px] p-3 mt-5 rounded-lg"
              />
              <button
                type="submit "
                className="w-full bg-[#1e45a2] text-[#ffffff] p-3 mt-5 rounded-lg uppercase hover:bg-[#1B3E91] "
              >
                Нэвтрэх
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
