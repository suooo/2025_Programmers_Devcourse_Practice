//expresss module setting
import express from "express";

const app = express();
app.listen(3000);

//db setting
let youtuber1 = {
  channelTitle: "십오야",
  subscribers: "593만 명",
  videoNum: "993개",
};

let youtuber2 = {
  channelTitle: "침착맨",
  subscribers: "227만 명",
  videoNum: "6.6천 개",
};

let youtuber3 = {
  channelTitle: "테오",
  subscribers: "54.8만 명",
  videoNum: "726개",
};

let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

//REST API 설계
app.get("/youtuber/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({
      message: "유튜버 정보를 찾을 수 없습니다.",
    });
  } else {
    res.json(youtuber);
  }
});
