// express 모듈 세팅
import express, { response } from "express";
const app = express();
app.listen(7000);
app.use(express.json()); //http 외 모듈 'json' 사용

let db = new Map();
var id = 1;

app
  .route("/channels")
  .post((req, res) => {
    // 개별 채널 생성
    if (req.body.channelTitle) {
      db.set(id++, req.body);
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
    if (db.size) {
      var channels = [];
      db.forEach((value, key) => {
        channels.push(value);
      });
      res.status(200).json(channels);
    } else {
      res.status(404).json({
        message: "조회할 채널이 없습니다.",
      });
    }
  });

app
  .route("/channels/:id")
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
      res.status(404).json({
        message: "요청하신 채널 정보를 찾을 수 없습니다.",
      });
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
      res.status(404).json({
        message: "요청하신 채널 정보를 찾을 수 없습니다.",
      });
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
      res.status(404).json({
        message: "요청하신 채널 정보를 찾을 수 없습니다.",
      });
    }
  });
