
const imageService = require("../services/image.services");

const uploadImage = async (req, res) => {
    try {
      res.json(await imageService.getImageUpload(req));
    } catch (error) {
      console.error(error);
    }
  };


module.exports = {uploadImage};