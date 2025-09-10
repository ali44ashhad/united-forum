// scripts/updateSlugs.js (temporary script)
const mongoose = require("mongoose");
const Thread = require("../models/Thread");
const slugify = require("slugify");

async function updateSlugs() {
  await mongoose.connect("your-mongodb-uri");

  const threads = await Thread.find({ slug: { $exists: false } });

  for (let thread of threads) {
    thread.slug = slugify(thread.title, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
    });
    await thread.save();
  }

  console.log("Slugs updated for", threads.length, "threads");
  process.exit();
}

updateSlugs();
