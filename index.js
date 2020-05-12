require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const facts = require("./routes/api/facts");
const updates = require("./routes/api/updates");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// DB config
db = process.env.DATABASE;

// Connect to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
  })
  .then(() =>
    console.log("||************************* MongoDB Connected *************************||")
  )
  .catch(err => console.log(err));

// Use Routes
app.use("/api/facts", facts);
app.use("/api/facts", updates);

app.listen(port, () => {
  console.log(`||==================== Server running on port ${port} ====================||`);
});
