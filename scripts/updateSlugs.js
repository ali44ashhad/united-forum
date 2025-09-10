// scripts/updateSlugs.js
const mongoose = require("mongoose");
const Thread = require("../models/Thread");
const slugify = require("slugify");

async function updateSlugs() {
  try {
    await mongoose.connect("your-mongodb-uri");
    console.log("Connected to MongoDB");

    const threads = await Thread.find({ slug: { $exists: false } });
    console.log(`Found ${threads.length} threads without slugs`);

    for (let thread of threads) {
      thread.slug = slugify(thread.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
      });
      await thread.save();
      console.log(`Updated thread: ${thread.title} -> ${thread.slug}`);
    }

    console.log("Slugs updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

updateSlugs();
