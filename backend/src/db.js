import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    immutable: false,
  },
  userName: {
    type: String,
    required: true,
    immutable: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const MessageSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
});

const TokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
});

const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);
const TokenModel = mongoose.model("Token", TokenSchema);

export { UserModel, ChatBoxModel, MessageModel, TokenModel };
