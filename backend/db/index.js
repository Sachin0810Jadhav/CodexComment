const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jadhavsachin0810:Sachin%4012@clusterfor100xdev.ha6nh.mongodb.net/CodexComment"
);

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
  code: String,
  comment: String,
});

const History = mongoose.model("history",historySchema);

module.exports = {User,History};
