const { db } = require("../util/admin");

exports.getAllHavainnot = (req, res) => {
  db.collection("havainnot")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let havainnot = [];
      data.forEach(doc => {
        havainnot.push({
          havaintoId: doc.id,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          lisatiedot: doc.data().lisatiedot,
          missa: doc.data().missa,
          koordinaattiX: doc.data().koordinaattiX,
          koordinaattiY: doc.data().koordinaattiY
        });
      });
      return res.json(havainnot);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOneHavainto = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }
  const newHavainto = {
    havainto: req.body.havainto,
    lisatiedot: req.body.lisatiedot,
    missa: req.body.missa,
    koordinaattiX: req.body.koordinaattiX,
    koordinaattiY: req.body.koordinaattiY,
    createdAt: new Date().toISOString()
  };
  db.collection("havainnot")
    .add(newHavainto)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went worng" });
      console.error(err);
    });
};
// Fetch one Havainto
exports.getOneHavainto = (req, res) => {
  let havaintoData = {};
  db.doc(`/havainnot/${req.params.havaintoId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Havainto not found" });
      }
      havaintoData = doc.data();
      havaintoData.havaintoId = doc.id;
      return db
        .collection("havainnot")
        .orderBy("createdAt", "desc")
        .where("havaintoId", "==", req.params.havaintoId)
        .get();
    })
    .then(data => {
      havaintoData.havainnot = [];
      data.forEach(doc => {
        havaintoData.havainnot.push(doc.data());
      });
      return res.json(havaintoData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a havainto
exports.deleteHavainto = (req, res) => {
  const document = db.doc(`/havainnot/${req.params.havaintoId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "havainto not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Havainto deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
