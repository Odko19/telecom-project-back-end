
 function getImageUpload(req) {
   const {title, desc} = req.body
   console.log(title)
   console.log(desc)
   const message= "Image upload successfully"
   const url= req.file.filename
    return {
        message, url
    };
  }

  module.exports = {
    getImageUpload
  };
  