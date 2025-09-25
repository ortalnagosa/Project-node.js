const { register,
    find,
    login,
    changelsBizStatus,
    findOne,
    update,
    remove, } = require("../models/usersDataAccessService");
const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const normalizeUser = require("../helpers/normalizeUser");
const { generateUserPassword } = require("../helpers/bcrypt");

 
const registerUser = async (rawUser) => {
  try {
    const { error } = validateRegistration(rawUser);
     if (error) {
       return Promise.reject(error);
     }
    let user = normalizeUser(rawUser);
    user.password = generateUserPassword(user.password);
     user = await register(user);
     return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginUser = async (rawUser) => {
  try {
    const { error } = validateLogin(rawUser);
    if (error) {
      return Promise.reject(error);
    }
   let user = { ...rawUser };
   user = await login(user);

   return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};  

const getUsers = async () => {
  try {
    const users = await find();
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserID = async (userId) => {
  try {
    const user = await findOne(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUser = async (userId,rawUser) => {
  try {
      let user = { ...rawUser };
      user= await update(userId,user)
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const changeUserBusinessStatus = async (userId) => {
  try {
    const user = await changelsBizStatus(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await remove(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserID,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
};
