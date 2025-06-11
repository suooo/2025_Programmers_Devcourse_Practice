import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let name = "React";
  const style = {
    backgroundColor: "black",
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    padding: "20px",
  };
  return (
    <div className="App" style={style}>
      {/*
      작성자 : Park Suyeon
      작성일 : 2025. 06. 11.
      내용 : 기능에 대한 설명
    */}
      <h1>{name === "React" ? <h1>Yes</h1> : null} 안녕!</h1>
    </div>
  );

  // port 넘버 설정 시 삼항 연산자를 자주 사용한다.
  // const port = undefined;
  // return (
  //   <div>
  //     {
  //       port || "3000" // 전달받은 포트 넘버 or 디폴트 포트넘버
  //     }
  //   </div>
  // );
}

export default App;
