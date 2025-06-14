
import React from 'react';
import { LoginSpeedController } from './styles/LoginSpeedController';
import { Login3DUtils } from './styles/Login3DUtils';
import { LoginKeyframes } from './styles/LoginKeyframes';
import { LoginAnimations } from './styles/LoginAnimations';

export const LoginStyles: React.FC = () => {
  return (
    <>
      <LoginSpeedController />
      <Login3DUtils />
      <LoginKeyframes />
      <LoginAnimations />
    </>
  );
};
