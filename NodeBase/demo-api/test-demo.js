import express from "express";

const app = express();

//API : GET + "http://localhost:3000/test"
//"TEST SUCCESS"
app.get("/test", (req, res) => {
  res.send("TEST SUCCESS");
});

//API : GET + "http://localhost:3000/test/1"
//"ONE!!"
app.get("/test/1", (req, res) => {
  res.send("ONE!!");
});

app.listen(3000);
