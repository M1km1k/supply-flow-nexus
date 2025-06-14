
import React from 'react';

export const Login3DUtils: React.FC = () => {
  return (
    <style>{`
      .perspective-1000 {
        perspective: 1000px;
      }
      
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      
      .transform-gpu {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      .rotate-x-45 { transform: rotateX(45deg); }
      .rotate-y-45 { transform: rotateY(45deg); }
      .rotate-x-30 { transform: rotateX(30deg); }
      .rotate-y-60 { transform: rotateY(60deg); }
      .rotate-x-60 { transform: rotateX(60deg); }
      .rotate-y-30 { transform: rotateY(30deg); }
      .rotate-x-20 { transform: rotateX(20deg); }
      .rotate-y-20 { transform: rotateY(20deg); }
      .rotate-y-15 { transform: rotateY(15deg); }
      .hover\\:rotate-y-2:hover { transform: rotateY(2deg); }
      
      .shadow-3d {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
      }
      
      .shadow-4xl {
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.15);
      }
    `}</style>
  );
};
