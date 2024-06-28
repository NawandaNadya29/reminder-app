'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { auth } from '@/app/firebase/config';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import '@/app/forgot-password/styleforgot.css';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetPassword, loading, error] = useSendPasswordResetEmail(auth);
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol tampilan pop-up

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setShowPopup(true); // Menampilkan pop-up setelah email terkirim
    } catch (err) {
      console.error('Error sending reset password email:', err.message);
    }
  };

  // Fungsi untuk menutup pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
    // Jika perlu, tambahkan navigasi atau tindakan lain setelah menutup pop-up
    router.push('/forgot-password'); // Contoh: redirect ke halaman login setelah menutup pop-up
  };

  return (
    <div className="forgot-password-container">
      <h1 className="title-1">FORGOT PASSWORD</h1>
      <h2 className="title-2">No worries. Enter your account email <br/>address and we will share a reset link</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="submit-button" type="submit" disabled={loading}>
          Get Link
        </button>
        {error && <p className="error-message">{error.message}</p>}
      </form>
      <p className="redirect-message">
        Return to{' '}
        <Link href="/signin">
          <span className="redirect-link">Login</span>
        </Link>
      </p>

      {/* Pop-up untuk pemberitahuan */}
      {showPopup && (
        <div className="popup">
          <p>Email reset link has been sent!</p>
          <button className="popup-button" onClick={handleClosePopup}>OK</button>
        </div>
      )}
    </div>
  );
}
