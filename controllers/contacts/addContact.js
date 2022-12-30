const { Contact } = require("../../models");
const { joiSchema } = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = req.body;
    if (newContact.favorite === undefined) {
      newContact.favorite = false;
    }
    const result = await Contact.create(newContact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
