'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const Header = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleGetStarted = () => {
    if (user) {
      router.push('/role-selection');
    } else {
      router.push('/auth');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-white flex w-full items-center justify-between text-2xl tracking-[-1.42px] leading-none flex-wrap pl-20 pr-3 py-[23px] rounded-[0px_0px_20px_20px] max-md:max-w-full max-md:pl-5">
      <a
        href="#"
        className='flex items-center justify-center'
      >
        <img
          src="./EduVibe-Logo.png"
          alt="EduVibe Logo"
          className="h-10 w-auto object-contain"
        />
      </a>
      <nav className="flex items-center gap-[40px_50px] text-black font-normal whitespace-nowrap" role="navigation" aria-label="Main navigation">
        <a
          href="#home"
          className="self-stretch flex items-center gap-2.5 justify-center my-auto p-2.5 hover:text-gray-600 transition-colors"
          aria-label="Navigate to Home section"
        >
          <span className="self-stretch my-auto">Home</span>
        </a>
        <a
          href="#sessions"
          className="self-stretch flex items-center gap-2.5 justify-center my-auto p-2.5 hover:text-gray-600 transition-colors"
          aria-label="Navigate to Sessions section"
        >
          <span className="self-stretch my-auto">Sessions</span>
        </a>
        <a
          href="#about"
          className="self-stretch flex items-center gap-2.5 justify-center my-auto p-2.5 hover:text-gray-600 transition-colors"
          aria-label="Navigate to About section"
        >
          <span className="self-stretch my-auto">About</span>
        </a>
      </nav>
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Welcome, {user.email}</span>
          <button
            onClick={handleSignOut}
            className="bg-gray-200 flex items-center text-gray-700 font-medium justify-center px-4 py-2 rounded-[9px] hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label="Sign out"
          >
            <span className="self-stretch my-auto">Sign Out</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleGetStarted}
          className="bg-black flex items-center me-3 text-[rgba(216,216,216,1)] font-medium justify-center px-5 py-2.5 rounded-[9px] hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Get started with EduVibe"
        >
          <span className="self-stretch my-auto">Get Started</span>
        </button>
      )}
    </header>
  );
};

export default Header;
