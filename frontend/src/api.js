// src/api.js
export const getTodos = async () => {
    const response = await fetch("http://54.201.253.206:8000/api/todos/");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  };
  
  export const addTodo = async (task) => {
    const response = await fetch("http://54.201.253.206:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, completed: false }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    return response.json();
  };
  
  export const deleteTodo = async (id) => {
    const response = await fetch(`http://54.201.253.206:8000/api/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  };
  
  export const updateTodo = async (id, data) => {
    const response = await fetch(`http://54.201.253.206:8000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return response.json();
  };
  