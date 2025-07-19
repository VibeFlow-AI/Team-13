import React from 'react';
import Header from '../components/common/Header';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';
import PersonalizedLearning from '../components/home/PersonalizedLearning';
import SessionHighlights from '../components/home/SessionHighlights';
import Footer from '@/components/common/Footer';

const HomePage = () => {
  return (
    <div className="bg-[rgba(244,244,244,1)] flex flex-col overflow-hidden items-stretch">
      <div className="flex w-full flex-col items-stretch px-[77px] max-md:max-w-full max-md:px-5">
        <Header />

        <main>
          <Hero />

          <div className="flex w-[837px] shrink-0 max-w-full h-[125px] mt-[54px] max-md:mt-10" />
        </main>
      </div>

      <div className="self-center z-10 mt-[-7px] w-full max-w-[1351px] max-md:max-w-full">
        <div className="flex items-center justify-center w-60%">
          <header className="text-center flex-wrap mx-48">
            <h2
              id="features-heading"
              className="text-black text-[66px] font-medium leading-none tracking-[-3.96px] max-md:text-[40px]"
            >
              What's in it for Students?
            </h2>
            <p className="text-black text-[32px] font-normal leading-9 tracking-[-1.92px] mt-6">
              EduVibe is a student-mentor platform designed to personalize learning journeys. It connects students with mentors who offer guidance, support, and practical industry insights.
            </p>
          </header>
        </div>
        <div className="gap-5 flex max-md:flex-col items-center justify-center">
          <div className="w-[90%] ml-5 max-md:w-full max-md:ml-0">
            <FeaturesSection />
            <SessionHighlights />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;