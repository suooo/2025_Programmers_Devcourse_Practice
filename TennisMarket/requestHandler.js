const fs = require("fs"); //file sync -> 내가 만든 html을 가져올 수 있다.
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function style(response) {
  fs.readFile("./style.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );
  response.write(orderlist_view);
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  response.write(orderlist_view);

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    rows.forEach((e) => {
      console.log(
        "product id: " + e.product_id + ", order date: " + e.order_date
      );
      response.write(
        `<tr> <td>${e.product_id}</td> <td>${e.order_date}</td> </tr>`
      );
    });
    response.write("</table>");
    response.end();
  });
}

let handle = {}; //key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/*image directory*/
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;
handle["/style.css"] = style;

exports.handle = handle;
