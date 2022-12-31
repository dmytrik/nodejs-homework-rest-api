const { User } = require("../../models");
const { joiUserSchema } = require("../../models/users");

const register = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);
    await newUser.save();
    const { email: dbEmail, subscription: dbSub } = await User.findOne({
      email,
    });
    res.status(201).json({
      status: "created",
      code: 201,
      user: { email: dbEmail, subscription: dbSub },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
