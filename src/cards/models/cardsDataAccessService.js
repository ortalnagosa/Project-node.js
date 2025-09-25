const config = require("config");
const { handleBadRequest } = require("../../utils/errorHandler");
const Card = require("../models/mongodb/Card");

const db = config.get("DB");

const find = async () => {
  if (db === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};

const findMyCards = async (userId) => {
  if (db === "MONGODB") {
    try {
      return Promise.resolve(`my cards: ${userId}`);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in database");
};

const findOne = async (cardId) => {
  if (db === "MONGODB") {
    try {
      const cards = await Card.findById(cardId);
      if (!cards) {
        throw new Error("Could not find this card in the database");
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const create = async (normalizedCard) => {
  if (db === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create card not in mongodb");
};

const update = async (cardId, normalizedCard) => {
  if (db === "MONGODB") {
    try {
      const cards = Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });
      if (!cards) {
        throw new Error(
          "Could not update this card because a card with this ID cannot be found in the database"
        );
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

const like = async (cardId, userId) => {
  if (db === "MONGODB") {
    try {
      const cards = Card.findById(cardId);
      if (!cards) {
        throw new Error(
          "Could not change card likes because a card with this ID cannot be found in the database"
        );
      }
      if (!cards.likes.includes(userId)) {
        cards.likes.push(userId);
      } else {
        cards.likes = cards.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
      }
      await cards.save();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updated!");
};

const remove = async (cardId) => {
  if (db === "MONGODB") {
    try {
      const cards = Card.findByIdAndDelete(cardId);
      if (!cards) {
        throw new Error(
          "Could not delete this card because a card with this ID cannot be found in the database"
        );
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongoDB");
};


const updateBizNumber = async (id, newBizNumber, user) => {
  if (db === "MONGODB") {
    try {
      if (!user.isAdmin) {
        throw new Error(
          "Authorization Error: Only admins can update bizNumber"
        );
      }
      const existing = await Card.findOne({ bizNumber: newBizNumber });
      if (existing) {
        throw new Error("Business number already exists in the system");
      }
      const updatedCard = await Card.findByIdAndUpdate(
        id,
        { bizNumber: newBizNumber },
        { new: true }
      );
      if (!updatedCard) {
        throw new Error("Card not found");
      }
      return Promise.resolve(updatedCard);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("update bizNumber not in mongoDB");
};


module.exports = {
  find,
  findMyCards,
  findOne,
  create,
  update,
  like,
  remove,
  updateBizNumber,
};
