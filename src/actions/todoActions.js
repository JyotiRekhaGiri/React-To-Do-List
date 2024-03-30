// import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes';

// export const addTodo = todo => ({
//   type: ADD_TODO,
//   payload: todo
// });

// export const deleteTodo = id => ({
//   type: DELETE_TODO,
//   payload: id
// });

// export const editTodo = (id, newText) => ({
//   type: EDIT_TODO,
//   payload: { id, newText }
// });
// todoActions.js

import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes';

export const addTodo = todo => {
  // Retrieve existing todos from local storage
  const todosFromStorage = JSON.parse(localStorage.getItem('todos')) || [];
  
  // Update todos array with the new todo
  const updatedTodos = [...todosFromStorage, todo];
  
  // Update local storage with the updated todos
  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  return {
    type: ADD_TODO,
    payload: todo
  };
};

export const deleteTodo = id => {
  // Retrieve existing todos from local storage
  const todosFromStorage = JSON.parse(localStorage.getItem('todos')) || [];
  
  // Filter out the todo with the specified id
  const updatedTodos = todosFromStorage.filter(todo => todo.id !== id);
  
  // Update local storage with the updated todos
  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  return {
    type: DELETE_TODO,
    payload: id
  };
};

export const editTodo = (id, newText) => {
  // Retrieve existing todos from local storage
  const todosFromStorage = JSON.parse(localStorage.getItem('todos')) || [];
  
  // Find the todo with the specified id and update its text
  const updatedTodos = todosFromStorage.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  
  // Update local storage with the updated todos
  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  return {
    type: EDIT_TODO,
    payload: { id, newText }
  };
};
