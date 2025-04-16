import express from "express";

const app = express();
app.listen(3000);

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

let db = new Map();
db.set(1, "NoteBook"); //key로 value를 찾을 수 있는 한 쌍을 저장
db.set(2, "Cup");
db.set(3, "Chair");

// console.log(db);
// console.log(db.get(1));
// console.log(db.get(2));
// console.log(db.get(3));
