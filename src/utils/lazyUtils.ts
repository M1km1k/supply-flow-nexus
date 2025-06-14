
import React, { ComponentType, lazy, Suspense } from 'react';

// Create a lazy component with proper TypeScript typing
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  return lazy(importFn);
};

// Wrap component with Suspense and custom fallback
export const withSuspense = <P extends object>(
  Component: ComponentType<P>,
  fallback: React.ReactNode = <div className="animate-pulse bg-gray-200 rounded h-32" />
) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Enhanced lazy loading with error boundary
export const createLazyComponentWithErrorBoundary = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFn);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback ?? <div className="animate-pulse bg-gray-200 rounded h-32" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Updated: memoizedLazyComponent — define once, return wrapper
export const memoizedLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  const LazyComponent = React.memo(lazy(importFn));
  // Return a wrapper to preserve referential integrity
  return (props: React.ComponentProps<T>) => <LazyComponent {...props} />;
};

// Updated: createLazyComponentWithErrorBoundary — define LazyComponent once
export const createLazyComponentWithErrorBoundary = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode // Optional, not yet used
) => {
  const LazyComponent = lazy(importFn);

  // You could enhance with real error boundary if desired
  const Wrapped = (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback ?? <div className="animate-pulse bg-gray-200 rounded h-32" />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return Wrapped;
};
