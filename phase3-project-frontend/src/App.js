import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

// import Testing from './components/Test';



function App() {
  // const [tasks, setTasks] = useState('')

  return (
    <div className='todo-app'>
      <BrowserRouter>
        <Route path="/todo">
          <TodoList />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

