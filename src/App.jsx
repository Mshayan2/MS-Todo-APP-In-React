import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('list');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completed, setCompleted] = useState(() => {
    const savedCompleted = localStorage.getItem('completed');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [activeTab, setActiveTab] = useState('TODO');

  
  function addItem() {
    if (!inputData) {
      alert('Please Enter your todo');
    } else {
      setTodos([...todos, inputData]);
      setInputData('');
    }
  }

  
  function deleteItem(index, listType) {
    if (listType === 'TODO') {
      const updatedTodos = todos.filter((e,i) =>  i !== index);
      setTodos(updatedTodos);
    } else {
      const updatedCompleted = completed.filter((e,i) => i !== index);
      setCompleted(updatedCompleted);
    }
  }


  function markAsCompleted(index) {
    const completedItem = todos[index];
    const updatedTodos = todos.filter((e,i) => i !== index);
    setTodos(updatedTodos);
    setCompleted([...completed, completedItem]);
  }


  // Curds Operation

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todos));
}, [todos]);

useEffect(() => {
  localStorage.setItem('completed', JSON.stringify(completed));
}, [completed]);

  return (
    <>
      <h1>MS TODO APP</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter your todo"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button className="add-btn" onClick={addItem}>
          ADD <i className="fa-solid fa-plus"></i>
        </button>

        <div className="btn-container">
          <button
            className={`btn todo ${activeTab === 'TODO' ? 'active' : ''}`}
            onClick={() => setActiveTab('TODO')}
          >
            TODO
          </button>
          <button
            className={`btn complete ${activeTab === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => setActiveTab('COMPLETED')}
          >
            COMPLETED
          </button>
        </div>

        <div className="todo-container">
          {activeTab === 'TODO' &&
            todos.map((value, index) => (
              <div className="todo-item" key={index}>
                <p>{value}</p>
                <div className="icons">
                  <i
                    className="fa-solid fa-trash-can delete"
                    onClick={() => deleteItem(index, 'TODO')}
                  ></i>
                  <i
                    className="fa-solid fa-check check"
                    onClick={() => markAsCompleted(index)}
                  ></i>
                </div>
              </div>
            ))}

          {activeTab === 'COMPLETED' &&
            completed.map((value, index) => (
              <div className="todo-item" key={index}>
                <p>{value}</p>
                <div className="icons">
                  <i
                    className="fa-solid fa-trash-can delete"
                    onClick={() => deleteItem(index, 'COMPLETED')}
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
