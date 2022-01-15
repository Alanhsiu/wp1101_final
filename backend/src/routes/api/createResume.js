import ResumeModel from "../../models/Resume";

const createResume = async (id, name, subject, content, price) => {
  try {
    timestamp = Date;
    const existing = await ResumeModel.findOne({ name, subject });
    await ResumeModel.findOneAndUpdate(
      { id, name, subject },
      { content, price, timestamp },
      {
        new: true,
        upsert: true,
      }
    );
    console.log("Created Resume");
    return {
      message: `${
        existing ? "Updating" : "Adding"
      } (${name}, ${subject}, ${price})`,
      card: true,
    };
  } catch (e) {
    return { message: e, card: false };
  }
  // try {
  //   const newPost = new Post({ postId, title, content, timestamp });
  //   console.log("Created ScoreCard", newPost);
  //   return newPost.save();
  // } catch (e) {
  //   throw new Error("ScoreCard creation error: " + e);
  // }
};

export default createResume;
