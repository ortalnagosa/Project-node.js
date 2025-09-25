const {
  registerUser,
  loginUser,
  getUsers,
  getUserID,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
} = require("../services/userService");
const express = require("express");
const router = express.Router();
const {handleError} = require("../../utils/errorHandler");
const { auth } = require("../../auth/authService");


router.post("/", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
    return handleError(res, 403, "Authorization Error: Must be admin!");
    }
    const user = await getUsers();
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
    return handleError(
      res,
      403,
      "Authorization Error: Must be admin or THE registered user!"
    );
    }
    const user = await getUserID(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params.id;
     const { _id } = req.user;

    if (_id !== id) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the registered user can update their profile!"
      );
    }
    const user = await updateUser(id, req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
     return handleError(
       res,
       403,
       "Authorization Error: Must be admin or THE registered user!"
     );
    }
    const user = await changeUserBusinessStatus(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
      const { id } = req.params.id;
      const { _id, isAdmin } = req.user;
      if (_id !== id && !isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Must be admin or THE registered user!"
      );
      }
    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});



module.exports = router;
