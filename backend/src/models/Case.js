import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  postId: { type: String, unique: true },
  userId: String,
  userName: String,
  subject: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  area: {
    type : String,
    enum : ['Taipei','New Taipei','Tainan','Taichung','Others'],
  },
  description: String,
  lowPrice: Number,
  highPrice: Number,
  timestamp: Date
});
const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;