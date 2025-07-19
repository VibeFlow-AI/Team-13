import React from 'react';

const Header = () => {
  return (
    <header className="bg-white flex w-full items-stretch gap-[40px_100px] text-2xl tracking-[-1.44px] leading-none flex-wrap pl-20 pr-3 py-[23px] rounded-[0px_0px_20px_20px] max-md:max-w-full max-md:pl-5">
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
      <button 
        className="bg-black flex items-center gap-2.5 text-[rgba(216,216,216,1)] font-medium justify-center px-5 py-2.5 rounded-[9px] hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label="Get started with EduVibe"
      >
        <span className="self-stretch my-auto">Get Started</span>
      </button>
    </header>
  );
};

export default Header;