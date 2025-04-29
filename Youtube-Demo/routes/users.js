// express 모듈 세팅
const express = require("express");
const conn = require("../mariadb");
const router = express.Router();
router.use(express.json()); //http 외 모듈 'json' 사용

// 로그인
router.post("/login", (req, res) => {
  // email과 pw가 mariadb에 저장된 회원인지 확인
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    var loginUser = results[0];
    if (loginUser && loginUser.password == password) {
      // login user가 있으면 && password도 같으면
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`,
      });
    } else {
      // login user가 없으면
      res.status(404).json({
        message: "이메일 또는 비밀번호가 틀립니다.",
      });
    }
  });
});

// 회원가입
router.post("/join", (req, res) => {
  if (req.body) {
    const { email, name, password, contact } = req.body;

    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact];

    conn.query(sql, values, (err, results, fields) => {
      res.status(201).json(results);
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
    let { email } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;

    conn.query(sql, email, (err, results, fields) => {
      if (results.length) res.status(200).json(results);
      else {
        res.status(404).json({
          message: "회원정보가 없습니다.",
        });
      }
    });
  })
  .delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE FROM users WHERE email = ?`;

    conn.query(sql, email, (err, results, fields) => {
      if (results.affectedRows > 0) res.status(200).json(results);
      else {
        res.status(404).json({
          message: "회원정보가 없습니다.",
        });
      }
    });
  });

// 모듈화
module.exports = router;
