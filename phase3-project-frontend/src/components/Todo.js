import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { AiOutlineDelete } from 'react-icons/ai';
// import { FiEdit } from 'react-icons/fi';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, setTodos }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  // console.log(todos)
  // console.log(setTodos)
  console.log(removeTodo)

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // useEffect(()=> {
  //   function deleteDB(e){
  //     e.preventDefault();
  //     fetch(`http://localhost:9292/todo/${todos.id}`, {
  //       method: "DELETE"
  //     }).then(r => r.json()).then(data => console.log(data))
  //     // removeTodo(todo.text)
  //   }
  // })

  function deleteDB(id){
    fetch(`http://localhost:9292/todo/${id}`, {
      method: "DELETE"
    }).then(r => r.json()).then(data => removeTodo(data.text))
    // removeTodo(todo.text)
  }
  

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <AiOutlineDelete
          // onClick={() => removeTodo(todo.text)}
          onClick={() => deleteDB(todo.id)}
          className='delete-icon'
        />
        {/* <FiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        /> */}
      </div>
    </div>
  ));
};

export default Todo;
