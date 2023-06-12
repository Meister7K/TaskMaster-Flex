import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "./TaskList.css";
import Auth from "../../utils/auth";

import { ADD_TASK, COMPLETE_TASK, DELETE_TASK } from "../../utils/mutations";
import { GET_TASKS } from "../../utils/queries";

function TaskList() {
  const [taskState, setTaskState] = useState({
    name: "",
    difficulty: "",
    category: "",
  });
  const [addTask, { error }] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const [completeTask, { error1, data1 }] = useMutation(COMPLETE_TASK);
  const [deleteTask, { error2, data2 }] = useMutation(DELETE_TASK);
  const { loading, error: queryError, data: taskData } = useQuery(GET_TASKS);

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

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error || queryError) {
    return <div>Error: {error?.message || queryError?.message}</div>;
  }

  const tasks = taskData.tasks;

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
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.name}</h3>
            <p>Difficulty: {task.difficulty}</p>
            <p>Category: {task.category}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
