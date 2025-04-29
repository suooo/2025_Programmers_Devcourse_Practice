// express 모듈 세팅
const express = require("express");
const conn = require("../mariadb");
const router = express.Router();
router.use(express.json()); //http 외 모듈 'json' 사용

let db = new Map();
var id = 1;

conn.query("SELECT * FROM `users`", (err, results, fields) => {
  var { id, email, name, created_at } = results[0];
  console.log(created_at);
});

// 로그인
router.post("/login", (req, res) => {
  // userId와 pw가 db에 저장된 회원인지 확인
  const { userId, password } = req.body;
  var loginUser = {};

  db.forEach((user) => {
    if (user.userId === userId) loginUser = user;
  });

  if (isExist(loginUser)) {
    //pw도 일치하는지 확인
    if (loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`,
      });
    } else {
      res.status(400).json({
        message: `비밀번호가 일치하지 않습니다.`,
      });
    }
  } else {
    res.status(404).json({
      message: `회원 정보가 없습니다.`,
    });
  }
});

function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

// 회원가입
router.post("/join", (req, res) => {
  if (req.body) {
    const { userId } = req.body;
    db.set(userId, req.body);
    res.status(201).json({
      message: `${db.get(userId).name} 님, 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요.`,
    });
  }
});

//개인 회원 정보 조회 및 탈퇴
router
  .route("/users")
  .get((req, res) => {
    let { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    } else {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    }
  })
  .delete((req, res) => {
    let { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      db.delete(id);
      res.status(200).json({
        message: `${user.name} 님, 다음에 또 뵙겠습니다.`,
      });
    } else {
      res.status(404).json({
        message: "해당 회원 정보를 찾을 수 없습니다.",
      });
    }
  });

// 모듈화
module.exports = router;
