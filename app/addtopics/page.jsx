'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/addtopics/add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push('/todos');
      } else {
        throw new Error('Failed to create a task');
      }
    } catch (error) {
      console.log('Error adding task: ', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const home = () => {
    router.push('/todos'); 
  };

  return (
    <div className="container_add">
      <div className="box_add">
        <button className="add-btn_add" onClick={home} style={{ fontSize: '20px' }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} />
        </button>
        <h1 className="add-task-title_add">ADD TASK</h1>
      </div>
      <form onSubmit={handleSubmit} className="add-task-form_add">
        <div className="form-group_add">
          <label htmlFor="title" className="form-label_add">Title :</label>
          <input
            type="text"
            id="title"
            className="form-input_add"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group_add">
          <label htmlFor="description" className="form-label_add">Description :</label>
          <textarea
            id="description"
            className="form-textarea_add"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-task-btn_add">ADD</button>
      </form>
    </div>
  );
};

export default AddTaskPage;




