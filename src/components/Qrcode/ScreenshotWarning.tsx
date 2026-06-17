import { AlertTriangle, X, Shield } from 'lucide-react';

interface ScreenshotWarningProps {
  visible: boolean;
  onClose: () => void;
}

export default function ScreenshotWarning({ visible, onClose }: ScreenshotWarningProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">检测到截图操作</h3>
        
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          医保电子凭证包含您的个人敏感信息，请勿将二维码截图或分享给他人，
          以防账户被盗用造成财产损失。
        </p>

        <div className="bg-insurance-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-insurance-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">安全建议</h4>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• 每次使用后及时关闭二维码页面</li>
                <li>• 不要在公共场合展示二维码</li>
                <li>• 如发现异常请立即拨打 12393</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-insurance-blue-500 hover:bg-insurance-blue-600 text-white font-medium rounded-xl transition-colors"
        >
          我知道了
        </button>
      </div>
    </div>
  );
}
