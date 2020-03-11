const functions = require("firebase-functions");
const app = require("express")();

const cors = require("cors");
app.use(cors());

const { db } = require("./util/admin");

const {
  getAllHavainnot,
  postOneHavainto,
  getOneHavainto,
  deleteHavainto
} = require("./handlers/havainnot");
const {
  signup,
  login,
  addUserDetails,
  getUserDetails
} = require("./handlers/users");

// Havainto routes
app.get("/havainnot", getAllHavainnot);
app.post("/havainnot", postOneHavainto);


// users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user", addUserDetails);
app.get("/user/:handle", getUserDetails);

exports.api = functions.region("europe-west1").https.onRequest(app);

