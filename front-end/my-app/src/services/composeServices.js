import axios from "axios";

const getAllOfficeName = async () => {
  return await axios("http://localhost:3001/v1");
};

export const composeServices = {
  getAllOfficeName,
};
