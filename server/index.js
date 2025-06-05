const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const dbConnection = require("./database/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const instructionRouter = require("./routes/instructionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const courseRoutes = require("./routes/courseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const contactRoutes = require("./routes/contactRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

dbConnection();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "PUT", "POST", "DELETE"],
    origin: "https://edupi-samar786.vercel.app",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/instruction", instructionRouter);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/Gallery", galleryRoutes);

app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
