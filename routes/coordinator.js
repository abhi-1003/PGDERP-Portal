const express = require("express");

const { auth } = require("../middleware/auth");

const {
  registerCoordinator,
  loginCoordinator,
} = require("../controllers/auth");

const router = express.Router();

router.post("/coordinatorRegister", [auth, registerCoordinator]);
router.post("/coordinatorLogin", loginCoordinator);

module.exports = router;
