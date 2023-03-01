const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const entryValidation = require("./entry.validation");
const entryController = require("./entry.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(entryValidation.createEntry),
    entryController.createEntry
  )
  .get(
    auth(),
    validate(entryValidation.getAlCompletedlEntries),
    entryController.getAlCompletedlEntries
  );

router.get(
  "/pending",
  auth(),
  validate(entryValidation.getAlPendingEntries),
  entryController.getAlPendinglEntries
);

router
  .route("/:id")
  .get(
    auth(),
    validate(entryValidation.getEntryById),
    entryController.getEntryById
  )
  .patch(
    auth(),
    validate(entryValidation.updateEntry),
    entryController.updateEntryById
  );
//   .delete(auth(), validate(entryValidation.getEntry), entryController.deleteEntryById);

module.exports = router;
