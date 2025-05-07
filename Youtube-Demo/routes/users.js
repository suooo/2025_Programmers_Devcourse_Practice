// 모듈 세팅
const express = require("express");
const conn = require("../mariadb");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

// jwt 모듈
const jwt = require("jsonwebtoken");
// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();

router.use(express.json()); //http 외 모듈 'json' 사용

//유효성 검사
const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next(); //다음 할 일(미들웨어, 함수) 하러 가라고 명시
  } else {
    return res.status(400).json(err.array());
  }
};

// 로그인
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("이메일을 제대로 입력해주세요."),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("비밀번호를 제대로 입력해주세요."),
    validate,
  ],
  (req, res) => {
    // email과 pw가 mariadb에 저장된 회원인지 확인
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;

    conn.query(sql, email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      var loginUser = results[0];
      if (loginUser && loginUser.password == password) {
        // token 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "5m",
            issuer: "suyeon",
          }
        );

        // cookie에 token을 담아서 보낸다.
        res.cookie("token", token, {
          httpOnly: true,
        });

        console.log(token);

        // login user가 있으면 && password도 같으면
        res.status(200).json({
          message: `${loginUser.name}님 로그인 되었습니다.`,
        });
      } else {
        // login user가 없으면
        res.status(403).json({
          message: "이메일 또는 비밀번호가 틀립니다.",
        });
      }
    });
  }
);

// 회원가입
router.post(
  "/join",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("이메일을 제대로 입력해주세요."),
    body("name")
      .notEmpty()
      .isString()
      .withMessage("이름을 제대로 입력해주세요."),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("비밀번호를 제대로 입력해주세요."),
    body("contact")
      .notEmpty()
      .isString()
      .withMessage("연략처를 제대로 입력해주세요."),
    validate,
  ],
  (req, res) => {
    if (req.body) {
      const { email, name, password, contact } = req.body;

      let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
      let values = [email, name, password, contact];

      conn.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  }
);

//개인 회원 정보 조회 및 탈퇴
router
  .route("/users")
  .get(
    [
      body("email")
        .notEmpty()
        .isEmail()
        .withMessage("이메일을 제대로 입력해주세요."),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `SELECT * FROM users WHERE email = ?`;

      conn.query(sql, email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.length === 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  )
  .delete(
    [
      body("email")
        .notEmpty()
        .isEmail()
        .withMessage("이메일을 제대로 입력해주세요."),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `DELETE FROM users WHERE email = ?`;

      conn.query(sql, email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  );

// 모듈화
module.exports = router;
