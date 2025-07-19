import React from 'react';

const Hero = () => {
  return (
    <section className="mt-[88px] mx-[13px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10" aria-labelledby="hero-heading">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[59%] max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-stretch mt-7 max-md:max-w-full max-md:mt-10">
            <div className="relative w-full text-black max-md:max-w-full">
              <h1 
                id="hero-heading"
                className="text-[84px] font-medium leading-[95px] tracking-[-6.72px] z-0 max-md:max-w-full max-md:text-[40px] max-md:leading-[50px]"
              >
                Empowering Students with Personalized <br />
                Mentorship
              </h1>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/831ba0f3a910c871e665be32f80c13b155906fe1?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[74px] absolute z-0 h-[74px] right-[283px] top-[211px]"
                alt="Decorative element"
                aria-hidden="true"
              />
              <p className="text-[32px] font-normal leading-9 tracking-[-1.92px] z-0 mt-[140px] max-md:max-w-full max-md:mt-10">
                EduVibe connects students with experienced mentors to guide them through their academic
              </p>
            </div>
            <button 
              className="bg-black flex items-center gap-2.5 text-[32px] text-[rgba(216,216,216,1)] font-medium tracking-[-1.92px] leading-none justify-center mt-[50px] px-[35px] py-2.5 rounded-[9px] max-md:mt-10 max-md:px-5 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Get started with personalized mentorship"
            >
              <span className="self-stretch my-auto">Get Started</span>
            </button>
          </div>
        </div>
        <div className="w-[41%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1f8f7d33c4d29bbaa5d7708173d6065361c50ac3?placeholderIfAbsent=true"
            className="aspect-[0.77] object-contain w-full shadow-[-96px_114px_42px_rgba(0,0,0,0)] grow max-md:max-w-full max-md:mt-8"
            alt="Students engaged in learning with mentors"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;