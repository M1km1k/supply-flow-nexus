
import React from 'react';

export const LoginKeyframes: React.FC = () => {
  return (
    <style>{`
      @keyframes gradient-3d {
        0%, 100% {
          transform: translateZ(0) rotateZ(0deg);
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          filter: hue-rotate(0deg);
        }
        25% {
          transform: translateZ(10px) rotateZ(90deg);
          background: linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b);
          filter: hue-rotate(90deg);
        }
        50% {
          transform: translateZ(20px) rotateZ(180deg);
          background: linear-gradient(225deg, #ec4899, #f59e0b, #10b981);
          filter: hue-rotate(180deg);
        }
        75% {
          transform: translateZ(10px) rotateZ(270deg);
          background: linear-gradient(315deg, #f59e0b, #10b981, #3b82f6);
          filter: hue-rotate(270deg);
        }
      }
      
      @keyframes cube-float {
        0%, 100% { 
          transform: rotateX(45deg) rotateY(45deg) translateZ(0px) translateY(0px);
        }
        50% { 
          transform: rotateX(45deg) rotateY(45deg) translateZ(30px) translateY(-20px);
        }
      }
      
      @keyframes cube-bounce {
        0%, 100% { 
          transform: rotateX(30deg) rotateY(60deg) translateZ(0px) scale(1);
        }
        50% { 
          transform: rotateX(30deg) rotateY(60deg) translateZ(20px) scale(1.1);
        }
      }
      
      @keyframes cube-spin {
        0% { 
          transform: rotateX(60deg) rotateY(30deg) rotateZ(0deg);
        }
        100% { 
          transform: rotateX(60deg) rotateY(30deg) rotateZ(360deg);
        }
      }
      
      @keyframes pyramid-float {
        0%, 100% { 
          transform: rotateX(20deg) rotateY(45deg) translateZ(0px) translateY(0px);
        }
        33% { 
          transform: rotateX(20deg) rotateY(45deg) translateZ(15px) translateY(-10px);
        }
        66% { 
          transform: rotateX(20deg) rotateY(45deg) translateZ(25px) translateY(-15px);
        }
      }
      
      @keyframes pyramid-spin {
        0% { 
          transform: rotateX(45deg) rotateY(20deg) rotateZ(0deg);
        }
        100% { 
          transform: rotateX(45deg) rotateY(20deg) rotateZ(360deg);
        }
      }
      
      @keyframes diamond-rotate {
        0% { 
          transform: rotateX(30deg) rotateY(60deg) rotateZ(0deg);
        }
        100% { 
          transform: rotateX(30deg) rotateY(60deg) rotateZ(360deg);
        }
      }
      
      @keyframes diamond-float {
        0%, 100% { 
          transform: rotateX(60deg) rotateY(15deg) translateZ(0px);
        }
        50% { 
          transform: rotateX(60deg) rotateY(15deg) translateZ(20px);
        }
      }
      
      @keyframes particle-3d-0 {
        0%, 100% { 
          transform: translateZ(0px) translateX(0px) translateY(0px);
          opacity: 0.3;
        }
        50% { 
          transform: translateZ(50px) translateX(20px) translateY(-20px);
          opacity: 0.8;
        }
      }
      
      @keyframes particle-3d-1 {
        0%, 100% { 
          transform: translateZ(10px) translateX(10px) translateY(10px);
          opacity: 0.4;
        }
        50% { 
          transform: translateZ(40px) translateX(-15px) translateY(25px);
          opacity: 0.9;
        }
      }
      
      @keyframes particle-3d-2 {
        0%, 100% { 
          transform: translateZ(-10px) translateX(-10px) translateY(-10px);
          opacity: 0.2;
        }
        50% { 
          transform: translateZ(30px) translateX(25px) translateY(-15px);
          opacity: 0.7;
        }
      }
      
      @keyframes particle-3d-3 {
        0%, 100% { 
          transform: translateZ(5px) translateX(-5px) translateY(5px);
          opacity: 0.5;
        }
        50% { 
          transform: translateZ(45px) translateX(10px) translateY(30px);
          opacity: 1;
        }
      }
      
      @keyframes logo-3d {
        0%, 100% { 
          transform: rotateY(0deg) rotateX(0deg) translateZ(0px);
        }
        50% { 
          transform: rotateY(10deg) rotateX(5deg) translateZ(10px);
        }
      }
      
      @keyframes logo-glow {
        0%, 100% { 
          opacity: 0.2;
          transform: scale(1);
        }
        50% { 
          opacity: 0.4;
          transform: scale(1.05);
        }
      }
      
      @keyframes text-3d {
        0%, 100% { 
          transform: rotateX(0deg) translateZ(0px);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        50% { 
          transform: rotateX(2deg) translateZ(5px);
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
      }
      
      @keyframes fade-in-3d {
        0% {
          opacity: 0;
          transform: translateZ(-20px) translateY(10px);
        }
        100% {
          opacity: 0.9;
          transform: translateZ(0px) translateY(0px);
        }
      }
      
      @keyframes card-float {
        0%, 100% {
          transform: translateZ(0px) translateY(0px) rotateX(0deg) rotateY(0deg);
        }
        50% {
          transform: translateZ(15px) translateY(-5px) rotateX(2deg) rotateY(1deg);
        }
      }
      
      @keyframes card-hover {
        0%, 100% {
          transform: translateZ(15px) translateY(-5px) rotateX(2deg) rotateY(1deg);
        }
        50% {
          transform: translateZ(25px) translateY(-10px) rotateX(3deg) rotateY(2deg);
        }
      }
      
      @keyframes header-slide-in {
        0% {
          opacity: 0;
          transform: translateY(-20px) translateZ(-10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0px) translateZ(0px);
        }
      }
      
      @keyframes title-glow {
        0%, 100% {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        50% {
          text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
      
      @keyframes content-fade-in {
        0% {
          opacity: 0;
          transform: translateZ(-15px);
        }
        100% {
          opacity: 1;
          transform: translateZ(0px);
        }
      }
      
      @keyframes field-slide-up {
        0% {
          opacity: 0;
          transform: translateY(20px) translateZ(-10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0px) translateZ(0px);
        }
      }
      
      @keyframes input-focus {
        0% {
          transform: scale(1) translateZ(0px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        100% {
          transform: scale(1.02) translateZ(5px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }
      
      @keyframes icon-bounce {
        0%, 100% {
          transform: translateY(-50%) scale(1);
        }
        50% {
          transform: translateY(-50%) scale(1.1) translateZ(2px);
        }
      }
      
      @keyframes button-3d {
        0%, 100% {
          transform: translateZ(0px) rotateX(0deg);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        50% {
          transform: translateZ(8px) rotateX(2deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(59, 130, 246, 0.2);
        }
      }
    `}</style>
  );
};
