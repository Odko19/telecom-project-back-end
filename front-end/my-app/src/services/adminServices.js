import axios from "axios";

const getAllOfficeName = async () => {
  return await axios("http://localhost:3001/v1");
};

const getAllMail = async () => {
  return await axios("http://localhost:3001/v1/upload");
};
const getMailType = async () => {
  return await axios("http://localhost:3001/v1/mailType");
};

const getAllFilter = async (select_name, select_mail, start_date) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    office_id: select_name,
    mail_type: select_mail,
    start_date: start_date,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch("http://localhost:3001/v1/filter", requestOptions);
};

export const adminServices = {
  getAllOfficeName,
  getAllMail,
  getAllFilter,
  getMailType,
};
