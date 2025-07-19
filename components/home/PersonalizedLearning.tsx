import React from 'react';
import MentorCard from './MentorCard';

const PersonalizedLearning = () => {
  const mentor = {
    name: "Rahul Lavan",
    location: "Colombo",
    initials: "RL",
    initialsColor: "#0084FF",
    subjects: ["Science", "Physics", "Biology"],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    duration: "30 mins – 1 hour",
    language: "English, Tamil",
    imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/6dfd495e588a2d469f2a83a4b6b78eda772f54fc?placeholderIfAbsent=true",
    heartIconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/392a141103481c8babf7be8feb5d796b6f518d58?placeholderIfAbsent=true"
  };

  return (
    <section className="w-[39%] max-md:w-full max-md:ml-0">
      <div className="z-10 mr-[-26px] mt-[365px] max-md:max-w-full max-md:mt-10">
        <article className="flex flex-col relative min-h-[608px] text-black pt-[202px] rounded-[30px] max-md:max-w-full max-md:pt-[100px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/923e8a16586ac63409fdb4a6541cee7d2a8ef593?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Personalized learning environment"
          />
          <div className="relative flex flex-col items-stretch pt-[215px] pb-12 px-[33px] rounded-[0px_0px_30px_30px] max-md:max-w-full max-md:pt-[100px] max-md:px-5">
            <h3 className="text-[32px] font-medium leading-none tracking-[-1.92px]">
              Personalized Learning
            </h3>
            <p className="text-2xl font-light leading-[27px] tracking-[-1.44px] mt-[26px] max-md:max-w-full">
              We tailor the mentorship experience to fit each student's unique goals, learning style, and pace making every session impactful.
            </p>
          </div>
        </article>
        
        <div className="mt-[484px] max-md:mt-10">
          <MentorCard {...mentor} />
        </div>
      </div>
    </section>
  );
};

export default PersonalizedLearning;