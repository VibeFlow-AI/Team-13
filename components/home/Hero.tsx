'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/role-selection');
  };

  return (
    <section className="mt-[88px] mx-[13px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10" aria-labelledby="hero-heading">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[60%] max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-stretch mt-7 max-md:max-w-full max-md:mt-10">
            <div className="relative w-full text-black max-md:max-w-full">
              <h1
                id="hero-heading"
                className="text-[84px] font-medium leading-[95px] tracking-[-4px] z-0 max-md:max-w-full max-md:text-[40px] max-md:leading-[50px]"
              >
                Empowering Students with Personalized <br />
                Mentorship
              </h1>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/831ba0f3a910c871e665be32f80c13b155906fe1?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[74px] absolute z-0 h-[74px] right-[265px] top-[211px]"
                alt="Decorative element"
                aria-hidden="true"
              />
              <p className="text-[32px] font-normal leading-9 tracking-[-1.2px] z-0 mt-[140px] max-md:max-w-full max-md:mt-10">
                EduVibe connects students with experienced mentors to guide them through their academic
              </p>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-black flex items-center gap-2.5 text-[32px] text-[rgba(216,216,216,1)] font-medium tracking-[-1.92px] leading-none justify-center mt-[50px] px-[35px] py-2.5 rounded-[9px] max-md:mt-10 max-md:px-5 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Get started with personalized mentorship"
            >
              <span className="my-auto px-6">Get Started</span>
            </button>
          </div>
        </div>
        <div className="w-[40%] ml-5 max-md:w-full max-md:ml-0 h-[90vh] overflow-hidden relative">
          {/* Top gradient overlay */}
          <div
            className="pointer-events-none absolute top-0 left-0 w-full h-16 z-10"
            style={{
              background: "linear-gradient(to bottom, #f0f0f0, transparent 100%)",
            }}
          />
          {/* Bottom gradient overlay */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-40 z-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-30 z-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-20 z-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-20 z-10 -mt-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10 -mt-15"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10 -mt-20"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10 -mt-30"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-5 left-0 w-full h-20 z-20 mt-10"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-5 left-0 w-full h-20 z-20 mt-15"
            style={{
              background: "linear-gradient(to top, #f0f0f0, transparent 100%)",
            }}
          />
          <div
            className="w-full h-full flex flex-row gap-x-7"
            style={{ pointerEvents: 'none' }}
          >
            {/* Animated columns */}
            {[
              [
                "./hero/p1.png",
                "./hero/p2.png",
                "./hero/p1.png",
                "./hero/p2.png",
                "./hero/p1.png",
                "./hero/p2.png",
              ],
              [
                "./hero/p3.png",
                "./hero/p4.png",
                "./hero/p5.png",
                "./hero/p3.png",
                "./hero/p4.png",
                "./hero/p5.png",
                "./hero/p3.png",
                "./hero/p4.png",
                "./hero/p5.png",
              ],
              [
                "./hero/p6.png",
                "./hero/p7.png",
                "./hero/p2.png",
                "./hero/p6.png",
                "./hero/p7.png",
                "./hero/p2.png",
                "./hero/p6.png",
                "./hero/p7.png",
                "./hero/p2.png",
              ],
            ].map((images, colIdx) => (
              <div
                key={colIdx}
                className={`flex flex-col gap-y-6 ${colIdx === 0 ? "pt-6" : colIdx === 2 ? "pt-4" : ""}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  animation: `scrollY 4s linear infinite`,
                  animationDelay: `${colIdx * 1}s`,
                }}
              >
                {/* Duplicate images for seamless loop */}
                {[...images, ...images].map((src, idx) => (
                  <img src={src} alt={`person-${colIdx}-${idx}`} width={130} key={idx} draggable={false} />
                ))}
                {[...images, ...images].map((src, idx) => (
                  <img src={src} alt={`person-${colIdx}-${idx}`} width={130} key={idx} draggable={false} />
                ))}
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes scrollY {
              0% {
          transform: translateY(0);
              }
              100% {
          transform: translateY(-50%);
              }
            }
            /* Hide scrollbars just in case */
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Hero;
