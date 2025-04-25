// express 모듈 세팅
const express = require("express");
const router = express.Router();
router.use(express.json()); //http 외 모듈 'json' 사용

let db = new Map();
var id = 1;

router
  .route("/")
  .post((req, res) => {
    // 개별 채널 생성
    if (req.body.channelTitle) {
      let channel = req.body;
      db.set(id++, channel);

      res.status(201).json({
        message: `${db.get(id - 1).channelTitle} 님, 유튜브 시작을 응원합니다!`,
      });
    } else {
      res.status(400).json({
        message: `제대로 된 요청 값을 보내주십시오.`,
      });
    }
  })
  .get((req, res) => {
    // 채널 전체 조회
    var { userId } = req.body;
    var channels = [];
    if (db.size && userId) {
      db.forEach((value, key) => {
        if (value.userId === userId) {
          channels.push(value);
        }
      });

      if (channels.length) {
        res.status(200).json(channels);
      } else {
        // 해당 userId가 생성한 채널이 없는 경우 예외 처리
        notFoundChannel();
      }
    } else {
      notFoundChannel();
    }
  });

router
  .route("/:id")
  .put((req, res) => {
    // 개별 채널 수정
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);
    let oldTitle = channel.channelTitle;
    if (channel) {
      var newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      res.status(200).json({
        message: `채널명이 ${oldTitle}에서 ${newTitle}(으)로 성공적으로 수정되었습니다.`,
      });
    } else {
      notFoundChannel();
    }
  })
  .delete((req, res) => {
    // 개별 채널 삭제
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);
    if (channel) {
      db.delete(id);
      res.status(200).json({
        message: `${channel.channelTitle} 님의 채널이 삭제되었습니다.`,
      });
    } else {
      notFoundChannel();
    }
  })
  .get((req, res) => {
    // 개별 채널 조회
    let { id } = req.params;
    id = parseInt(id);

    var channel = db.get(id);
    if (channel) {
      res.status(200).json(channel);
    } else {
      notFoundChannel();
    }
  });

function notFoundChannel() {
  res.status(404).json({
    message: "요청하신 채널 정보를 찾을 수 없습니다.",
  });
}

module.exports = router;
