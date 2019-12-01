const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

//linking my database
mongoose.connect("mongodb://localhost:27017/mongodbBook", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const BOOKUSERS = require("./schema");
mongoose.connection.once("open", function() {
  console.log("bookshelf is connected on port :" + port);
});
app.use(express.json());
//for cookies
app.use("/", (req, res, next) => {
  res.cookie("cookiename", "cookievalue");
  next();
});
//localhost page message
app.get("/", (req, res) => {
  res.send(`
    <html>
    <body style="background:rgba(124,67,189,.5)">
       <h3 style="text-align:center">Hello & welcome to my books database!</h3>
    </body>
    </html>
  `);
});
//typing user we ll get a form to fill out
app.get("/user", (req, res) => {
  let HTML = fs.readFileSync(`${__dirname}/userInfo.html`);
  res.send(`${HTML}`);
});
//connecting info to the database
app.post("/insertInfo", urlencodeParser, (req, res) => {
  const myBooks = new BOOKUSERS({
    authorname: req.body.authorname,
    booktitle: req.body.booktitle,
    publicationyear: req.body.publicationyear,
    pagesize: req.body.pagesize,
    printedin: req.body.printedin,
    originallanguage: req.body.originallanguage,
    bookcode: req.body.bookcode,
    booklend: req.body.booklend,
    lenddate: req.body.lenddate
  });
  myBooks.save();
  res.sendStatus(200);
});
//using the form querystring.html
app.post("/searchInfo", urlencodeParser, async (req, res) => {
  console.log(req.body);
  const bookcode = req.body.bookcode;
  const bookFound = await BOOKUSERS.findOne({ bookcode: bookcode });
  console.log(bookFound);
  if (bookFound) {
    res.send(bookFound);
  } else {
    res.send({ error: "it seems that the bookCode is incorrect!" });
  }
});
//to allow routing
app.post("/enteruser_post", jsonParser, (req, res) => {
  Console.log(req.body);
  res.sendStatus(200);
});
//to get back what we ve inserted
/* app.get("/api/:user/:id", (req, res) => {
  let theUser = req.params.user;
  let id = req.params.id;
  res.send(`
  <html>
  <body>
    The userName is: ${theUser} & the user id is: ${id}
  </body>
  </html>
  `);
}); */

const port = process.env.PORT || 3000;
app.listen(port);
