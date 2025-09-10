// const Comment = require("../models/Comment");
// const Thread = require("../models/Thread");

// exports.getComments = async (req, res) => {
//   try {
//     const { threadId } = req.params;
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (page - 1) * limit;

//     const comments = await Comment.find({ thread: threadId })
//       .populate("author", "name")
//       .sort({ createdAt: 1 })
//       .limit(limit * 1)
//       .skip(skip)
//       .lean();

//     const total = await Comment.countDocuments({ thread: threadId });

//     res.json({
//       success: true,
//       comments,
//       totalPages: Math.ceil(total / limit),
//       currentPage: parseInt(page),
//       total,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.createComment = async (req, res) => {
//   try {
//     const { threadId } = req.params;
//     const { content } = req.body;

//     // Check if thread exists
//     const thread = await Thread.findById(threadId);
//     if (!thread) {
//       return res.status(404).json({
//         success: false,
//         message: "Thread not found",
//       });
//     }

//     const comment = await Comment.create({
//       content,
//       thread: threadId,
//       author: req.user.id,
//     });

//     // Update thread reply count
//     thread.replies += 1;
//     await thread.save();

//     const populatedComment = await Comment.findById(comment._id).populate(
//       "author",
//       "name"
//     );

//     res.status(201).json({
//       success: true,
//       comment: populatedComment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Comment = require("../models/Comment");
const Thread = require("../models/Thread");

// Get comments by thread slug
exports.getComments = async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const thread = await Thread.findOne({ slug });
    if (!thread) {
      return res
        .status(404)
        .json({ success: false, message: "Thread not found" });
    }

    const skip = (page - 1) * limit;

    const comments = await Comment.find({ thread: thread._id })
      .populate("author", "name")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Comment.countDocuments({ thread: thread._id });

    res.json({
      success: true,
      comments,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create comment by slug
exports.createComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;

    const thread = await Thread.findOne({ slug });
    if (!thread) {
      return res
        .status(404)
        .json({ success: false, message: "Thread not found" });
    }

    const comment = await Comment.create({
      content,
      thread: thread._id,
      author: req.user.id,
    });

    // Increment replies count
    Thread.updateOne({ _id: thread._id }, { $inc: { replies: 1 } }).exec();

    const populatedComment = await Comment.findById(comment._id).populate(
      "author",
      "name"
    );

    res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
