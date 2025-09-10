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
const slugify = require("slugify");

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
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
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate slug
threadSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    // Create basic slug
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    // Add random string to ensure uniqueness
    const randomStr = Math.random().toString(36).substring(2, 8);
    this.slug = `${baseSlug}-${randomStr}`;
  }
  next();
});

module.exports = mongoose.model("Thread", threadSchema);
