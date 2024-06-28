
// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import '@/app/editTopic/edit.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// const EditTaskPage = () => {
//  const [title, setTitle] = useState('');
//  const [description, setDescription] = useState('');
//  const router = useRouter();
//  const searchParams = useSearchParams();
//  const taskId = searchParams.get('id');

//  useEffect(() => {
//   const fetchTask = async () => {
//    try {
//     const res = await fetch(`/api/topics/${_Id}`);
//     if (res.ok) {
//      const data = await res.json();
//      setTitle(data.title);
//      setDescription(data.description);
//     } else {
//      throw new Error('Failed to fetch task');
//     }
//    } catch (error) {
//     console.error('Error fetching task: ', error);
//    }
//   };

//   fetchTask();
//  }, [taskId]);

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!title || !description) {
//    alert('Title and description are required.');
//    return;
//   }

//   try {
//    const res = await fetch('/api/topics', {
//     method: 'PUT',
//     headers: {
//      'Content-type': 'application/json',
//     },
//     body: JSON.stringify({ id: taskId, title, description }),
//    });

//    if (res.ok) {
//     // Jika berhasil memperbarui, arahkan pengguna ke halaman todos
//     router.push('/todos');
//    } else {
//     throw new Error('Failed to update task');
//    }
//   } catch (error) {
//    console.log('Error updating task: ', error);
//    alert('Failed to update task. Please try again.');
//   }
//  };

//  const home = () => {
//   router.push('/todos'); // Navigate to '/todos' page when Back button is clicked
//  };

//  return (
//   <div className="container_edit">
//    <div className="box_edit">
//     <button className="btn_edit" onClick={home} style={{ fontSize: '20px' }}>
//      <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} />
//     </button>
//     <h1 className="task-title_edit">EDIT TASK</h1>
//    </div>
//    <form onSubmit={handleSubmit} className="task-form_edit">
//     <div className="form-group_edit">
//      <label htmlFor="title" className="form-label_edit">Title :</label>
//      <input
//       type="text"
//       id="title"
//       className="form-input_edit"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//       required
//      />
//     </div>
//     <div className="form-group_edit">
//      <label htmlFor="description" className="form-label_edit">Description :</label>
//      <textarea
//       id="description"
//       className="form-textarea_edit"
//       value={description}
//       onChange={(e) => setDescription(e.target.value)}
//       required
//      />
//     </div>
//     <button type="submit" className="task-btn_edit">EDIT</button>
//    </form>
//   </div>
//  );
// };

// export default EditTaskPage;

