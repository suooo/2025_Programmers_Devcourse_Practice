import express from "express";

const app = express();
app.listen(3000);

/*
app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  if (db.get(id) == undefined) {
    //undefined는 문자열이 아니다.
    res.json({
      message: "없는 상품입니다.",
    });
  } else {
    //else 안 두면 에러가 찍힌다 -> 지금이 좀 더 안정적
    res.json({
      id: id,
      productName: db.get(id),
    });
  }
});
*/

app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({
      message: "없는 상품입니다.",
    });
  } else {
    let product = db.get(id);
    //객체에 값 추가하기
    product.id = id; // 이거랑 똑같음 product[id] = id;
    res.json(product);
  }
});

let Notebook = {
  productName: "Notebook",
  price: 2000000,
};

let Cup = {
  productName: "Cup",
  price: 3000,
};

let Chair = {
  productName: "Chair",
  price: 100000,
};

let Poster = {
  productName: "Poster",
  price: 100000,
};

let db = new Map();
db.set(1, Notebook); //key로 value를 찾을 수 있는 한 쌍을 저장
db.set(2, Cup);
db.set(3, Chair);
db.set(4, Poster);

console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
