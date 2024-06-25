const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User } = require("./db/index.js");

const PORT = process.env.PORT || 3000;
const SECRET = "SecRete"; // This should be in an environment variable in a real application

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Nidhin_5656:Nidhin%401606@cluster0.anuhjsu.mongodb.net/",
  {
    dbName: "Login",
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(204).json({ message: "no username or password" });
    } else {
      const user = await User.findOne({
        username: username,
        password: password,
      });
      if (user) {
        res.status(200).json({ message: "USer Found " });
      }
      if (!user) {
        res.status(304).json({ message: "No user Data found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(204).json({ message: "no username or password" });
    } else {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(304).json({ message: "User already exists" });
      }
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
