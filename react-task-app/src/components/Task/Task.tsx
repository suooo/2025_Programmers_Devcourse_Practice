import React, { type FC } from "react";
import { container, title, description } from "./Task.css";

type TTaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

const Task: FC<TTaskProps> = ({
  index,
  id,
  boardId,
  taskName,
  taskDescription,
}) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  );
};

export default Task;
