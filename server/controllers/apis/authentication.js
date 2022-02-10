const express = require("express");
let router = express.Router();

const authenticationService = require("../../services/authentication/authentication");

router.post("/sign-up", authenticationService.signUp);

router.post("/sign-in", authenticationService.signIn);

module.exports = router;
