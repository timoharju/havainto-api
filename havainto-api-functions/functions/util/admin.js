const admin = require('firebase-admin');

var serviceAccount = require("../havainto-api-firebase-adminsdk-gum5z-6d9048d79e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://havainto-api.firebaseio.com"
  });

const db = admin.firestore();

module.exports = { admin, db };