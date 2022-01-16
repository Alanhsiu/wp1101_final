import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
  postId: { type: String, unique: true },
  userId:  { type: String, unique: true },
  userName: String,
  subject1: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others',"none"],
  },
  subject2: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others',"none"],
  },
  subject3: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others',"none"],
  },
  description: String,
  lowPrice: Number,
  highPrice: Number,
  education : String,
  mail : String,
  timestamp: Date
}, {
  collection: 'Resume',
});
const ResumeModel = mongoose.model("Resume", ResumeSchema);

export default ResumeModel;