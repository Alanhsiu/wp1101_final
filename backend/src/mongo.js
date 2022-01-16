import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

function connection() {
  dotenv.config();
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL");
    process.exit(1);
  }
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

  const db = mongoose.connection;
  db.on("error", (err) => console.log(err));
  db.once("open", async () => {
    console.log("Open Mongo database");
    //await dataInit();
  });
}

export default connection;

//mongodb+srv://wp1101:wp1101@cluster1.yicol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
