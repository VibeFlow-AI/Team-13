import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: "Personalized Learning",
      imageSrc: "./feature-1.png",
      imageAlt: "Personalized Learning",
      desc: "We tailor the mentorship experience to fit each student's unique goals, learning style, and pace making every session impactful."
    },
    {
      title: "Real Mentors, Real Guidance",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/08a0b376a68ef0963c2a0a8e2b46f0dd93e07431?placeholderIfAbsent=true",
      imageAlt: "Mentor providing guidance to student",
      desc: "Get direct access to mentors who've walked the path before you."
    },
    {
      title: "Growth & Career Readiness",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/92784dbe00dc96fcc2e74848148be4ca6de45c51?placeholderIfAbsent=true",
      imageAlt: "Student preparing for career growth",
      desc: "Whether you're exploring new directions or preparing for your next big step, our sessions are designed to equip you with the skills."
    },
    {
      title: "Insights-Driven Support",
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/5985883b91f7181e7e8f2fe88b5a3d8182861860?placeholderIfAbsent=true",
      imageAlt: "Data-driven learning insights",
      desc: "We don't rely on guesswork. Our mentors use data, progress tracking, and evidence-based approaches to deliver meaningful guidance."
    }
  ];

  return (
    <section className="bg-[rgba(244,244,244,1)] flex w-full flex-col mx-auto pr-2 pt-[90px] pb-[25px]" aria-labelledby="features-heading">
      
      <div className="w-full mt-[68px] max-md:mr-1 max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {features.map((feature, index) => (
            <div key={index} className="w-[33%] h-[60vh]">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;