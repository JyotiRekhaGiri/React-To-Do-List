import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todoActions';
import './AddTodo.css';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const todosFromStorage = localStorage.getItem('todos');
    if (todosFromStorage) {
      // If there are todos stored in local storage, update the state with them
      setText(JSON.parse(todosFromStorage));
    }
  }, []); 

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo({ id: Date.now(), text });
    setText('');
  };

  // Update local storage whenever the text state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(text));
  }, [text]);

  return (
    <div className='Form-box'>
      <form onSubmit={handleSubmit} className='form-input'>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Add something to your list...'
          style={{ width: `calc(100% - ${text ? text.length * 8 : 0}px)`, minWidth: '230px', marginLeft: "0.3rem" }}
        />
        <button type="submit">AddTodo</button>
      </form>
    </div>
  );
};

export default connect(null, { addTodo })(AddTodo);
