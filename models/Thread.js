// const mongoose = require("mongoose");

// const threadSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: [200, "Title cannot exceed 200 characters"],
//     },
//     content: {
//       type: String,
//       required: [true, "Content is required"],
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Author is required"],
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//     replies: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Thread", threadSchema);

// models/Thread.js
const mongoose = require("mongoose");
const slugify = require("slugify");

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    replies: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug before save
threadSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Thread", threadSchema);
