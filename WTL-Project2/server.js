//expresss module setting
import express from "express";

const app = express();
app.use(express.static("public"));
app.listen(3000);

//db setting
let youtuber1 = {
  channelTitle: "haha ha",
  subscribers: 125,
  videoNum: 762,
  image: "/image/hamster1.jpg",
};

let youtuber2 = {
  channelTitle: "속삭이는 몽자",
  subscribers: 82,
  videoNum: 687,
  image: "/image/hamster2.jpg",
};

let youtuber3 = {
  channelTitle: "해쭈",
  subscribers: 83,
  videoNum: 470,
  image: "/image/hamster3.jpg",
};

let db = new Map();
var id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

//REST API 설계
app.get("/youtubers", (req, res) => {
  res.json(Object.fromEntries(db));
});

app.get("/youtubers/:id", (req, res) => {
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

app.use(express.json());
app.post("/youtuber", (req, res) => {
  const { channelTitle, image } = req.body;
  const newYoutuber = {
    channelTitle,
    subscribers: 0,
    videoNum: 0,
    image,
  };
  db.set(id++, newYoutuber);
  res.json({
    message: `${channelTitle} 님, 유튜브 시작을 축하드립니다!`,
  });
});

app.post("/subscribe/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);
  youtuber.subscribers++; // 구독자 수 1 증가
  res.json({ subscribers: youtuber.subscribers });
});

app.delete("/youtuber/:id", (req, res) => {
  const deleteId = parseInt(req.params.id);
  if (db.has(deleteId)) {
    db.delete(deleteId);
    res.json({ message: "삭제 완료!" });
  }
});
