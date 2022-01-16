import ResumeModel from "./models/Resume";

const example = [
  {
    postId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    name: "Alan",
    subject: "Mandarin",
    content: "Hope you guys have a nice experience while writing hackathon 2 !",
    price: 1000,
    timestamp: new Date("2021-12-02T05:51:04.360Z"),
  },
  {
    postId: "7a01acle-a98f-4dbc-b39e-7e50c4999a05",
    name: "Apple",
    subject: "Biology",
    content: "Show testing 2 content here.",
    price: 999,
    timestamp: new Date("2021-12-01T03:32:10.360Z"),
  },
  {
    postId: "65c4a4d8-c0f9-4f07-86cb-d213d7b66243",
    name: "Orange",
    subject: "Electronics",
    content: "Any suggestions ?",
    price: 400,
    timestamp: new Date("2021-12-01T01:45:01.360Z"),
  },
  {
    postId: "11f10e16-1721-4e0f-8080-827229198f06",
    name: "Ric",
    subject: "Wp1101",
    content: "Taiwan is going to hold referenda on December 18th.",
    price: 800,
    timestamp: new Date("2021-12-02T04:13:24.360Z"),
  },
];

const dataInit = async () => {
  const checkData = await ResumeModel.find();
  if (checkData.length !== 4) {
    await ResumeModel.deleteMany({});
    await ResumeModel.insertMany(example);
  }
  console.log("success")
};

export { dataInit };
