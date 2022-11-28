import axios from "axios";

const getAllInbox = async (user_id) => {
  return await axios(`http://localhost:3001/v1/inbox/${user_id}`);
};

const getNewMail = async (id) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return await fetch(`http://localhost:3001/v1/newMsg/${id}`, requestOptions);
};

export const inboxServices = {
  getAllInbox,
  getNewMail,
};
