import React, { useEffect } from 'react';
import TodoList from '@/components/TodoList'; // Import komponen TodoList
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';

const TodosPage = () => {
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

  return (
    <div>
      <TodoList />
    </div>
  );
};

export default TodosPage;

