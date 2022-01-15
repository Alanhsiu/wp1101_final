import {
  makeName,
  checkChatBox,
} from "./utility";

const Query = {
  async ChatBox(parent, { name1, name2 }, { db }, info) {
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "queryChatBox");
    if(!chatBox) {
      throw new Error(`ChatBox ${chatBoxName} is not exist.`);
    }
    return chatBox;
  },
};

export { Query as default };