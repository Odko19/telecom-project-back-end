import axios from "axios";

const getAllOfficeName = async () => {
  return await axios("http://localhost:3001/v1");
};

const getUserLogin = async (id, pass) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    id: Number(id),
    password: Number(pass),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch("http://localhost:3001/v1/userLogin", requestOptions);
};

export const loginServices = {
  getAllOfficeName,
  getUserLogin,
};
