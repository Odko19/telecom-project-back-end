const userService = require("../services/user.auth.services");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const userLogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    const foundUser = await userService.findUser(id);
    const validPass = foundUser.data[0].password;
    const validOfficeName = foundUser.data[0].office_name;
    if (password === validPass) {
      const token = jwt.sign(
        {
          office_name: validOfficeName,
        },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.json({
        success: true,
        data: {
          id: id,
          office_name: validOfficeName,
        },
        token: token,
      });
    } else {
      res.json({
        success: false,
        data: "Office name or Password do not match",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { userLogin };
