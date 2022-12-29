const { Contact } = require("../../models");
const { joiSchemaByFavorite } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    if (favorite === undefined) {
      res.status(400).json({
        status: "bad request",
        code: 400,
        message: "missing field favorite",
      });
      return;
    }
    const { error } = joiSchemaByFavorite.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!result) {
      const error = new Error(`contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
