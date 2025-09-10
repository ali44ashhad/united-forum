// const express = require("express");
// const {
//   getComments,
//   createComment,
// } = require("../controllers/commentController");
// const { protect } = require("../middleware/auth");
// const {
//   validateComment,
//   handleValidationErrors,
// } = require("../middleware/validation");

// const router = express.Router();

// router.get("/thread/:threadId", getComments);
// router.post(
//   "/thread/:threadId",
//   protect,
//   validateComment,
//   handleValidationErrors,
//   createComment
// );

// module.exports = router;

const express = require("express");
const {
  getComments,
  createComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET /api/comments/:slug
router.get("/:slug", getComments);

// POST /api/comments/:slug
router.post("/:slug", protect, createComment);

module.exports = router;
