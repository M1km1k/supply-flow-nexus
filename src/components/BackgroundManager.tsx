
import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { ParticleBackground } from './ParticleBackground';
import { FloatingParticles } from './FloatingParticles';
import { GeometricShapes } from './GeometricShapes';
import { WavePattern } from './WavePattern';

interface BackgroundManagerProps {
  style: string;
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({ style }) => {
  switch (style) {
    case 'gradient':
      return <AnimatedBackground />;
    case 'particles':
      return <ParticleBackground />;
    case 'floating':
      return <FloatingParticles />;
    case 'geometric':
      return <GeometricShapes />;
    case 'waves':
      return <WavePattern />;
    case 'none':
      return null;
    default:
      return <AnimatedBackground />;
  }
};
