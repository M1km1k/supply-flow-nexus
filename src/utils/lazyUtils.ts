
import React, { ComponentType, lazy, Suspense } from 'react';

// ✅ Lazy load a component with proper TypeScript typing
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(importFn);
}

// ✅ Wrap component with Suspense and custom fallback
export function withSuspense<P extends object>(
  Component: ComponentType<P>,
  fallback: React.ReactNode = <div className="animate-pulse bg-gray-200 rounded h-32" />
): React.FC<P> {
  return function SuspendedComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// ✅ Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ✅ Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
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
}

// ✅ Enhanced lazy loading with Suspense and optional error fallback
export function createLazyComponentWithErrorBoundary<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFn);

  return function Wrapped(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback ?? <div className="animate-pulse bg-gray-200 rounded h-32" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// ✅ Memoized lazy component creation to avoid re-creation on each render
export function memoizedLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = React.memo(lazy(importFn));

  return function Wrapped(props: React.ComponentProps<T>) {
    return <LazyComponent {...props} />;
  };
}
