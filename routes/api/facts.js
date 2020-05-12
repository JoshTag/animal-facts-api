const { Router } = require("express");
const router = Router();

// Fact Model
const Fact = require("./../../models/Facts");

router.get("/", (req, res) => {
  Fact.find()
    .then(facts => res.status(200).json({ success: true, data: facts }))
    .catch(err => ({ success: false, error: err}));
});

module.exports = router;
