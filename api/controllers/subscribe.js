import Subscribe from "../models/Subscribe.js";


export const subscribe = async (req, res, next) => {
  const newEmail = new Subscribe(req.body);
  try {
    await newEmail.save();
    res.status(200).send("Subscribe has been created.");
  } catch (err) {
    next(err);
  }
};

export const getSubscribe = async (req, res, next) => {
  try {
    const subscribe = await Subscribe.find();
    res.status(200).json(subscribe);
  } catch (err) {
    next(err);
  }
   
};