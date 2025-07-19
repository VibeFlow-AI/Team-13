import React from "react";
import Header from "../components/common/header";
// import Hero from "../components/home/Hero";
// import FeaturesSection from "../components/home/FeaturesSection";
// import PersonalizedLearning from "../components/home/PersonalizedLearning";
// import SessionHighlights from "../components/home/SessionHighlights";

const HomePage = () => {
  return (
    <div className="flex flex-col items-stretch overflow-hidden bg-[rgba(244,244,244,1)]">
      <div className="flex w-full flex-col items-stretch px-[77px] max-md:max-w-full max-md:px-5">
        <Header />

        {/* <main>
          <Hero />

          <div className="flex w-[837px] shrink-0 max-w-full h-[125px] mt-[54px] max-md:mt-10" />
        </main> */}
      </div>

      <div className="z-10 mt-[-7px] w-full max-w-[1351px] self-center max-md:max-w-full">
        {/* <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <PersonalizedLearning />

          <div className="w-[61%] ml-5 max-md:w-full max-md:ml-0">
            <FeaturesSection />
            <SessionHighlights />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
