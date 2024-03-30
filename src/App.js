import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import "./App.css";
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>To-Do List</h1>
        <div className='containerone'>
        <AddTodo />
        <h1>Lists</h1>
        <TodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
