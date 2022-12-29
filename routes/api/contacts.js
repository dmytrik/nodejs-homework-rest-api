const express = require("express");
const { contactsController } = require("../../controllers");

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", contactsController.updateContactById);

router.patch("/:contactId/favorite", contactsController.updateStatusContact);

module.exports = router;
