import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScreenshotWarningProps {
  isVisible: boolean;
  onDismiss: () => void;
  className?: string;
}

export default function ScreenshotWarning({
  isVisible,
  onDismiss,
  className,
}: ScreenshotWarningProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50 animate-bounce',
        className
      )}
    >
      <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-red-700 mb-1">安全警告</h4>
            <p className="text-sm text-red-600">
              检测到截图操作！医保二维码包含您的个人信息，请勿截图或分享给他人，以防账户被盗用。如遇问题请拨打 12393。
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1.5 -mr-1 -mt-1 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
