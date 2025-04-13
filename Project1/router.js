function route(pathname, handle, response, query) {
  console.log("pathname : " + pathname);

  if (typeof handle[pathname] === "function") {
    handle[pathname](response, query);
  } else {
    //예외 처리
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Not Found");
    response.end();
  }
}

exports.route = route;
