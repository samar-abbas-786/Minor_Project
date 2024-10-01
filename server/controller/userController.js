const { User } = require("../models/userSchema.js");

const register = async (req, res) => {
  try {
    const { name, email, password, profession } = req.body;

    if (!name || !email || !password || !profession) {
      return res.status(400).json({
        message: "Missing Fields",
        description: "Please Provide all the fields",
      });
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        message: "User Existed",
        description: "This email is already taken",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      profession,
    });
    return res.status(200).json({
      message: "Successfully Registered!!",
      description: `${user.name} registered succesfully`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed",
      description: "There is some issue in signup",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Failed misirebally",
      description: "Please Provide all the fileds",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(400)
      .json({ message: "Failed", description: "User not found" });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return resṭ
      .status(400)
      .json({ message: "Failed", description: "Password Did Not Match" });
  }
  res.status(200).json({
    message: "Success",
    description: `${user.name} successfully Login`,
  });
  //   sendToken(user, 201, res, "User Logged In!");
};

const logout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now() + 90 * 60000),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
      description: "",
    });
};

// const getUser = (req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };
module.exports = { login, logout, register };
