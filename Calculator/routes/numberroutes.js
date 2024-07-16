const express = require("express");
const router = express.Router();
const numberController = require("../Controller/numbercontroller");

router.get("/:numberid", numberController.getNumbers);

module.exports = router;
