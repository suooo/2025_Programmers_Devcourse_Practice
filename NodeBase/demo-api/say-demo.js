import express from "express";

const app = express();

//GET /hello, /bye, /nicetomeetyou
app.get("/hello", (req, res) => {
  res.json({
    say: "안녕하세요",
  });
});
app.get("/bye", (req, res) => {
  res.json({
    say: "안녕히 가세요",
  });
});
app.get("/nicetomeetyou", (req, res) => {
  res.json({
    say: "만나서 반갑습니다",
  });
});

app.listen(3000);
