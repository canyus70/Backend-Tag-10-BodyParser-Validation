const express = require("express");
const { readJsonFile, writeJsonFile } = require("./fsUtils");
const cors = require("cors");

const app = express();

app.use(cors());
app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.use(express.json());


app.get("/api/guestbook-entry", (_, res) => {
    readJsonFile("./guestbook-data.json")
      .then((lists) => lists.map((list) => ({ id: list.id, firstName: list.firstName, lastName: list.lastName, email: list.email , message: list.message})))
      .then((amk) =>
        res.json({ success: true, result: amk })
      );
  });


app.post("/api/add-entry", (req, res) => {
    const {id, firstName, lastName, email, message} = req.body; 
    const newEntry = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      message,
    };
    readJsonFile("./guestbook-data.json")
      .then((entries) => [...entries, newEntry])
      .then((newEntriesArray) => writeJsonFile("./guestbook-data.json", newEntriesArray))
      .then(() => {
        // console.log(newTodosArray);
        res.status(201).json({ success: true, entry: newEntry  });
      })
      .catch((err) => {
        console.log(err); // wir geben den error aus damit wir sehen, was passiert ist (nur für uns)
        res
          .status(500)
          .json({ success: false, error: "Failed to update todo" });
      });
  });
  


// endpoint not found handler
app.use((_, res) => {
    res.status(404).json({
      success: false,
      error: "Route not found",
    });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });

