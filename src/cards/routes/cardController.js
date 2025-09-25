const express = require("express");
const{ handleError}  = require("../../utils/errorHandler");
const {
  getCards,
  getCard,
  createCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("../services/cardService");
const { auth } = require("../../auth/authService");
 const {updateBizNumber}= require("../models/cardsDataAccessService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards",auth, async (req, res) => {
  try {
    const { _id } = req.user;
   const myCard = await getMyCards(_id);
    return res.send(myCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { _id, isBusiness } = req.user;
    if (!isBusiness) {
    return handleError(
      res,
      403,
      "Authorization Error: Only business users can create cards!"
    );
    }
    const cardData = {
      ...req.body,
      userId: _id, 
    };
    const card = await createCard(cardData);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
      const card = await getCard(id);
    if (!card) {
      return handleError(res, 404, "Card not found");
    }
    if (card.userId.toString() !== _id) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the card creator can updateCard!"
      );
    }
    const updatedCard = await updateCard(id, req.body);
    return res.send(updatedCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
     const { _id } = req.user;
    const card = await likeCard(id, _id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id/bizNumber", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { bizNumber } = req.body;

    const updated = await updateBizNumber(id, bizNumber, req.user);

    return res.send(updated);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  } 
});


router.delete("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;
    const card = await getCard(id);
    if (!card) {
      return handleError(res, 404, "Card not found");
    }
    if (card.userId.toString() !== _id && !isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Must be admin or the card creator!"
      );
    }
    const deletedCard = await deleteCard(id);
    return res.send(deletedCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
    