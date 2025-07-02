
import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="relative mt-16 h-32 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-neon rounded-full opacity-30"
            style={{
              left: `${15 + i * 15}%`,
              animation: `float 4s ease-in-out infinite ${i * 0.5}s, fade-in 2s ease-out ${i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated Text */}
      <div className="text-center pt-8">
        <p className="text-lg text-gray-300 animate-pulse">
          Building amazing web experiences with cutting-edge technologies
        </p>
      </div>
    </div>
  );
};

export default FloatingElements;
