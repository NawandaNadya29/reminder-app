'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import '@/app/todos/todo-list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/topics');
        if (res.ok) {
          const data = await res.json();
          setTasks(data.topics); // Update tasks state with fetched data from MongoDB
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = () => {
    // Implement edit functionality (e.g., navigate to edit page)
    router.push('/editTopic/');
  };
    
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure?");
  
      if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          router.refresh();
        }
      }
    };

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (res.ok) {
  //       setTasks(tasks.filter(task => task._id !== id)); // Update tasks state after deletion
  //     } else {
  //       throw new Error('Failed to delete task');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting task: ', error);
  //   }
  // };

  const handleComplete = async (id) => {
    // Implement complete functionality
    // This could involve updating the task status in MongoDB
  };

  const handleAdd = () => {
    router.push('/addtopics'); // Navigate to '/addtopics' page when Add button is clicked
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/images/todo.png" className="logogambar" alt="Todo Logo" />
      </div>
      <div className="logout">
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="completed-btn-container">
        <button className="completed-btn">Completed</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <div className="task-content">
              <h2 className="task-title">{task.title}</h2>
              <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => handleEdit(task._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => handleComplete(task._id)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-btn-container">
        <button className="add-btn" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
