const fs = require("fs"); //file sync -> 내가 만든 html을 가져올 수 있다.
const main_view = fs.readFileSync("./main.html", "utf-8");
const login_view = fs.readFileSync("./login.html", "utf-8");
const signup_view = fs.readFileSync("./signup.html", "utf-8");
const detail_view = fs.readFileSync("./detail.html", "utf-8");
const orderconfirm_view = fs.readFileSync("./orderconfirm.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");
const { format } = require("path");

function main(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);

  mariadb.query("SELECT * FROM shows", function (err, rows) {
    rows.forEach((e) => {
      const showDate = new Date(e.show_date);
      const formattedDate = showDate.toISOString().split("T")[0];
      response.write(
        `<div class="card">
        <a href="/detail?id=${e.show_id}">
        <img class="card_img" src="./img/${e.poster}" />
        </a>
        <p class="card_date">공연 날짜 : ${formattedDate}</p>
        <p class="card_title">공연명 : ${e.title}</p>
        <p class="card_price">가격 : ${e.show_price}원</p>
      </div>`
      );
    });
    response.end();
  });
}

function detail(response, query) {
  const show_id = parseInt(query.id);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(detail_view);
  mariadb.query(
    "SELECT * FROM shows WHERE show_id = ?",
    [show_id],
    function (err, rows) {
      rows.forEach((e) => {
        const showDate = new Date(e.show_date);
        const formattedDate = showDate.toISOString().split("T")[0];
        response.write(`<h1> <${e.title}> 상세 페이지</h1>
        <div class="card_parent">
        <div class="card">
        <img class="card_img" src="./img/${e.poster}" />
        </div>
        <div class="card" style="text-align:left">
        <p class="card_title">공연명 : ${e.title}</p>
        <p class="card_date">날짜 : ${formattedDate}</p>
        <p class="card_price">가격 : ${e.show_price}원</p>
        <form action="/order">
              <input type="hidden" name="show_id" value="${e.show_id}" />
              <label>수량: 
                <input type="number" name="order_quantity" min="1" max="100" required />
              </label>
              <input type="submit" value="예매하기"/>
        <p>${e.description}</p>
      </div>
      </div>`);
      });
      response.end();
    }
  );
}

let order_id = 1100;
let tmpUserid = 1;

function order(response, query) {
  const show_id = parseInt(query.show_id);
  const order_quantity = parseInt(query.order_quantity);
  const order_date = new Date().toISOString().split("T")[0];

  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "SELECT show_date, show_price, title FROM shows WHERE show_id=?",
    [show_id],
    function (err, rows) {
      console.log(rows);
      const price = rows[0].show_price;
      const title = rows[0].title;
      const total_price = price * order_quantity;

      mariadb.query(
        "INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?)",
        [order_id, show_id, tmpUserid, order_date, order_quantity, total_price],
        function (err, rows) {
          order_id++;
          response.write(orderconfirm_view);
          response.write(
            `<tr> 
              <td>${order_id}</td>
              <td>${order_date}</td> 
              <td>${title}</td> 
              <td>${order_quantity}</td>
              <td>${total_price}</td>
            </tr>`
          );
          response.end();
        }
      );
    }
  );
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(orderlist_view);

  mariadb.query(
    `SELECT 
  orders.order_date, 
  orders.order_quantity,
  orders.total_price,
  users.name AS name, 
  users.email AS email,
  shows.title AS title
  FROM orders
  JOIN users ON orders.user_id = users.user_id
  JOIN shows ON orders.show_id = shows.show_id
  ORDER BY orders.order_date ASC`,
    function (err, rows) {
      rows.forEach((e) => {
        const showDate = e.order_date;
        const formattedDate = showDate.toLocaleDateString();
        response.write(
          `<tr> 
            <td>${formattedDate}</td>
            <td>${e.title}</td> 
            <td>${e.name}</td> 
            <td>${e.email}</td>
            <td>${e.order_quantity}</td>
            <td>${e.total_price}</td>
          </tr>`
        );
      });
      response.write("</table>");
      response.end();
    }
  );
}

function login(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  response.write(login_view);
  response.end();
}

let user_id = 110;
function signup(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  response.write(signup_view);
  response.end();
}

function style(response) {
  fs.readFile("./style.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}

function poster_101(response) {
  fs.readFile("./img/poster_101.jpg", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function poster_102(response) {
  fs.readFile("./img/poster_102.jpg", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function poster_103(response) {
  fs.readFile("./img/poster_103.jpg", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function poster_104(response) {
  fs.readFile("./img/poster_104.jpg", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

let handle = {}; //key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;
handle["/login"] = login;
handle["/signup"] = signup;
handle["/detail"] = detail;

/*image directory*/
handle["/img/poster_101.jpg"] = poster_101;
handle["/img/poster_102.jpg"] = poster_102;
handle["/img/poster_103.jpg"] = poster_103;
handle["/img/poster_104.jpg"] = poster_104;
handle["/style.css"] = style;

exports.handle = handle;
