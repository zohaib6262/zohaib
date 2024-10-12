// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 3000;
// const fs = require("fs");
// const sumData = require("./sumData.json");

// // Middleware to parse JSON and handle CORS
// app.use(express.json());
// app.use(cors());

// // POST route to handle the addition
// function middlewareAddNumber(req, res, next) {
//   const { firstNum, secondNum } = req.body;

//   // Validate if both numbers are provided and are numbers
//   if (typeof firstNum === "number" && typeof secondNum === "number") {
//     if (
//       fs.readFile("./sumData.json", "utf-8", (err, data) => {
//         if (err) {
//           console.log("file can;t redad");
//         } else {
//           res.json({ msg: data });
//         }
//       })
//     ) {
//       console.log(sumData);
//     } else {
//       const data = {
//         firstNum,
//         secondNum,
//         id: Math.random().toString(),
//       };
//       const arr = [...data];
//       fs.writeFile("./sumData.json", arr, (err) => {
//         if (err) {
//           res.json(403).json({ msg: "File can't created" });
//         } else {
//           console.log("File created succesfully.");
//         }
//       });
//     }
//   } else {
//     res.status(400).json({ error: "Invalid input. Numbers are required." });
//   }
// }

// // The final route to return the sum result
// app.post("/", middlewareAddNumber, (req, res) => {
//   res.json({ sum: req.sum });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// function middlewareAddNumber(req, res, next) {
//   const { firstNum, secondNum } = req.body;

//   // Validate if both numbers are provided and are numbers
//   if (typeof firstNum === "number" && typeof secondNum === "number") {
//     fs.readFile(filePath, "utf-8", (err, data) => {
//       let fileContent;

//       if (err) {
//         // If the file does not exist, create it with the first entry
//         if (err.code === "ENOENT") {
//           fileContent = [];
//         } else {
//           return res.status(500).json({ msg: "Error reading file." });
//         }
//       } else {
//         // If file exists, parse the current content
//         try {
//           fileContent = JSON.parse(data);
//         } catch (parseErr) {
//           return res.status(500).json({ msg: "Error parsing file data." });
//         }
//       }

//       // Add the new data to the array
//       const newData = {
//         firstNum,
//         secondNum,
//         sum: firstNum + secondNum,
//         id: Math.random().toString(),
//       };

//       fileContent.push(newData);

//       // Write the updated data back to the file
//       fs.writeFile(
//         filePath,
//         JSON.stringify(fileContent, null, 2),
//         (writeErr) => {
//           if (writeErr) {
//             return res.status(500).json({ msg: "Error writing to file." });
//           }
//           // Pass the result to the next middleware
//           req.sum = firstNum + secondNum;
//           next();
//         }
//       );
//     });
//   } else {
//     res.status(400).json({ error: "Invalid input. Numbers are required." });
//   }
// }

// // The final route to return the sum result
// app.post("/", middlewareAddNumber, (req, res) => {
//   res.json({ sum: req.sum });
// });

//Mein ny likhi backend

// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const jwtPassword = "zohaib123";
// const fs = require("fs");
// const app = express();
// const port = 3000;
// const filePath = "./sumData.json";
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://admin:zohaib259@cluster0.qshup.mongodb.net/user_app"
// );
// // Middleware to parse JSON and handle CORS
// app.use(express.json());
// app.use(cors());

// const Users = mongoose.model("Users", {
//   name: String,
//   username: String,
//   password: String,
// });
// //Post route to handle the signup
// app.get("/signup", async function (req, res) {
//   const { name, username, password } = req.query;
//   const exitingUser = await Users.findOne({ email: username });
//   if (exitingUser) {
//     return res.json({ msg: "User alread exit" });
//   }
//   const user = new Users({
//     name: name,
//     username: username,
//     password: password,
//   });
//   user.save();
//   res.json({ msg: "User saved in db succesfully" });
// });
// // POST route to handle the addition

// app.get("/login", async (req, res) => {
//   const { username, password } = req.query;
//   const exitingUser = await Users.findOne({ email: username });

//   if (!exitingUser) {
//     return res.json({
//       msg: "User doesn't exit in db memory",
//     });
//   }
//   let token = jwt.sign({ username }, "zohaib123");
//   return res.json({
//     token,
//   });
// });

// const Interest = mongoose.model("Interest", {
//   id: String,
//   total: String,
//   principle: String,
//   interestRate: String,
// });
// app.post("/", (req, res) => {
//   // const { principle, rate, duration } = req.query;
//   const { principle, rate, duration } = req.body;
//   const { auth } = req.headers;

//   try {
//     console.log(auth);
//     console.log(jwt.verify(auth, jwtPassword));
//     const interestRate =
//       (parseFloat(principle) * parseFloat(rate) * parseFloat(duration)) / 100;
//     const total = parseFloat(principle) + parseFloat(interestRate);
//     const interestRateData = new Interest({
//       id: Math.random().toString(),
//       total: total.toString(),
//       principle: principle.toString(),
//       interestRate: interestRate.toString(),
//     });

//     interestRateData.save();
//     res.status(200).json({
//       msg: "Interest Rate Data saved in db succesfully.",
//       interestRate,
//     });
//   } catch (err) {
//     res.json({ msg: "Invalid Token" });
//     console.log("Invalid token");
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
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
app.use(cors());
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

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   const existingUser = await Users.findOne({ username });

//   console.log("exiting User", existingUser);
//   if (!existingUser) {
//     return res.status(401).json({ msg: "Invalid credentials" });
//   }
//   // if (existingUser && existingUser.password === password) {
//   const token = jwt.sign({ username }, jwtPassword);
//   return res.json({ token });
//   // }
// });

// Use bcrypt for password hashing

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

// app.post("/login", async (req, res) => {
//   console.log("jeesd");
//   const { username, password } = req.body;

//   try {
//     const existingUser = await Users.findOne({ username });

//     if (!existingUser) {
//       return res.status(401).json({ msg: "Invalid credentials" });
//     }

//     // Compare the provided password with the hashed password in the database
//     // const isMatch = await bcrypt.compare(password, existingUser.password);

//     // if (!isMatch) {
//     //   return res.status(401).json({ msg: "Invalid credentials" });
//     // }

//     // Generate the JWT token upon successful login
//     const token = jwt.sign(
//       { username: existingUser.username },
//       jwtPassword
//       // process.env.JWT_SECRET,
//       // {
//       //   expiresIn: "1h", // Token expiration
//       // }
//     );

//     return res.json({ token });
//   } catch (error) {
//     console.error("Login error: ", error);
//     return res
//       .status(500)
//       .json({ msg: "Server error. Please try again later." });
//   }
// });

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
app.post("/calculateInterestRate", authenticateJWT, async (req, res) => {
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
});

app.get("/authinterestRate", async (req, res) => {
  const exitingUser = await Interest.find();
  console.log(exitingUser);
  res.json({ data: exitingUser });
});

// Start the server
app.listen(5500, () => {
  console.log(`Server running at http://localhost:${5500}`);
});
