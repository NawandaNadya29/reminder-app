'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/addtopics/add.css';

const AddTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        // Jika berhasil menambahkan, arahkan pengguna ke halaman todos
        router.push('/todos');
      } else {
        throw new Error('Failed to create a task');
      }
    } catch (error) {
      console.log('Error adding task: ', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="add-task-title">Add New Task</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;




