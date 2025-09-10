// const Thread = require("../models/Thread");
// const Comment = require("../models/Comment");

// exports.getThreads = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const skip = (page - 1) * limit;

//     const threads = await Thread.find()
//       .populate("author", "name")
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip(skip)
//       .lean();

//     const total = await Thread.countDocuments();

//     res.json({
//       success: true,
//       threads,
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

// exports.getThread = async (req, res) => {
//   try {
//     const thread = await Thread.findById(req.params.id).populate(
//       "author",
//       "name"
//     );

//     if (!thread) {
//       return res.status(404).json({
//         success: false,
//         message: "Thread not found",
//       });
//     }

//     // Increment view count
//     thread.views += 1;
//     await thread.save();

//     // Get comments
//     const comments = await Comment.find({ thread: thread._id })
//       .populate("author", "name")
//       .sort({ createdAt: 1 })
//       .lean();

//     res.json({
//       success: true,
//       thread: {
//         ...thread.toObject(),
//         comments,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.createThread = async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     const thread = await Thread.create({
//       title,
//       content,
//       author: req.user.id,
//     });

//     const populatedThread = await Thread.findById(thread._id).populate(
//       "author",
//       "name"
//     );

//     res.status(201).json({
//       success: true,
//       thread: populatedThread,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const slugify = require("slugify"); // ✅ Slugify import karein

exports.getThreads = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const threads = await Thread.find()
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip)
      .lean();

    const total = await Thread.countDocuments();

    res.json({
      success: true,
      threads,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate(
      "author",
      "name"
    );

    if (!thread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Increment view count
    thread.views += 1;
    await thread.save();

    // Get comments
    const comments = await Comment.find({ thread: thread._id })
      .populate("author", "name")
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      thread: {
        ...thread.toObject(),
        comments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createThread = async (req, res) => {
  try {
    const { title, content } = req.body;

    // ✅ Pehle slug generate karein
    const slug = slugify(title, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
    });

    const thread = await Thread.create({
      title,
      slug, // ✅ Slug add karein
      content,
      author: req.user.id,
    });

    const populatedThread = await Thread.findById(thread._id).populate(
      "author",
      "name"
    );

    res.status(201).json({
      success: true,
      thread: populatedThread,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NAYA FUNCTION: Get Thread by Slug
exports.getThreadBySlug = async (req, res) => {
  try {
    const thread = await Thread.findOne({ slug: req.params.slug }).populate(
      "author",
      "name"
    );

    if (!thread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Increment view count
    thread.views += 1;
    await thread.save();

    // Get comments
    const comments = await Comment.find({ thread: thread._id })
      .populate("author", "name")
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      thread: {
        ...thread.toObject(),
        comments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
