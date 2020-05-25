const { Router } = require("express");
const router = Router();

// Fact Model
const Fact = require("../../models/Animals");

// Get random item from array
const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

// GET all animals with facts
router.get("/", (req, res) => {
  Fact.find()
    .then(facts => res.status(200).send({ success: true, data: facts }))
    .catch(err => ({ success: false, error: err }));
});

// GET one random animal fact
router.get("/random", (req, res) => {
  Fact.countDocuments((err, count) => {
    let random = Math.floor(Math.random() * count);
    Fact.findOne()
      .skip(random)
      .then(fact => {
        res.status(200).send({
          success: true,
          data: { name: fact.name, facts: getRandom(fact.facts) }
        });
      })
      .catch(err => ({ success: false, error: err }));
  });
});

// GET a single animal's facts
router.get("/:animal", (req, res) => {
  let random = req.query.random || "false";
  let checkQuery = random === "false" || random === "true";

  if (!checkQuery) {
    res.status(400).send({
      success: false,
      message: "The random query must be 'true' or 'false'"
    });
    return;
  }

  if (random === "true") {
    Fact.findOne({ name: req.params.animal }).then(animal => {
      res.status(200).send({
        success: true,
        data: { name: animal.name, facts: getRandom(animal.facts) }
      });
    });
  } else {
    Fact.findOne({ name: req.params.animal }).then(animal => {
      res.status(200).send({
        success: true,
        data: { name: animal.name, facts: animal.facts }
      });
    });
  }
});

module.exports = router;
