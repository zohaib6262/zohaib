const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const jwtPassword = "zohaib123";
mongoose.connect(
  "mongodb+srv://admin:zohaib259@cluster0.qshup.mongodb.net/user_app"
);
app.use(
  cors({
    origin: "*", // Allow only this origin
    methods: ["GET", "POST"], // Allow specific methods if needed
    allowedHeaders: ["Content-Type"], // Allow specific headers if needed
  })
);
// Middleware to parse JSON and handle CORS
app.use(express.json());
// app.use(cors());

const Users = mongoose.model("Users", {
  name: String,
  username: { type: String, unique: true }, // Ensure unique usernames
  password: String,
});

// POST route to handle signup
app.post("/authsignup", async (req, res) => {
  const { name, username, password } = req.body;

  const existingUser = await Users.findOne({ username });

  if (existingUser) {
    return res.status(409).json({ msg: "User already exists" });
  }

  const user = new Users({ name, username, password });
  await user.save();
  res.status(200).json({ msg: "User saved in DB successfully" });
});

app.post("/authlogin", async (req, res) => {
  try {
    // Find user by username
    const existingUser = await Users.findOne({ username: req.body.username });

    // If user is not found, send 401 Unauthorized with a message
    if (!existingUser) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate token using the user's username (or any other identifier)
    const token = jwt.sign({ username: req.body.username }, jwtPassword, {
      expiresIn: "1h",
    });

    // Send back the token in response
    return res.status(200).json({ token, id: existingUser._id });
  } catch (err) {
    console.error(err); // Log errors for debugging
    return res.status(500).json({ msg: "Internal server error" }); // Send 500 Internal Server Error if something goes wrong
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);

  if (token) {
    jwt.verify(token, jwtPassword, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

const Interest = mongoose.model("Interest", {
  userId: String,
  id: String,
  total: String,
  principle: String,
  interestRate: String,
});

// POST route to handle interest calculation
app.post(
  "/calculateInterestRate",
  cors(),
  authenticateJWT,
  async (req, res) => {
    const { principle, rate, duration, userId } = req.body;
    const interestRate =
      (parseFloat(principle) * parseFloat(rate) * parseFloat(duration)) / 100;
    const total = parseFloat(principle) + interestRate;

    const interestRateData = new Interest({
      userId,
      id: Math.random().toString(),
      total: total.toString(),
      principle: principle.toString(),
      interestRate: interestRate.toString(),
    });

    await interestRateData.save();
    res.status(200).json({
      msg: "Interest Rate Data saved in DB successfully.",
      interestRate,
      total,
    });
  }
);

app.get("/interestRate", cors(), async (req, res) => {
  const exitingUser = await Interest.find();
  console.log(exitingUser);
  res.json({ data: exitingUser });
});

// Start the server
app.listen(5500, () => {
  console.log(`Server running at http://localhost:${5500}`);
});
