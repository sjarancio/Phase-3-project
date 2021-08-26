import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/todo')
      .then(res => res.json())
      .then(json => setTodos(json))
  }, [])

  // console.log(todos)

  const addTodo = todo => {
    

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    // console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = text => {
    const removedArr = [...todos].filter(todo => todo.text !== text);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>To Do List</h1>
      <h2></h2>
      <TodoForm onSubmit={addTodo} todos={todos} setTodos={setTodos}/>
      <Todo
        todos={todos}
        setTodos={setTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;