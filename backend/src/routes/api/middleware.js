import mongoose from "mongoose";

const needLogin = async (req, res, next) => {
  if (!req.sessionID) {
    res.status(403).end();
    return;
  }
  next();
};

export { needLogin };
