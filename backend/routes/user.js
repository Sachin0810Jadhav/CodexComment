const express = require("express");

const router = express.Router();

const { User, History } = require("../db/index");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SECRET = "This is Secret";

const userValidation = require("../middlewares/userValidation");

router.post("/signup", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json({
      msg: "username already exists",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(password, salt);
    const newUser = User.create({
      username,
      password: hassPass,
      firstname,
      lastname,
    });
    const token = jwt.sign({ userId: newUser._id }, SECRET);
    res.json({
      msg: "user created successfully",
      token,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { usrname, password } = req.body;

  const user = await User.findOne({ usrname });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, SECRET);
      res.json({
        msg: "signin scuccessful",
        token,
      });
    } else {
      res.json({
        msg: "invalid credentials",
      });
    }
  } else {
    res.json({
      msg: "invalid credentials",
    });
  }
});

router.post("/generateComment", userValidation, async (req, res) => {
  const { code } = req.body;

  try {
    // Import the Google Generative AI library dynamically
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    // Initialize the generative AI model with your API key
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define the prompt to generate a comment for the provided code
    const prompt = `answer in single word yes or no weather following code is java/python:\n${code}`;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    if (result.response.text() != "No\n") {
      const prompt = `generate comments for following code:\n${code}`;

      // Await the AI model's response
      const result = await model.generateContent(prompt);

      const history = await History.create({
        userId: req.userId,
        codeComment: result.response.text(),
      });

      res.json({
        msg: "Comment generated successfully",
        comment: result.response.text(),
      });
    }
    else{
        res.json({
            msg: "Error generating comment",
            comment: "Unknown programming language",
          });
    }
  } catch (error) {
    console.log("Error generating comment:", error.message || error);
    res.json({
      msg: "Error generating comment",
      error: error.message,
    });
  }
});

router.get("/history", userValidation, async (req, res) => {
  const history = await History.find({ userId: req.userId });

  res.json({
    history,
  });
});

module.exports = router;
