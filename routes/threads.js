// const express = require("express");
// const {
//   getThreads,
//   getThread,
//   createThread,
// } = require("../controllers/threadController");
// const { protect } = require("../middleware/auth");
// const {
//   validateThread,
//   handleValidationErrors,
// } = require("../middleware/validation");

// const router = express.Router();

// router.get("/", getThreads);
// router.get("/:id", getThread);
// router.post("/", protect, validateThread, handleValidationErrors, createThread);

// module.exports = router;

const express = require("express");
const {
  getThreads,
  getThread,
  getThreadBySlug, // ✅ Naya function import karein
  createThread,
} = require("../controllers/threadController");
const { protect } = require("../middleware/auth");
const {
  validateThread,
  handleValidationErrors,
} = require("../middleware/validation");

const router = express.Router();

router.get("/", getThreads);
router.get("/:id", getThread);
router.get("/slug/:slug", getThreadBySlug); // ✅ NAYA ROUTE ADD KAREIN
router.post("/", protect, validateThread, handleValidationErrors, createThread);

module.exports = router;
