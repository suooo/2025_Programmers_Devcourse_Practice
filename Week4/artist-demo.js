/*
express module setting
*/
import express from "express";

const app = express();
app.listen(3000);

/*
db setting
*/
let artist1 = {
  artistName: "삼촌",
  bookmarks: "350만 개",
  webtoonNum: "4개",
};

let artist2 = {
  artistName: "스튜디오 리코",
  bookmarks: "280만 개",
  webtoonNum: "36개",
};

let artist3 = {
  artistName: "2사장",
  bookmarks: "260만 개",
  webtoonNum: "1개",
};

let db = new Map();
var id = 1;
db.set(id++, artist1);
db.set(id++, artist2);
db.set(id++, artist3);

/*
REST API 설계
*/
// 전체 작가 조회
app.get("/artists", (req, res) => {
  var artists = {};
  db.forEach(function (value, key) {
    artists[key] = value;
  });
  res.json(artists);
});

// 개별 작가 조회
app.get("/artists/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const artist = db.get(id);
  if (artist == undefined) {
    res.json({
      message: "해당 작가 정보를 찾을 수 없습니다.",
    });
  } else {
    res.json(artist);
  }
});

// 새로운 작가 등록
app.use(express.json());
app.post("/artists", (req, res) => {
  console.log(req.body);

  db.set(id++, req.body); // map에 PUT하기(저장하기)
  res.json({
    message: `${req.body.artistName} 작가님, 웹툰 연재를 응원합니다!`,
  });
});

// 개별 작가 삭제
app.delete("/artists/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  let artist = db.get(id);
  if (artist == undefined) {
    res.json({
      message: `요청하신 ${id}번은 없는 작가 ID입니다.`,
    });
  } else {
    const name = artist.artistName;
    db.delete(id);
    res.json({
      message: `${name} 작가님, 다음에 또 뵙겠습니다.`,
    });
  }
});

// 전체 작가 삭제
app.delete("/artists", (req, res) => {
  var msg = "";
  if (db.size >= 1) {
    db.clear();
    msg = "전체 작가 정보가 삭제되었습니다.";
  } else {
    msg = "삭제할 작가 정보가 없습니다.";
  }
  res.json({
    message: msg,
  });
});

// 작가 이름 변경
app.put("/artists/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  var artist = db.get(id);
  if (artist == undefined) {
    res.json({
      message: `요청하신 ${id}번은 없는 작가 ID입니다.`,
    });
  } else {
    var oldName = artist.artistName;
    var newName = req.body.artistName;
    artist.artistName = newName;
    db.set(id, artist);
    res.json({
      message: `${oldName} 작가님의 이름이 ${newName}로 변경되었습니다.`,
    });
  }
});
