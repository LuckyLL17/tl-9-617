import { useState, useEffect, useCallback } from 'react';

interface ScreenshotDetectionResult {
  isScreenshotDetected: boolean;
  dismissAlert: () => void;
}

export function useScreenshotDetection(): ScreenshotDetectionResult {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      setIsScreenshotDetected(true);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'PrintScreen') {
      setIsScreenshotDetected(true);
      navigator.clipboard.writeText('').catch(() => {});
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
      setIsScreenshotDetected(true);
    }
  }, []);

  const dismissAlert = useCallback(() => {
    setIsScreenshotDetected(false);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleVisibilityChange, handleKeyDown]);

  return { isScreenshotDetected, dismissAlert };
}
