
import React, { ComponentType, lazy, Suspense } from 'react';

// ✅ Lazy load a component with proper TypeScript typing
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> => {
  return lazy(importFn);
};

// ✅ Wrap component with Suspense and custom fallback
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

// ✅ Debounce utility for performance optimization
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

// ✅ Throttle utility for performance optimization
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

// ✅ Enhanced lazy loading with Suspense and optional error fallback
export const createLazyComponentWithErrorBoundary = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
  errorFallback?: React.ReactNode // Not used yet, placeholder for enhancement
): React.FC<React.ComponentProps<T>> => {
  const LazyComponent = lazy(importFn);

  const Wrapped = (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback ?? <div className="animate-pulse bg-gray-200 rounded h-32" />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return Wrapped;
};

// ✅ Memoized lazy component creation to avoid re-creation on each render
export const memoizedLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.FC<React.ComponentProps<T>> => {
  const LazyComponent = React.memo(lazy(importFn) as T);

  const Wrapped = (props: React.ComponentProps<T>) => <LazyComponent {...props} />;
  return Wrapped;
};

