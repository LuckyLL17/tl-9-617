import { useState, useEffect, useCallback } from 'react';

interface UseScreenshotDetectionOptions {
  enabled?: boolean;
  onScreenshot?: () => void;
}

export function useScreenshotDetection({
  enabled = true,
  onScreenshot,
}: UseScreenshotDetectionOptions = {}) {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false);
  const [screenshotCount, setScreenshotCount] = useState(0);

  const handleScreenshot = useCallback(() => {
    if (!enabled) return;
    setIsScreenshotDetected(true);
    setScreenshotCount((prev) => prev + 1);
    onScreenshot?.();
  }, [enabled, onScreenshot]);

  const resetScreenshotState = useCallback(() => {
    setIsScreenshotDetected(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const metaKey = isMac ? e.metaKey : e.ctrlKey;

      if (
        (metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
        e.key === 'PrintScreen' ||
        e.key === 'PrtScr'
      ) {
        handleScreenshot();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleScreenshot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, handleScreenshot]);

  return {
    isScreenshotDetected,
    screenshotCount,
    resetScreenshotState,
  };
}
