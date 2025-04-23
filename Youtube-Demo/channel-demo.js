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
    //개별 채널 생성
  })
  .get(() => {
    //채널 전체 조회
  });

app
  .route("/channels/:id")
  .put() // 개별 채널 수정
  .delete() // 채널 개별 삭제
  .get(); // 개별 채널 조회
