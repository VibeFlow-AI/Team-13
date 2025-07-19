import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: "Real Mentors, Real Guidance",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/08a0b376a68ef0963c2a0a8e2b46f0dd93e07431?placeholderIfAbsent=true",
      imageAlt: "Mentor providing guidance to student"
    },
    {
      title: "Growth & Career Readiness",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/92784dbe00dc96fcc2e74848148be4ca6de45c51?placeholderIfAbsent=true",
      imageAlt: "Student preparing for career growth"
    },
    {
      title: "Insights-Driven Support",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/5985883b91f7181e7e8f2fe88b5a3d8182861860?placeholderIfAbsent=true",
      imageAlt: "Data-driven learning insights"
    }
  ];

  return (
    <section className="bg-[rgba(244,244,244,1)] flex w-full flex-col mx-auto pr-2 pt-[90px] pb-[25px] max-md:max-w-full" aria-labelledby="features-heading">
      <header className="text-center">
        <h2 
          id="features-heading"
          className="text-black text-[66px] font-medium leading-none tracking-[-3.96px] max-md:max-w-full max-md:text-[40px]"
        >
          What's in it for Students?
        </h2>
        <p className="text-black text-[32px] font-normal leading-9 tracking-[-1.92px] mt-6 max-md:max-w-full">
          EduVibe is a student-mentor platform designed to personalize learning journeys. It connects students with mentors who offer guidance, support, and practical industry insights.
        </p>
      </header>
      
      <div className="w-[782px] max-w-full mt-[68px] max-md:mr-1 max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {features.map((feature, index) => (
            <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;