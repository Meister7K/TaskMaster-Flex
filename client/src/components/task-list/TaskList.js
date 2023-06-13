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
  const [completeTask, { error: completeError }] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const [deleteTask, { error: deleteError }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const user = Auth.getProfile();
  const {
    loading,
    error: queryError,
    data: taskData,
  } = useQuery(GET_TASKS, {
    variables: { userId: user.data._id },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmitTask = async (event) => {
    event.preventDefault();

    try {
      const response = await addTask({ variables: taskState });
      setTaskState({
        name: "",
        difficulty: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await completeTask({
        variables: { taskId },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask({ variables: { taskId } });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const activeTasks =
    taskData?.tasks.filter(
      (task) => !task.isComplete && task.user._id === user.data._id
    ) || [];

  const completedTasks =
    taskData?.tasks.filter(
      (task) => task.isComplete && task.user._id === user.data._id
    ) || [];

// console.log("Active Tasks:");
// activeTasks.forEach((task) => {
//   console.log(task);
// });

console.log("Completed Tasks:");
completedTasks.forEach((task) => {
  console.log(task.user._id);
});

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
            <option value="none">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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
            <option value="School">School</option>
            <option value="Work">Work</option>
            <option value="Chores">Chores</option>
            <option value="Creative">Creative</option>
            <option value="Health">Health</option>
            <option value="Exercise">Exercise</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>
      <div>
        <h2>Active Tasks</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="task-list">
            {activeTasks.map((task) => (
              <li key={task._id} className="task">
                <div className="task-card">
                  <div className="task-details">
                    <span className="task-name">{task.name}</span>
                    <span className="task-difficulty">
                      Difficulty: {task.difficulty}
                    </span>
                    <span className="task-category">
                      Category: {task.category}
                    </span>
                    <span className="task-completed-date">
                      Created{" "}
                      {new Date(parseInt(task.createdAt)).toLocaleString()}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleCompleteTask(task._id)}>
                      Complete
                    </button>
                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Completed Tasks</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="task-list">
            {completedTasks.map((task) => (
              <li key={task._id} className="task">
                <div className="task-card">
                  <div className="task-details">
                    <span className="task-name">{task.name}</span>
                    <span className="task-difficulty">
                      Difficulty: {task.difficulty}
                    </span>
                    <span className="task-category">
                      Category: {task.category}
                    </span>
                    <span className="task-completed-date">
                      Completed{" "}
                      {new Date(parseInt(task.updatedAt)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskList;
