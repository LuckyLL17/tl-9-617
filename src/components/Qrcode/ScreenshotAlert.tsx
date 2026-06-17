import { AlertTriangle, X } from 'lucide-react';

interface ScreenshotAlertProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function ScreenshotAlert({ visible, onDismiss }: ScreenshotAlertProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-bounce-in">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">检测到截图行为</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          为保障您的医保账户安全，请勿截图或保存医保码。截图可能导致个人信息泄露，如非本人操作请立即联系医保服务热线 12393。
        </p>
        <button
          onClick={onDismiss}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors active:scale-95"
        >
          我已知晓
        </button>
      </div>
    </div>
  );
}
