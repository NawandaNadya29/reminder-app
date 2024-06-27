
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/editTopic/edit.css';

const EditTopicForm = ({ id, title, description}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error('Failed to update topic');
      }

      router.push('/todos'); // Redirect to the todos page after successful update
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="edit-task-title">Edit Task</h1>
      <form onSubmit={handleSubmit} className="edit-task-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-textarea"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="edit-task-btn">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTopicForm;

