let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    let queryData = url.parse(request.url, true).query;

    //브라우저가 자동으로 요청하는 파비콘 처리
    if (pathname === "/favicon.ico") {
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      return response.end();
    }
    route(pathname, handle, response, queryData.productId);
  }

  http.createServer(onRequest).listen(8888); //http://localhost:8888 에서 대기
}

exports.start = start;
