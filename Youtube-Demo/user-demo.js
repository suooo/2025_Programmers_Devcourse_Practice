// express 모듈 세팅
import express, { response } from "express";
const app = express();
app.listen(7000);
app.use(express.json()); //http 외 모듈 'json' 사용

let db = new Map();
var id = 1;
var loginUser = {};

// 로그인
app.post("/login", (req, res) => {
  // userId와 pw가 db에 저장된 회원인지 확인
  const { userId, password } = req.body;

  findLoginUser(userId);

  if (isExist(loginUser)) {
    console.log("아이디 일치");
    if (loginUser.password === password) {
      console.log("비밀번호 일치");
    } else {
      console.log("비밀번호 불일치");
    }
  } else {
    console.log("아이디 불일치");
  }
});

function findLoginUser(userId) {
  db.forEach((user) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });
  return loginUser;
}

function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

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
  .route("/users/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    } else {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    } else {
      db.delete(id);
      res.status(200).json({
        message: `${user.name} 님, 다음에 또 뵙겠습니다.`,
      });
    }
  });
