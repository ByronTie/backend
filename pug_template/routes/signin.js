const express = require("express");
const router = express.Router();
const { signin } = require("../handlers/signin");

router.get("/", signin);

module.exports = router;