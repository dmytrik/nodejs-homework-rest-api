const Contact = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts) {
      throw new Error("server error");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
