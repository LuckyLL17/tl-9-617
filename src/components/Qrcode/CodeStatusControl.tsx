import { useState } from 'react';
import { PauseCircle, PlayCircle, AlertTriangle, X, Lock, Unlock } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CodeStatusControl() {
  const { qrCodeFrozen, setQrCodeFrozen } = useStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'freeze' | 'unfreeze'>('freeze');

  const handleFreezeClick = () => {
    setConfirmAction('freeze');
    setShowConfirmDialog(true);
  };

  const handleUnfreezeClick = () => {
    setConfirmAction('unfreeze');
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setQrCodeFrozen(confirmAction === 'freeze');
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              qrCodeFrozen ? 'bg-red-50' : 'bg-insurance-green-50'
            }`}>
              {qrCodeFrozen ? (
                <Lock size={20} className="text-red-500" />
              ) : (
                <Unlock size={20} className="text-insurance-green-500" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                {qrCodeFrozen ? '二维码已暂停使用' : '二维码正常使用'}
              </h4>
              <p className="text-xs text-gray-400">
                {qrCodeFrozen ? '挂失期间无法使用医保码支付' : '可正常使用医保码进行支付'}
              </p>
            </div>
          </div>

          <button
            onClick={qrCodeFrozen ? handleUnfreezeClick : handleFreezeClick}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              qrCodeFrozen
                ? 'bg-insurance-green-50 text-insurance-green-600 hover:bg-insurance-green-100'
                : 'bg-red-50 text-red-500 hover:bg-red-100'
            }`}
          >
            {qrCodeFrozen ? (
              <>
                <PlayCircle size={16} />
                恢复使用
              </>
            ) : (
              <>
                <PauseCircle size={16} />
                暂停使用
              </>
            )}
          </button>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                confirmAction === 'freeze' ? 'bg-red-50' : 'bg-insurance-green-50'
              }`}>
                <AlertTriangle size={28} className={confirmAction === 'freeze' ? 'text-red-500' : 'text-insurance-green-500'} />
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {confirmAction === 'freeze' ? '确认暂停使用医保码？' : '确认恢复使用医保码？'}
            </h3>
            
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {confirmAction === 'freeze'
                ? '暂停后，医保码将无法用于支付结算，可有效防止账户被盗用。您可以随时恢复使用。'
                : '恢复后，医保码可正常用于支付结算，请确保您的账户安全。'
              }
            </p>

            {confirmAction === 'freeze' && (
              <div className="bg-orange-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-orange-600">
                  <span className="font-medium">温馨提示：</span>
                  如果您的手机丢失或怀疑账户被盗用，建议立即暂停使用医保码，并拨打医保服务热线 12393 进行挂失。
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-3 font-medium rounded-xl transition-colors ${
                  confirmAction === 'freeze'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-insurance-green-500 hover:bg-insurance-green-600 text-white'
                }`}
              >
                {confirmAction === 'freeze' ? '确认暂停' : '确认恢复'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
