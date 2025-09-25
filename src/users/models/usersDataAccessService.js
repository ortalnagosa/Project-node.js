const User = require("../models/mongodb/User");
const config = require("config");
const {handleBadRequest} = require("../../utils/errorHandler");
const _ = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");

const db = config.get("DB");

const register = async (normalizedUser) => {
  if (db === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({email});
      if (user) {
        throw new Error(
          "user already registered");
      }
      user = new User(normalizedUser);
      user = await user.save();
      user = _.pick(user, ["_id", "name", "email"]);
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("User created not in mongodb");
};
 
const login = async ({ email, password }) => {
  if (db === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("invalid email or password");
      }

        if (user.lockUntil && user.lockUntil > new Date()) {
          throw new Error("Account locked. Try again in 24 hours.");
        }

      const validPassword = comparePassword(password, user.password);

      if (!validPassword) {
         user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      
       if (user.failedLoginAttempts >= 3) {
         user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); 
         user.failedLoginAttempts = 0;
       }

       await user.save();
      throw new Error("Authentication Error: Invalid Password");
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

       const token = generateAuthToken(user);
      return token;
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
   }
  return Promise.resolve("User created not in mongodb");
};

const find = async () => {
  if (db === "MONGODB") { 
    try {
      const users = await User.find().select("-password -__v");
      return Promise.resolve(users);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};

const findOne = async (userID) => {
  if (db === "MONGODB"){
    try {
      const users = await User.findById(userID).select("-password -__v");
      if (!users) {
         throw new Error(
           "Could not find this user in the database");
      }
      return Promise.resolve(users);
    } catch (error) {
       error.status = 404;
       return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const update = async (userId, normalizedUser) => {
  if (db === "MONGODB") {
    try {
      const users = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      }).select("-password -__v");
      if (!users) {
        throw new Error(
          "Could not update this user  because a user with this ID cannot be found in the database");
      }
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
    return Promise.resolve("User updated not in mongodb");
};

const changelsBizStatus = async (userId) => {
  if (db === "MONGODB") {
    try {
      const pipeline = [
        {
          $set: {
            isBusiness: { $not: ["$isBusiness"] },
          },
        },
      ];
      const users = await User.findByIdAndUpdate(userId, pipeline, {
        new: true,
      }).select("-password -__v");
      if (!users) {
        throw new Error(
          "Could not change user isBusiness status because a user with this ID cannot be found in the database"
        );
      }
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updated!");
};

const remove = async (userId) => {
  if (db === "MONGODB") {
    try {
      const users = await User.findByIdAndDelete(userId).select(
        "-password -__v"
      );
      if (!users) {
        throw new Error(
          "Could not delete this user because a user with this ID cannot be found in the database");
      }
    return Promise.resolve(users);
  } catch (error) {
     error.status = 404;
     return handleBadRequest("Mongoose", error);
    }
  }
    return Promise.resolve("user deleted not in Mongodb!");

};

module.exports = {
  register,
  find,
  login,
  changelsBizStatus,
  findOne,
  update,
  remove,
};
