import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./toDoApp.css";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]); // Holds all tasks fetched from the backend
  const [taskContent, setTaskContent] = useState(""); // Stores new task input or edited task content
  const [editingTask, setEditingTask] = useState(null); // Tracks task being edited
  const [message, setMessage] = useState(""); // Stores success/error messages
  const [limitReached, setLimitReached] = useState(false); // Tracks if 140 character limit is reached
  const navigate = useNavigate(); // Hook for navigation

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch tasks when component mounts or when token changes
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setMessage("Tasks loaded successfully.");
        } else {
          setMessage("Failed to fetch tasks.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching tasks.");
      }
    };

    fetchTasks();
  }, [token, navigate]);

  // Add a new task
  const addTask = async (event) => {
    event.preventDefault();

    if (taskContent.length > 140) {
      setMessage("Task content exceeds 140 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: taskContent }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setTaskContent("");
        setMessage("Task added successfully.");
        setLimitReached(false); // Reset the limit message after task is added
      } else {
        setMessage("Failed to add task. Ensure it's under 140 characters.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the task.");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
        setMessage("Task deleted successfully.");
      } else {
        setMessage("Failed to delete task.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the task.");
    }
  };

  // Edit a task
  const editTask = (task) => {
    setEditingTask(task);
    setTaskContent(task.content);
  };

  // Save edited task
  const saveEdit = async (e) => {
    e.preventDefault();

    if (taskContent.length > 140) {
      setMessage("Task content exceeds 140 characters.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: taskContent }),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(
          tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setTaskContent("");
        setEditingTask(null);
        setMessage("Task updated successfully.");
        setLimitReached(false); // Reset the limit message after task is updated
      } else {
        setMessage("Failed to update task.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the task.");
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, completed: !task.completed };

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedTaskData = await response.json();
        setTasks(
          tasks.map((task) =>
            task._id === updatedTaskData._id ? updatedTaskData : task
          )
        );
        setMessage(
          updatedTaskData.completed
            ? "Task marked as complete."
            : "Task marked as incomplete."
        );
      } else {
        setMessage("Failed to update task status.");
      }
    } catch (error) {
      setMessage("An error occurred while updating task status.");
    }
  };

  return (
    <div className="todo-container">
      <h2>Your To-Do List</h2>

      {/* Show message if available */}
      {message && <p className="message">{message}</p>}

      {/* Show character limit warning if exceeded */}
      {limitReached && (
        <p className="limit-warning">Maximum character limit of 140 reached!</p>
      )}

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className={task.completed ? "completed" : ""}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {editingTask && editingTask._id === task._id ? (
              <>
                <input
                  type="text"
                  value={taskContent}
                  onChange={(event) => {
                    console.log("Typing content:", event.target.value); // Log the content being typed
                    if (event.target.value.length >= 140) {
                      console.log("Character limit exceeded!"); // Log when the limit is exceeded
                      setLimitReached(true); // Set limitReached to true
                      return; // Prevent further typing
                    } else {
                      setLimitReached(false); // Reset limitReached if typing is below limit
                    }
                    setTaskContent(event.target.value);
                  }}
                  maxLength="140"
                />
                <button className="save" onClick={saveEdit}>
                  Save
                </button>
                <button className="cancel" onClick={() => setEditingTask(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.content}</span>
                <button className="edit" onClick={() => editTask(task)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
                <button
                  className="completed"
                  onClick={() => toggleComplete(task._id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Show form if not editing a task */}
      {!editingTask && (
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskContent}
            onChange={(e) => {
              console.log("Typing content:", e.target.value); // Log the content being typed
              if (e.target.value.length >= 140) {
                console.log("Character limit exceeded!"); // Log when the limit is exceeded
                setLimitReached(true);
                return;
              } else {
                setLimitReached(false);
              }
              setTaskContent(e.target.value);
            }}
            maxLength="140"
            required
          />
          {/* Display remaining characters */}
          <p>{taskContent.length}/140</p>
          <button type="submit" className="save">
            Add Task
          </button>
        </form>
      )}
    </div>
  );
};

export default ToDoApp;
