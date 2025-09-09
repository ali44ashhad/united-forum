// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/database");
// const errorHandler = require("./middleware/error");

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Allowed origins (dev + prod)
// const allowedOrigins = [
//   "http://localhost:5173", // Vite default
//   "http://localhost:3000", // CRA default
//   "https://fundzz.com", // Production domain
//   "https://www.fundzz.com", // With www
// ];

// // Middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/threads", require("./routes/threads"));
// app.use("/api/comments", require("./routes/comments"));

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "UnitedCalculator Forum API is running",
//     timestamp: new Date().toISOString(),
//     version: "1.0.0",
//   });
// });

// // Error handling middleware (must be last)
// app.use(errorHandler);

// // Handle 404
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "API endpoint not found",
//   });
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(
//     `🚀 Server running in ${
//       process.env.NODE_ENV || "development"
//     } mode on port ${PORT}`
//   );
//   console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`❌ Unhandled Rejection: ${err.message}`);
//   server.close(() => {
//     process.exit(1);
//   });
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // CRA dev
  process.env.CORS_ORIGIN, // Production frontend
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/threads", require("./routes/threads"));
app.use("/api/comments", require("./routes/comments"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "UnitedCalculator Forum API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Listen on Render-provided port or fallback
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
