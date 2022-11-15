const userService = require("../services/user.services");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const userLogin = async (req, res) => {
  try {
    const { office_name, passport } = req.body;
    if (Object.values(office_name).length === 0) {
      res.json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser = await userService.findUser(req);
      const validPassword = foundUser.data[0].passport;
      const validOfficeName = foundUser.data[0].office_name;
      if (passport === validPassword) {
        const token = jwt.sign(
          {
            office_name: validOfficeName,
            passport,
          },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.json({
          success: true,
          data: {
            office_name: office_name,
          },
          token: token,
        });
      } else {
        res.json({
          success: false,
          data: "Office name or Password do not match",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { userLogin };
