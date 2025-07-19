'use client';

import React, { useState } from 'react';
import MentorCard from './MentorCard';

const SessionHighlights = () => {
  const [showMore, setShowMore] = useState(false);

  const mentors = [
    {
      name: "Chathum Rahal",
      location: "Galle",
      initials: "CR",
      initialsColor: "rgba(255,149,0,1)",
      subjects: ["Mathematics", "History", "English"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "English",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/6184a5219b55414eed291bfd8dc4a5b0966b7fb3?placeholderIfAbsent=true",
      heartIconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/f5d255d8bc24bf00931fdcb032ed08a5b752c288?placeholderIfAbsent=true"
    },
    {
      name: "Malsha Fernando",
      location: "Colombo",
      initials: "MI",
      initialsColor: "rgba(217,0,255,1)",
      subjects: ["Chemistry", "Art", "Commerce"],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      duration: "1 hour",
      language: "Sinhala",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/6b8dcceb60b2bd2b19d0afbfd3577580954aec5e?placeholderIfAbsent=true",
      heartIconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/3457c926e593a14d56eb1415ef1f823b2368f1e8?placeholderIfAbsent=true"
    }
  ];

  const handleLoadMore = () => {
    setShowMore(!showMore);
    // In a real application, this would load more sessions from an API
  };

  return (
    <section aria-labelledby="session-highlights-heading">
      <header className="text-center">
        <h2 
          id="session-highlights-heading"
          className="text-black text-[66px] font-medium leading-none tracking-[-3.96px] mt-[177px] max-md:max-w-full max-md:text-[40px] max-md:mt-10"
        >
          Session Highlights – Trending Now
        </h2>
        <p className="text-black text-[32px] font-normal leading-9 tracking-[-1.92px] mt-6 max-md:max-w-full">
          Join the sessions students are raving about. These expert-led, high-impact sessions are designed to help you unlock your full potential whether you're polishing your resume, mapping out your career path, or getting ready to ace technical interviews.
        </p>
      </header>
      
      <div className="mt-16 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {mentors.map((mentor, index) => (
            <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
              <MentorCard {...mentor} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-16 max-md:mt-10">
        <button 
          onClick={handleLoadMore}
          className="justify-center items-center flex gap-[7px] text-xl text-[#1D1D1B] font-medium tracking-[-1.2px] leading-none px-2.5 py-3 rounded-[4.477px] border-[0.746px] border-solid border-[#434343] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={showMore ? "Show fewer sessions" : "Load more sessions"}
        >
          <span className="text-[#1D1D1B] self-stretch my-auto">
            {showMore ? "Show Less" : "Load More Sessions"}
          </span>
        </button>
      </div>
    </section>
  );
};

export default SessionHighlights;