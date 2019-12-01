const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  authorname: {
    type: String,
    required: true,
    min: 2,
    trim: true
  },
  booktitle: {
    type: String,
    required: true,
    trim: true
  },
  publicationyear: {
    type: Number,
    required: true,
    trim: true
  },
  pagesize: {
    type: Number,
    min: 2
  },
  printedin: {
    type: String,
    required: true,
    min: 2
  },
  originallanguage: {
    type: String,
    required: true,
    trim: true
  },
  bookcode: {
    type: String,
    required: true
  },
  booklend: {
    type: String,
    required: true
  },
  lenddate: {
    type: Number,
    required: true
  }
});

const userModel = mongoose.model("books", userSchema);
module.exports = userModel;
