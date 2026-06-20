// components/LuxurySection.tsx

import React from "react";

type LuxurySectionProps = {
  title: string;
  subtitle?: string;
  image: string;
  reverse?: boolean;
  children: React.ReactNode;
};

export default function LuxurySection({
  title,
  subtitle,
  image,
  reverse = false,
  children,
}: LuxurySectionProps) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-10 py-16 px-6 md:px-20`}
    >
      {/* Image */}
      <div className="md:w-1/2 w-full overflow-hidden rounded-3xl shadow-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] md:h-[450px] object-cover transform hover:scale-105 transition duration-700"
        />
      </div>

      {/* Text */}
      <div className="md:w-1/2 w-full">
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-800">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 text-gray-500 italic">{subtitle}</p>
        )}

        <div className="mt-6 text-gray-600 leading-relaxed">
          {children}
        </div>

        <button className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Explore More
        </button>
      </div>
    </div>
  );
}