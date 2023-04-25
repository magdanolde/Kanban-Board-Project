import React, { useState, useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

const TaskForm = () => {
  const { addTask } = useContext(TasksContext);
  const [author, setAuthor] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(author, taskName);
    setAuthor("");
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit} className="kanban__taskform">
      <input
        className="taskform__author"
        type="text"
        name="author"
        placeholder="Add name..."
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        required
      />
      <input
        className="taskform__taskname"
        type="text"
        name="taskName"
        placeholder="Add Task..."
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
        required
      />
      <button className="taskform__button">+ADD</button>
    </form>
  );
};

export default TaskForm;