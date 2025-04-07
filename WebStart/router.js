function route(pathname, handle, response) {
  console.log("pathname : " + pathname);

  if (typeof handle[pathname] === "function") {
    handle[pathname](response);
  } else {
    //예외 처리
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Not Found");
    response.end();
  }
}

exports.route = route;
