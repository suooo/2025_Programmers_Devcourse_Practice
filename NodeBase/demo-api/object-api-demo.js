import express from "express";

const app = express();
app.listen(3000);

let youtuber1 = {
  channelTitle: "십오야",
  subscribers: "593만 명",
  videoNum: "993개",
};

let youtuber2 = {
  channelTitle: "침착맨",
  subscribers: "227만 명",
  videoNum: "6.6천 개",
};

let youtuber3 = {
  channelTitle: "테오",
  subscribers: "54.8만 명",
  videoNum: "726개",
};

app.get("/:nickname", (req, res) => {
  const { nickname } = req.params;

  if (nickname == "@15ya.fullmoon") {
    res.json(youtuber1);
  } else if (nickname == "@ChimChakMan_Official") {
    res.json(youtuber2);
  } else if (nickname == "@TEO_universe") {
    res.json(youtuber3);
  }
  // 개발자가 예상하지 못한 에러 = 예외가 발생했다. -> 예외 처리
  else {
    res.json({
      message: "저희가 모르는 유튜버입니다.",
    });
  }
});
