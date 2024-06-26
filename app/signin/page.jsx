'use client'
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' for Next.js 13+ with app directory
import '@/app/signin/style-signin.css'; // Import CSS untuk SignIn
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();


  useEffect(() => {
    if (user) {
      router.push('/components'); // Redirect to home page after successful sign-in
    }
  }, [user, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  };

  const togglePasswordVisibility = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src="/images/todo.png" className="logo-image" />
      </div>
      <div className="signin-title">
        <h2 className="title-1">Welcome to</h2>
        <h3 className="title-2">REMINDER APP</h3>
      </div>
      <form onSubmit={handleSignIn} className="form-container">
        <div className="form-group">
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-icon" onClick={() => togglePasswordVisibility('password')}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <div className="forgot-password-link">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        {error && <p className="error-message">{error.message}</p>}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="redirect-message">
        Don’t have an account?{' '}
        <Link href="/signup">
          <span className="redirect-link">Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

