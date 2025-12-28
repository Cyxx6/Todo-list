import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  // Advanced Feature: Initialize state from LocalStorage so data isn't lost on refresh
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");

  // Save to LocalStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false, // Advanced Feature: Completion status
      createdAt: new Date().toLocaleDateString() // Advanced Feature: Date tracking
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Advanced Feature: Statistics
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="todo-container">
      <header>
        <h1>Task Master</h1>
        <p>{completedCount} of {todos.length} tasks completed</p>
      </header>

      <form onSubmit={addTask} className="todo-input-section">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-msg">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                <input type="checkbox" checked={todo.completed} readOnly />
                <span>{todo.text}</span>
                <small>{todo.createdAt}</small>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;