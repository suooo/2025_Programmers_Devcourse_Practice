import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title: string = "오늘 할 일";

  // 구조분해할당
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "강의 듣기", isChecked: false },
    { id: 2, text: "밥 먹기", isChecked: false },
    { id: 3, text: "잠자기", isChecked: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>("");

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <h1> {title} </h1>
      <div className="container">
        <div>
          <input
            type="text"
            placeholder="할 일 입력"
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button variant={"warning"} onClick={addTodo}>
            추가
          </Button>
        </div>
        <br />
        <div className="board">
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  onChange={() => {
                    handleCheckedChange(todo.id);
                  }}
                />
                <span>
                  {todo.isChecked ? (
                    <del>{todo.text}</del>
                  ) : (
                    <span>{todo.text}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
