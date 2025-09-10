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

const mongoose = require("mongoose");
const slugify = require("slugify"); // Naya package install karna hoga

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      // ✅ NAYA FIELD ADD KAREIN
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
  {
    timestamps: true,
  }
);

// ✅ Automatic slug generation before saving
threadSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g, // Special characters remove karein
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Thread", threadSchema);
