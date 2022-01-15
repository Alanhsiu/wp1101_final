import ResumeModel from "../../models/Resume";
import CaseModel from "../../models/Case";
const deleteDB = async () => {
  try {
    await ResumeModel.deleteMany({});
    await CaseModel.deleteMany({});

    // console.log("Database cleared");
    return "Database cleared";
  } catch (e) {
    throw "Database clear failed";
  }
};

export default deleteDB;
