
import React from 'react';

export const LoginStyles: React.FC = () => {
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
      
      .animate-gradient-3d {
        animation: gradient-3d 15s ease-in-out infinite;
        background-size: 400% 400%;
      }
      
      .animate-cube-float {
        animation: cube-float 8s ease-in-out infinite;
      }
      
      .animate-cube-bounce {
        animation: cube-bounce 6s ease-in-out infinite;
      }
      
      .animate-cube-spin {
        animation: cube-spin 12s linear infinite;
      }
      
      .animate-pyramid-float {
        animation: pyramid-float 10s ease-in-out infinite;
      }
      
      .animate-pyramid-spin {
        animation: pyramid-spin 8s linear infinite;
      }
      
      .animate-diamond-rotate {
        animation: diamond-rotate 6s linear infinite;
      }
      
      .animate-diamond-float {
        animation: diamond-float 7s ease-in-out infinite;
      }
      
      .animate-particle-3d-0 {
        animation: particle-3d-0 12s ease-in-out infinite;
      }
      
      .animate-particle-3d-1 {
        animation: particle-3d-1 10s ease-in-out infinite;
      }
      
      .animate-particle-3d-2 {
        animation: particle-3d-2 14s ease-in-out infinite;
      }
      
      .animate-particle-3d-3 {
        animation: particle-3d-3 11s ease-in-out infinite;
      }
      
      .animate-logo-3d {
        animation: logo-3d 4s ease-in-out infinite;
      }
      
      .animate-logo-glow {
        animation: logo-glow 3s ease-in-out infinite;
      }
      
      .animate-text-3d {
        animation: text-3d 5s ease-in-out infinite;
      }
      
      .animate-fade-in-3d {
        animation: fade-in-3d 2s ease-out;
      }
    `}</style>
  );
};
