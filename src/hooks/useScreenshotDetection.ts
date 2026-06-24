import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScreenshotDetectionOptions {
  onScreenshot?: () => void;
  enabled?: boolean;
  warningDuration?: number;
}

export function useScreenshotDetection({
  onScreenshot,
  enabled = true,
  warningDuration = 5000,
}: UseScreenshotDetectionOptions = {}) {
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const lastHideTimeRef = useRef<number>(0);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearWarningTimer = useCallback(() => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  }, []);

  const handleScreenshot = useCallback(() => {
    if (!enabled) return;
    setIsScreenshotDetected(true);
    setShowWarning(true);
    setDetectionCount((prev) => prev + 1);
    onScreenshot?.();
    clearWarningTimer();
    warningTimerRef.current = setTimeout(() => {
      setIsScreenshotDetected(false);
    }, 3000);
  }, [enabled, onScreenshot, clearWarningTimer]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    clearWarningTimer();
  }, [clearWarningTimer]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
      const isMacScreenshot =
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
        (e.metaKey && e.shiftKey && (e.code === 'Digit3' || e.code === 'Digit4' || e.code === 'Digit5'));
      const isWindowsSnippingTool =
        (e.metaKey && e.shiftKey && e.key === 'S') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        (e.ctrlKey && e.shiftKey && e.code === 'KeyS');
      const isMacPreview =
        (e.metaKey && e.shiftKey && e.key === '4') ||
        (e.metaKey && e.shiftKey && e.code === 'Digit4');
      const isAltPrintScreen = e.altKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen');
      const isCtrlPrintScreen = e.ctrlKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen');

      if (
        isPrintScreen ||
        isMacScreenshot ||
        isWindowsSnippingTool ||
        isMacPreview ||
        isAltPrintScreen ||
        isCtrlPrintScreen
      ) {
        handleScreenshot();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        lastHideTimeRef.current = Date.now();
      } else if (document.visibilityState === 'visible') {
        const hiddenDuration = Date.now() - lastHideTimeRef.current;
        if (hiddenDuration > 300 && hiddenDuration < 15000) {
          handleScreenshot();
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isQrElement =
        target.tagName === 'CANVAS' ||
        target.tagName === 'IMG' ||
        target.closest('[data-qr-code]') !== null;
      if (isQrElement) {
        e.preventDefault();
        handleScreenshot();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      const isQrElement =
        target.tagName === 'CANVAS' ||
        target.tagName === 'IMG' ||
        target.closest('[data-qr-code]') !== null;
      if (isQrElement) {
        e.preventDefault();
        handleScreenshot();
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      const selectedText = selection?.toString() || '';
      if (selectedText.length === 0) {
        const target = e.target as HTMLElement;
        const isQrElement =
          target.tagName === 'CANVAS' ||
          target.tagName === 'IMG' ||
          target.closest('[data-qr-code]') !== null;
        if (isQrElement) {
          handleScreenshot();
        }
      }
    };

    const handleBeforePrint = () => {
      handleScreenshot();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    window.addEventListener('beforeprint', handleBeforePrint);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      window.removeEventListener('beforeprint', handleBeforePrint);
      clearWarningTimer();
    };
  }, [enabled, handleScreenshot, clearWarningTimer]);

  useEffect(() => {
    if (showWarning && warningDuration > 0) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, warningDuration);
      return () => clearTimeout(timer);
    }
  }, [showWarning, warningDuration]);

  return {
    isScreenshotDetected,
    showWarning,
    dismissWarning,
    detectionCount,
  };
}
