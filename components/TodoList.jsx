import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import '@/components/todo-list.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'TASK TITLE', description: 'Your Task' },
    { id: 2, title: 'TASK TITLE', description: 'Your Task' },
    { id: 3, title: 'TASK TITLE', description: 'Your Task' },
  ]);
  const router = useRouter();


  useEffect(() => {
    const checkAuth = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          router.push('/signin'); // Redirect to sign-in page if not authenticated
        }
      });
    };

    checkAuth();
  }, []);

  const handleEdit = (id) => {
    // Handle edit functionality
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      router.push('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/images/todo.png" alt="Task Icon" className="icon" />
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="completed-btn-container">
        <button className="completed-btn">Completed</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>
            <div className="task-actions">
              <button onClick={() => handleEdit(task.id)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-btn-container">
        <button className="add-btn">➕</button>
      </div>
    </div>
  );
};

export default TodoList;

