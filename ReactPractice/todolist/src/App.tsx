import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Todolist";
// import MapTest from "./mapTest";

/*
작성자 : Park Suyeon
작성일 : 2025. 06. 11.
내용 : 기능에 대한 설명
*/

function App() {
  return (
    <div className="container">
      <TodoList></TodoList>
      {/* <MapTest></MapTest> */}
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
