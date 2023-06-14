import React from "react";
import TaskList from '../components/task-list/TaskList';
import Auth from "../utils/auth";

function Tasks() {
  const user = Auth.getProfile();
  if (!user) {
    window.location.assign("/");
    return null;
  }
  return (
    <>
      <TaskList />
    </>
  );
}

export default Tasks;