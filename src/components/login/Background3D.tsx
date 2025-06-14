
import React from 'react';

export const Background3D: React.FC = () => {
  return (
    <>
      {/* 3D Animated gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-3d transform-gpu"></div>
      
      {/* 3D Floating geometric shapes with depth */}
      <div className="absolute inset-0 transform-style-preserve-3d">
        {/* Large 3D cubes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 animate-cube-float transform-gpu rotate-x-45 rotate-y-45 shadow-2xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/20 animate-cube-bounce delay-300 transform-gpu rotate-x-30 rotate-y-60 shadow-xl"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-purple-300/15 animate-cube-spin delay-700 transform-gpu rotate-x-60 rotate-y-30 shadow-2xl"></div>
        
        {/* Medium 3D pyramids */}
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300/15 animate-pyramid-float delay-1000 transform-gpu rotate-x-20 rotate-y-45 shadow-xl"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-yellow-300/20 animate-pyramid-spin delay-500 transform-gpu rotate-x-45 rotate-y-20 shadow-lg"></div>
        
        {/* Small 3D diamonds */}
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-indigo-300/15 animate-diamond-rotate delay-200 transform-gpu rotate-x-30 rotate-y-60 shadow-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-green-300/20 animate-diamond-float delay-800 transform-gpu rotate-x-60 rotate-y-15 shadow-md"></div>
      </div>

      {/* 3D Particle field */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/30 rounded-full animate-particle-3d-${i % 4} shadow-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translateZ(${Math.random() * 100 - 50}px)`,
            }}
          />
        ))}
      </div>

      {/* Enhanced overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
    </>
  );
};
