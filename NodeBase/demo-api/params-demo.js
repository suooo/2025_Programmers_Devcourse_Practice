import express from "express";

const app = express();
app.listen(3000);

app.get("/products/:n", (req, res) => {
  // : -> URL로 매개변수를 전달
  // products/:n -> products/__ 빈칸에 오는 값을 n이라는 변수에 담기
  const params = req.params;

  let number = parseInt(params.n) - 10;
  console.log(number);

  res.json({
    num: number,
  });
});

app.get("/watch", (req, res) => {
  const query = req.query;
  //console.log(query.v);
  //console.log(query.t);

  // JS객체(JSON)의 비구조화
  const { v, t } = req.query;
  console.log(v);
  console.log(t);

  res.json({
    video: v,
    timeline: t,
  });
});
