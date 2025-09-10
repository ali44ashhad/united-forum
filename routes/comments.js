const express = require("express");
const {
  getComments,
  createComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/auth");
const {
  validateComment,
  handleValidationErrors,
} = require("../middleware/validation");

const router = express.Router();

router.get("/thread/:threadId", getComments);
router.post(
  "/thread/:threadId",
  protect,
  validateComment,
  handleValidationErrors,
  createComment
);

module.exports = router;
