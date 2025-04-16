import express from "express";

const app = express();
app.listen(3000);

//GET + "/"
app.get("/", (req, res) => {
  res.send("Hello World");
});

let nodejsBook = {
  title: "Node.js를 공부해보자",
  price: 20000,
  description: "이 책 짱 좋음",
};

app.get("/products/1", (req, res) => {
  res.json(nodejsBook);
});
