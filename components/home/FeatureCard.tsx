import React from 'react';

interface FeatureCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <article className="flex flex-col relative aspect-[0.41] grow text-[32px] text-black font-medium tracking-[-1.92px] leading-9 pt-[202px] rounded-[30px] max-md:mt-[17px] max-md:pt-[100px]">
      <img
        src={imageSrc}
        className="absolute h-full w-full object-cover inset-0"
        alt={imageAlt}
      />
      <div className="relative pt-[263px] pb-[71px] px-7 rounded-[0px_0px_30px_30px] max-md:pt-[100px] max-md:px-5">
        <h3 className="text-[32px] font-medium leading-9 tracking-[-1.92px]">
          {title}
        </h3>
        {description && (
          <p className="text-2xl font-light leading-[27px] tracking-[-1.44px] mt-[26px] max-md:max-w-full">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default FeatureCard;