// express 모듈 세팅
import express, { response } from "express";
const app = express();
app.listen(7000);
app.use(express.json()); //http 외 모듈 'json' 사용

let db = new Map();
var id = 1;

// 로그인
app.post("/login", (req, res) => {
  let { artistId, password } = req.body;
  let artist;
  db.forEach((one) => {
    if (one.artistId == artistId && one.password == password) {
      artist = one;
    }
  });
  if (artist) {
    res.status(200).json({
      message: `${name}님, 다시 만나서 반갑습니다!`,
    });
  } else {
    res.status(401).json({
      message: "아이디 또는 비밀번호가 올바르지 않습니다.",
    });
  }
});

// 회원가입
app.post("/join", (req, res) => {
  if (req.body) {
    db.set(id++, req.body);
    res.status(201).json({
      message: `${db.get(id - 1).name} 님, 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요.`,
    });
  }
});

//개인 회원 정보 조회 및 탈퇴
app
  .route("/artists/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const artist = db.get(id);
    if (artist) {
      res.status(200).json({
        artistId: artist.artistId,
        name: artist.name,
      });
    } else {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const artist = db.get(id);
    if (artist) {
      db.delete(id);
      res.status(200).json({
        message: `${artist.name} 님, 다음에 또 뵙겠습니다.`,
      });
    } else {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    }
  });
