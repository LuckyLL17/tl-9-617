import { useState, useEffect, useCallback } from 'react';

interface UseScreenshotDetectionOptions {
  onScreenshot?: () => void;
  enabled?: boolean;
}

export function useScreenshotDetection({
  onScreenshot,
  enabled = true,
}: UseScreenshotDetectionOptions = {}) {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleScreenshot = useCallback(() => {
    if (!enabled) return;
    setIsScreenshotDetected(true);
    setShowWarning(true);
    onScreenshot?.();
    setTimeout(() => {
      setIsScreenshotDetected(false);
    }, 3000);
  }, [enabled, onScreenshot]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
      const isMacScreenshot =
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
        (e.metaKey && e.shiftKey && (e.code === 'Digit3' || e.code === 'Digit4' || e.code === 'Digit5'));
      const isWindowsSnippingTool =
        (e.metaKey && e.shiftKey && e.key === 'S') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S');

      if (isPrintScreen || isMacScreenshot || isWindowsSnippingTool) {
        handleScreenshot();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const lastInteraction = Date.now();
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            const duration = Date.now() - lastInteraction;
            if (duration > 500 && duration < 10000) {
              handleScreenshot();
            }
          }
        }, 100);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'CANVAS' || target.tagName === 'IMG') {
        handleScreenshot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [enabled, handleScreenshot]);

  return {
    isScreenshotDetected,
    showWarning,
    dismissWarning,
  };
}
