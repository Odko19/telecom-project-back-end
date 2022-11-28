import axios from "axios";

const getAllSent = async (user_id) => {
  return await axios(`http://localhost:3001/v1/sent/${user_id}`);
};

export const sentServices = {
  getAllSent,
};
