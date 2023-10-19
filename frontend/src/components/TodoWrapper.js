import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import axios from 'axios';

axios.defaults.baseURL = 'http://54.201.253.206:8000'; // Set your Django API URL

axios.defaults.xsrfCookieName = 'csrftoken'; // Make sure the name matches your Django project's configuration.
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos/');
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    axios.post('/api/todos/', { task: todo, completed: false })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error('Error adding a todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}/`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting a todo:', error);
      });
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    axios.put(`/api/todos/${id}/`, updatedTodos.find((todo) => todo.id === id))
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error toggling completeness:', error);
      });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    axios.put(`/api/todos/${id}/`, { task })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task, isEditing: false } : todo
          )
        );
      })
      .catch((error) => {
        console.error('Error editing a todo:', error);
      });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {loading ? (
        // Render a loading state here
        <p>Loading...</p>
      ) : (
        // Check if todos is an array and has items before mapping
        Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={() => editTodo(todo.id)}
                toggleComplete={toggleComplete}
              />
            )
          )
        ) : (
          // Render a message when there are no todos
          <p>No todos found.</p>
        )
      )}
    </div>
  );
};
