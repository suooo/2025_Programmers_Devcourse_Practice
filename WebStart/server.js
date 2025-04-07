let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;

    //브라우저가 자동으로 요청하는 파비콘 처리
    if (pathname === "/favicon.ico") {
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      return response.end();
    }
    //요청 경로, 핸들러, 응답 객체를 router로 전달
    route(pathname, handle, response);
  }

  http.createServer(onRequest).listen(8888); //http://localhost:8888 에서 대기
}

exports.start = start;
