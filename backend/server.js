// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/auth.routes");
// const complaintRoutes = require("./routes/complaint.routes");
// const adminRoutes = require("./routes/admin.routes");
// const officerRoutes = require("./routes/officer.routes");

// const app = express();

// // Connect MongoDB
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/officer", officerRoutes);


// // Health check
// app.get("/", (req, res) => res.send("SGIMS Backend Running Successfully!"));

// // Start server
// const PORT = process.env.PORT || 5000;
// const HOST = '127.0.0.1'
// app.listen(PORT,HOST,() => console.log(`http://${HOST}:${PORT}`));



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const complaintRoutes = require("./routes/complaint.routes");
const adminRoutes = require("./routes/admin.routes");
const officerRoutes = require("./routes/officer.routes");

const app = express();

// Connect MongoDB
connectDB();

// CORS FIX FOR FRONTEND (VERY IMPORTANT)
app.use(cors({
  origin: "https://sgims.vercel.app/" || "http://localhost:5173",   // frontend url
  credentials: true,                 // allow cookies/JWT
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/officer", officerRoutes);

// Health check
app.get("/", (req, res) => res.send("SGIMS Backend Running Successfully!"));

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
