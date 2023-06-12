import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import "./TaskList.css";
import Auth from "../../utils/auth";

import { ADD_TASK, COMPLETE_TASK, DELETE_TASK } from "../../utils/mutations";

function TaskList() {
  const [taskState, setTaskState] = useState({
    name: "",
    difficulty: "",
    category: "",
  });
  const [addTask, { error, data }] = useMutation(ADD_TASK);
  const [completeTask, { error1, data1 }] = useMutation(COMPLETE_TASK);
  const [deleteTask, { error2, data2 }] = useMutation(DELETE_TASK);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();

    addTask({ variables: taskState })
      .then((response) => {
        console.log(response);
        setTaskState({
          name: "",
          difficulty: "",
          category: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Task List</h1>
      <form onSubmit={handleSubmitTask}>
        <label>
          Task Name:
          <input
            type="text"
            name="name"
            value={taskState.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={taskState.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Category:
          <select
            name="category"
            value={taskState.category}
            onChange={handleChange}
          >
            <option value="none">Select category</option>
            <option value="school">School</option>
            <option value="work">Work</option>
            <option value="chores">Chores</option>
            <option value="creative">Creative</option>
            <option value="health">Health</option>
            <option value="exercise">Exercise</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskList;
