const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  app.post("/students", (req, res) => {
    const student = {
      name: req.body.name,
      surname: req.body.surname,
      rating: req.body.rating
    };
    db.collection("students").insert(student, (err, result) => {
      if (err) res.send(err);
      else res.send(result.ops[0]);
    });
  });

  app.get("/students", (req, res) => {
    db.collection("students")
      .find({})
      .toArray((err, result) => {
        if (err) res.send(err);
        res.send(result);
      });
  });

  app.get("/students/:query", (req, res) => {
    const query = req.params.query;
    db.collection("students")
      .find({
        $or: [
          { name: new RegExp(query, "i") },
          { surname: new RegExp(query, "i") }
        ]
      })
      .toArray((err, result) => {
        if (err) res.send(err);
        res.send(result);
      });
  });
  // app.get('/students/:id', (req, res) => {
  //   const id = req.params.id;
  //   const query = { '_id': new ObjectID(id) };
  //   db.collection('students').findOne(query, (err, result) => {
  //     if (err) res.send(err);
  //     else res.send(result);
  //   })
  // });

  app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    db.collection("students").remove(query, (err, result) => {
      if (err) res.send(err);
      else res.send(`Student deleted`);
    });
  });

  app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    const updStudent = {
      name: req.body.name,
      surname: req.body.surname,
      rating: req.body.rating
    };
    db.collection("students").update(query, updStudent, (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    });
  });
};
