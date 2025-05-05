// express 모듈 세팅
const express = require("express");
const conn = require("../mariadb");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

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

router
  .route("/")
  .post(
    [
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("userId는 숫자를 입력해 주세요."),
      body("name")
        .notEmpty()
        .isString()
        .withMessage("name은 문자를 입력해 주세요."),
      validate,
    ],
    (req, res) => {
      // 개별 채널 생성
      const { name, userId } = req.body;

      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      let values = [name, userId];

      conn.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  )
  .get(
    [
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("userId는 숫자를 입력해 주세요."),
      validate,
    ],
    (req, res, next) => {
      // 채널 전체 조회

      var { userId } = req.body;

      let sql = `SELECT * FROM channels WHERE user_id = ?`;
      conn.query(sql, userId, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.length) res.status(200).json(results);
        else notFoundChannel(res);
      });
    }
  );

router
  .route("/:id")
  .put(
    [
      param("id").notEmpty().withMessage("채널id가 필요합니다."),
      body("name").notEmpty().isString().withMessage("채널명 오류"),
      validate,
    ],
    (req, res) => {
      // 개별 채널 수정
      let { name } = req.body;
      let { id } = req.params;
      id = parseInt(id);

      let sql = `UPDATE channels SET name=? WHERE id=?`;
      let values = [name, id];

      conn.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.affectedRows == 0) return res.status(400).end();
        else res.status(200).json(results);
      });
    }
  )
  .delete(
    [
      param("id").notEmpty().isInt().withMessage("채널id가 필요합니다."),
      validate,
    ],
    (req, res) => {
      // 개별 채널 삭제
      let { id } = req.params;
      id = parseInt(id);

      let sql = `DELETE FROM channels WHERE id = ?`;

      conn.query(sql, id, (err, results) => {
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
  )
  .get(
    [param("id").notEmpty().withMessage("채널id가 필요합니다."), validate],
    (req, res) => {
      // 개별 채널 조회
      let { id } = req.params;
      id = parseInt(id);

      let sql = `SELECT * FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.length) res.status(200).json(results);
        else notFoundChannel(res);
      });
    }
  );

function notFoundChannel(res) {
  res.status(404).json({
    message: "요청하신 채널 정보를 찾을 수 없습니다.",
  });
}

module.exports = router;
