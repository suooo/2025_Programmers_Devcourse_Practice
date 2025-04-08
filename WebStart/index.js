let server = require("./server"); //server 모듈 생성
let router = require("./router"); //router 모듈 생성
let requestHandler = require("./requestHandler");

const mariadb = require("./database/connect/mariadb");
mariadb.connect();

//server 시작
// 어떤 경로로 요청이 왔는지 판단해줄 router.route 함수와
// 경로마다 실행할 handle 함수를 넘겨줌 -> 어떤 페이지를 보여줄지
server.start(router.route, requestHandler.handle);
