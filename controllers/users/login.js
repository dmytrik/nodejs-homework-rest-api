const { User } = require("../../models");
const { joiUserSchema } = require("../../models/users");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      const error = new Error("Email or password is wrong");
      error.status = 401;
      throw error;
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
    res.status(200).json({
      status: "success",
      code: 200,
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
