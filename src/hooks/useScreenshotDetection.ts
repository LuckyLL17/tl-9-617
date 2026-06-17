import { useState, useEffect, useCallback } from 'react';

export function useScreenshotDetection() {
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  const handleScreenshot = useCallback(() => {
    setScreenshotDetected(true);
  }, []);

  const dismissWarning = useCallback(() => {
    setScreenshotDetected(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isScreenshotShortcut = 
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
        (e.ctrlKey && e.key === 'PrintScreen') ||
        e.key === 'PrintScreen';
      
      if (isScreenshotShortcut) {
        handleScreenshot();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const lastActiveTime = Date.now();
        const checkReturn = () => {
          if (document.visibilityState === 'visible') {
            const awayTime = Date.now() - lastActiveTime;
            if (awayTime > 500 && awayTime < 5000) {
              handleScreenshot();
            }
          }
          document.removeEventListener('visibilitychange', checkReturn);
        };
        document.addEventListener('visibilitychange', checkReturn);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleScreenshot]);

  return {
    screenshotDetected,
    dismissWarning,
  };
}
