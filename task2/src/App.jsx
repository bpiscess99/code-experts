import React, { useState } from "react";
import './index.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Handle Input Change
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Add or Update Task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    if (isEditing) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id ? { ...task, text: taskInput } : task
        )
      );
      setIsEditing(false);
      setCurrentTask(null);
    } else {
      setTasks([...tasks, {text: taskInput }]);
    }

    setTaskInput("");
  };

  // Edit Task
  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskInput(task.text);
    setCurrentTask(task);
  };

  // Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={handleInputChange}
          className="input"
        />
        <button type="submit" className="button">
          {isEditing ? "Update" : "Add"}
        </button>
      </form>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="list-item">
            <span className="task-text">{task.text}</span>
            <div>
              <button 
                onClick={() => handleEdit(task)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
