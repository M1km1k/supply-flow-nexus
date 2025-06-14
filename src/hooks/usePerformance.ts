
import { useEffect, useCallback } from 'react';

export const usePerformance = () => {
  const logPerformance = useCallback((label: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 100) { // Log slow operations
      console.warn(`Performance: ${label} took ${duration.toFixed(2)}ms`);
    }
  }, []);

  const measureRender = useCallback((componentName: string) => {
    const startTime = performance.now();
    
    return () => {
      logPerformance(`${componentName} render`, startTime);
    };
  }, [logPerformance]);

  // Monitor memory usage
  useEffect(() => {
    const interval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('Memory usage is high:', {
            used: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB',
            limit: (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + 'MB'
          });
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { measureRender, logPerformance };
};
