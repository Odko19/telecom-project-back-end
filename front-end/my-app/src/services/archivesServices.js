import axios from "axios";

const getAllArchives = async (user_id) => {
  return await axios(`http://localhost:3001/v1/archivesList/${user_id}`);
};

export const archivesServices = {
  getAllArchives,
};
