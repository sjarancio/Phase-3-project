import React, { useState, useEffect, useRef } from 'react';

// function patchDB({ todos }){
//   fetch('http://localhost:9292/todo', {
//     method: 'PATCH',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(todos)
//   })
//   .then(r => r.json(todos))
//   .then(todo => console.log(todo))
    
// }
 
function TodoForm(props) {
  // console.log(props)
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  // console.log(props.edit)
  // console.log(props)
  const {setTodos} = props
  // console.log(setTodos)
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });
  const {todos} = props
  // console.log(props)
  // console.log(props.todos)

  function postDB(e) {
    e.preventDefault();
    fetch('http://localhost:9292/todo', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        text: input
      })
    }).then (r => r.json()).then(data => setTodos([...todos, data]))
    // console.log(data)
    setInput('');
  };



  // function patchDB(e) {
  //   e.preventDefault();
  //   fetch('http://localhost:9292/todo', {
  //   method: 'PATCH',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(props.todos)}).then (r => r.json()).then(data => console.log(data))
  // };
  



  const handleChange = e => {
    setInput(e.target.value);
    // console.log(input)
    
  };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   // props.onSubmit({
  //   //   id: Math.floor(Math.random() * 10000),
  //   //   text: input
  //   // });
  //   setInput('');
  // };

  // console.log(input)
  return (
    <form onSubmit={postDB} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button  className='todo-button' >
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm; 