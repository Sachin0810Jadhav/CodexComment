const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const User = mongoose.model("users", userSchema);

const historySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  codeComment :String
});

const History = mongoose.model("history", historySchema);

module.exports = { User, History };
