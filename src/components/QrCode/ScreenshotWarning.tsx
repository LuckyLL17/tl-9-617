import { useEffect } from 'react';
import { AlertTriangle, X, Shield } from 'lucide-react';

interface ScreenshotWarningProps {
  visible: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
}

export default function ScreenshotWarning({
  visible,
  onClose,
  autoCloseDelay = 3000,
}: ScreenshotWarningProps) {
  useEffect(() => {
    if (visible && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [visible, autoCloseDelay, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden animate-pulse">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">安全提醒</h3>
          <p className="text-white/80 text-sm">检测到您正在截图</p>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <Shield size={16} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">请勿截图分享</h4>
                <p className="text-gray-500 text-xs mt-0.5">
                  医保电子凭证包含您的个人信息，请勿截图分享给他人
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={16} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">注意资金安全</h4>
                <p className="text-gray-500 text-xs mt-0.5">
                  如发现异常，请立即联系医保服务热线 12393
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-insurance-blue-500 text-white hover:bg-insurance-blue-600 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <X size={18} />
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
