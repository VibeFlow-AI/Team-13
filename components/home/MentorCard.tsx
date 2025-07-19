'use client';

import React, { useState } from 'react';

interface MentorCardProps {
  name: string;
  location: string;
  initials: string;
  initialsColor: string;
  subjects: string[];
  description: string;
  duration: string;
  language: string;
  imageSrc: string;
  heartIconSrc: string;
}

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  location,
  initials,
  initialsColor,
  subjects,
  description,
  duration,
  language,
  imageSrc,
  heartIconSrc
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookSession = () => {
    // Placeholder for booking functionality
    alert(`Booking session with ${name}`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <article className="flex flex-col relative min-h-[554px] w-full items-stretch pt-7 pb-3.5 px-[19px] rounded-[25px] max-md:max-w-full max-md:pr-5">
      <img
        src={imageSrc}
        className="absolute h-full w-full object-cover inset-0"
        alt={`Background for ${name}'s profile`}
      />
      <div className="relative min-h-[425px]">
        <header className="flex w-full flex-col items-stretch leading-none">
          <div className="flex w-full items-center gap-[21px] justify-center">
            <div 
              className="self-stretch text-2xl font-normal whitespace-nowrap text-center tracking-[-1.46px] w-[84px] my-auto rounded-xl"
              style={{ color: initialsColor }}
            >
              <div className="bg-[rgba(244,244,244,1)] flex flex-col items-center w-[84px] justify-center h-[84px] px-[31px] rounded-xl max-md:px-5">
                <span>{initials}</span>
              </div>
            </div>
            <div className="self-stretch flex min-w-60 flex-col w-[279px] my-auto pr-14 rounded-[0px_0px_0px_0px]">
              <h3 className="text-black text-2xl font-medium tracking-[-1.46px]">
                {name}
              </h3>
              <p className="text-[rgba(143,143,143,1)] text-[15px] font-normal tracking-[-0.9px] mt-[9px]">
                {location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[7px] text-[15px] text-black font-light whitespace-nowrap tracking-[-0.91px] mt-[25px]" role="list" aria-label="Subject tags">
            {subjects.map((subject, index) => (
              <span 
                key={index}
                className="bg-[rgba(231,231,231,1)] border flex items-center gap-2 justify-center px-2 py-2 rounded-[5px] border-[rgba(213,213,213,1)] border-solid"
                role="listitem"
              >
                {subject}
              </span>
            ))}
          </div>
        </header>
        
        <div className="w-full text-black mt-5">
          <p className="w-full text-xl font-light tracking-[-1.22px] leading-[26px]">
            {description}
          </p>
          <dl className="w-full text-[15px] tracking-[-0.91px] leading-none mt-6">
            <div className="flex w-full items-center gap-[9px]">
              <dt className="font-medium self-stretch w-[60px] my-auto">Duration:</dt>
              <dd className="font-light self-stretch w-[286px] my-auto">{duration}</dd>
            </div>
            <div className="flex w-full items-center gap-[9px] mt-2.5">
              <dt className="font-medium self-stretch w-[139px] my-auto">Preferred Language:</dt>
              <dd className="font-light self-stretch w-[286px] my-auto">{language}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      <footer className="relative self-center flex w-[348px] max-w-full items-stretch gap-2 text-xl text-white font-medium tracking-[-1.22px] leading-none mt-9">
        <button 
          onClick={handleBookSession}
          className="justify-center items-center bg-[#1D1D1B] flex min-h-[49px] gap-2 grow shrink basis-auto px-2 py-[13px] rounded-[4.537px] border-[0.756px] border-solid border-[#D5D5D5] hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label={`Book a session with ${name}`}
        >
          <span className="self-stretch my-auto">Book a session</span>
        </button>
        <button
          onClick={handleBookmark}
          className={`aspect-[0.98] w-[49px] shrink-0 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 ${isBookmarked ? 'bg-red-100' : 'bg-transparent'}`}
          aria-label={`${isBookmarked ? 'Remove from' : 'Add to'} bookmarks`}
        >
          <img
            src={heartIconSrc}
            className="aspect-[0.98] object-contain w-[49px]"
            alt=""
            aria-hidden="true"
          />
        </button>
      </footer>
    </article>
  );
};

export default MentorCard;