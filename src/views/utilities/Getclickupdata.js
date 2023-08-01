import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Getclickupdata = ({tasks}) => {
//   const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');



  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter tasks based on the search input
  const filteredTasks = tasks.filter(task =>
    task.id.toString().includes(searchText) ||
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Search by ID or Name"
        value={searchText}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <strong>Task ID:</strong> {task.id} - <strong>Name:</strong> {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Getclickupdata;
