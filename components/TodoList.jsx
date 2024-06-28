'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import '@/app/todos/todo-list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveBtn from "@/components/RemoveBtn";
import { faTrash, faCheck, faPlus, faEdit,} from '@fortawesome/free-solid-svg-icons';

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
  

  const handleEdit = (id) => {
    router.push(`/editTopic?id=${id}`); 
  };
    
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }), // Example: Sending task status as completed
      });

      if (res.ok) {
        console.log(`Task ${id} marked as completed.`);
        fetchTasks(); // Reload tasks after successfully marking as completed
      } else {
        throw new Error('Failed to mark task as completed.');
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
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

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (res.ok) {
  //       // Remove the deleted task from the state
  //       setTasks(tasks.filter(task => task._id !== id));
  //     } else {
  //       throw new Error('Failed to delete task');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting task: ', error);
  //   }
  // };

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
              <button onClick={() => RemoveBtn(task._id)}>
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
