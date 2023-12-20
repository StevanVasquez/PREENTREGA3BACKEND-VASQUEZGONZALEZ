import userModel from "../../models/user.model.js";

export default class Users {
  get = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (err) {
      console.log(err);
    }
  }
  getUserByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email: email});
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  create = async (userInfo) => {
    try {
      const user = await userModel.create(userInfo);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}