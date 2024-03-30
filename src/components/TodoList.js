import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "./TodoList.css";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { deleteTodo, editTodo } from '../actions/todoActions';

const TodoList = ({ todos, deleteTodo, editTodo }) => {
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [completed, setCompleted] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const todosFromStorage = localStorage.getItem('todos');
    if (todosFromStorage) {
      // If there are todos stored in local storage, update the state with them
      // setTodos(JSON.parse(todosFromStorage));
    }
  }, []); // Run this effect only once, when the component mounts

  // Update local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to toggle the checked status of a todo item
  const handleCheckboxToggle = (id) => {
    setCompleted(prevCompleted => {
      const index = prevCompleted.indexOf(id);
      if (index === -1) {
        return [...prevCompleted, id];
      } else {
        return prevCompleted.filter(todoId => todoId !== id);
      }
    });
  };

  // Function to toggle the select all checkbox
  const handleSelectAllToggle = () => {
    if (selectAll) {
      setCompleted([]);
    } else {
      setCompleted(todos.map(todo => todo.id));
    }
    setSelectAll(prevSelectAll => !prevSelectAll);
  };

  // Function to check if all checkboxes are checked
  const isAllChecked = todos.length > 0 && todos.every(todo => completed.includes(todo.id));

  // Function to start editing a todo
  const handleEditStart = (id, text) => {
    setEditableTodoId(id);
    setEditedText(text);
  };

  // Function to cancel editing
  const handleEditCancel = () => {
    setEditableTodoId(null);
    setEditedText('');
  };

  // Function to submit edited todo
  const handleEditSubmit = (id) => {
    if (!editedText.trim()) {
      handleEditCancel();
      return;
    }
    editTodo(id, editedText);
    handleEditCancel();
  };

  return (
    <div>
    <button
    onClick={handleSelectAllToggle}
    className='btn btn-outline-info'
    >
      SelectAll
    </button>
    <div className='lists'>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className='links'>
            <input
              type="checkbox"
              checked={completed.includes(todo.id)}
              onChange={() => handleCheckboxToggle(todo.id)}
            />
            {editableTodoId === todo.id ? (
              <div>
                <div className='inputs' style={{alignItems: "start",display: "flex"}}>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                </div>
                <button onClick={() => handleEditSubmit(todo.id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <div className='lists-details' style={{alignItems: "start",display: "flex"}}>{todo.text}</div>
                <div className='edit-delete'>
                  <button onClick={() => handleEditStart(todo.id, todo.text)}>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    <IoTrashOutline style={{ fontWeight: '600', size: '17px' }} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {isAllChecked && <p style={{zIndex: "100",position: "absolute"}}>Task Completed</p>}
    </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos.todos
});

export default connect(mapStateToProps, { deleteTodo, editTodo })(TodoList);
