'use client';
import { useRouter } from 'next/navigation';

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      try {
        const res = await fetch(`/api/topics/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          router.reload(); // or navigate to another page after delete
        } else {
          throw new Error('Failed to delete topic');
        }
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  return (
    <button onClick={handleRemove}>Delete</button>
  );
};

export default RemoveBtn;

