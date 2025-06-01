const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://charging-app.netlify.app",
  "https://charging-app.onrender.com",
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., direct API calls) or origins in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Optional: for future use with cookies or auth headers
  })
);

// Handle preflight requests explicitly for all routes
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/stations", require("./routes/stations"));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });