'use client'
import React from 'react';
import Link from 'next/link';
import '@/app/style-splash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src="/images/todo.png" alt="Logo" className="splash-image" />
      <h1 className="splash-title">Welcome to</h1>
      <h2 className="splash-sub-title">REMINDER APP</h2>
      <p className="splash-description">Lorem ipsum dolor sit amet, <br/>consectetur adipiscing elit, sed do <br/>eiusmod tempor incididunt ut labore et <br/>dolore magna aliqua.</p>
      <Link href="/signin" className="splash-button">
      Get Started <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
};

export default SplashScreen;