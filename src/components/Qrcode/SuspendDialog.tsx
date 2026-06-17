import { useState } from 'react';
import { X, AlertTriangle, PauseCircle, Ban, PlayCircle, Phone } from 'lucide-react';
import type { QrCodeStatus } from '@/types';
import { getQrStatusText } from '@/utils/format';
import { cn } from '@/lib/utils';

interface SuspendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: QrCodeStatus;
  onConfirm: (status: QrCodeStatus, reason?: string) => void;
}

type ActionType = 'suspend' | 'lost' | 'activate' | null;

const suspendReasons = [
  { id: 'temp', label: '临时不使用' },
  { id: 'security', label: '安全顾虑' },
  { id: 'other', label: '其他原因' },
];

const lostReasons = [
  { id: 'lost_phone', label: '手机丢失' },
  { id: 'stolen', label: '手机被盗' },
  { id: 'suspected_fraud', label: '怀疑被盗刷' },
];

export default function SuspendDialog({
  isOpen,
  onClose,
  currentStatus,
  onConfirm,
}: SuspendDialogProps) {
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [step, setStep] = useState<'action' | 'reason' | 'confirm'>('action');

  const resetState = () => {
    setSelectedAction(null);
    setSelectedReason('');
    setStep('action');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleActionSelect = (action: ActionType) => {
    setSelectedAction(action);
    if (action === 'activate') {
      setStep('confirm');
    } else {
      setStep('reason');
    }
  };

  const handleReasonSelect = (reasonId: string) => {
    setSelectedReason(reasonId);
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (!selectedAction) return;

    const statusMap: Record<string, QrCodeStatus> = {
      suspend: 'suspended',
      lost: 'lost',
      activate: 'active',
    };

    const reason = selectedReason
      ? [...suspendReasons, ...lostReasons].find((r) => r.id === selectedReason)?.label
      : undefined;

    onConfirm(statusMap[selectedAction], reason);
    handleClose();
  };

  const handleBack = () => {
    if (step === 'reason') {
      setStep('action');
      setSelectedReason('');
    } else if (step === 'confirm') {
      if (selectedAction === 'activate') {
        setStep('action');
      } else {
        setStep('reason');
      }
    }
  };

  if (!isOpen) return null;

  const renderActionStep = () => (
    <div className="space-y-4">
      <p className="text-gray-500 text-sm">选择您要执行的操作</p>
      <div className="space-y-3">
        {currentStatus === 'active' && (
          <>
            <button
              onClick={() => handleActionSelect('suspend')}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-insurance-blue-300 hover:bg-insurance-blue-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-insurance-orange-100 flex items-center justify-center flex-shrink-0">
                <PauseCircle size={24} className="text-insurance-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">暂停使用</h4>
                <p className="text-sm text-gray-500">临时暂停二维码使用，可随时恢复</p>
              </div>
            </button>
            <button
              onClick={() => handleActionSelect('lost')}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <Ban size={24} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">挂失冻结</h4>
                <p className="text-sm text-gray-500">手机丢失或怀疑被盗刷，立即冻结二维码</p>
              </div>
            </button>
          </>
        )}
        {(currentStatus === 'suspended' || currentStatus === 'lost') && (
          <button
            onClick={() => handleActionSelect('activate')}
            className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-insurance-green-300 hover:bg-insurance-green-50 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-insurance-green-100 flex items-center justify-center flex-shrink-0">
              <PlayCircle size={24} className="text-insurance-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">恢复使用</h4>
              <p className="text-sm text-gray-500">
                当前状态：{getQrStatusText(currentStatus)}，点击恢复正常使用
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );

  const renderReasonStep = () => {
    const reasons = selectedAction === 'suspend' ? suspendReasons : lostReasons;
    const title = selectedAction === 'suspend' ? '选择暂停原因' : '选择挂失原因';

    return (
      <div className="space-y-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <div className="space-y-3">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => handleReasonSelect(reason.id)}
              className={cn(
                'w-full flex items-center gap-3 p-4 border rounded-xl transition-all text-left',
                selectedReason === reason.id
                  ? 'border-insurance-blue-500 bg-insurance-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  selectedReason === reason.id
                    ? 'border-insurance-blue-500'
                    : 'border-gray-300'
                )}
              >
                {selectedReason === reason.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-insurance-blue-500" />
                )}
              </div>
              <span className="text-gray-900">{reason.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderConfirmStep = () => {
    const getConfirmInfo = () => {
      switch (selectedAction) {
        case 'suspend':
          return {
            title: '确认暂停使用？',
            desc: '暂停后，医保二维码将无法使用，您可以随时恢复。',
            iconColor: 'bg-insurance-orange-100',
            iconTextColor: 'text-insurance-orange-500',
            buttonText: '确认暂停',
            buttonColor: 'bg-insurance-orange-500 hover:bg-insurance-orange-600',
          };
        case 'lost':
          return {
            title: '确认挂失冻结？',
            desc: '挂失后，医保二维码将立即冻结，无法进行任何支付操作。请及时联系医保服务热线 12393。',
            iconColor: 'bg-red-100',
            iconTextColor: 'text-red-500',
            buttonText: '确认挂失',
            buttonColor: 'bg-red-500 hover:bg-red-600',
          };
        case 'activate':
          return {
            title: '确认恢复使用？',
            desc: '恢复后，医保二维码将可以正常使用。',
            iconColor: 'bg-insurance-green-100',
            iconTextColor: 'text-insurance-green-500',
            buttonText: '确认恢复',
            buttonColor: 'bg-insurance-green-500 hover:bg-insurance-green-600',
          };
        default:
          return {
            title: '',
            desc: '',
            iconColor: '',
            iconTextColor: '',
            buttonText: '',
            buttonColor: '',
          };
      }
    };

    const info = getConfirmInfo();

    return (
      <div className="space-y-5">
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center mb-4',
              info.iconColor
            )}
          >
            <AlertTriangle size={32} className={info.iconTextColor} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
          <p className="text-sm text-gray-500">{info.desc}</p>
        </div>

        {selectedAction === 'lost' && (
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700 text-sm">紧急联系</p>
                <p className="text-red-600 text-xs mt-1">
                  如遇紧急情况，请立即拨打医保服务热线 12393
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            返回
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors',
              info.buttonColor
            )}
          >
            {info.buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full sm:max-w-md bg-white sm:rounded-2xl rounded-t-3xl max-h-[85vh] overflow-hidden">
        <div className="sticky top-0 bg-white z-10 px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 'action' && '二维码管理'}
            {step === 'reason' && (selectedAction === 'suspend' ? '暂停使用' : '挂失冻结')}
            {step === 'confirm' && '确认操作'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-5 overflow-y-auto">
          {step === 'action' && renderActionStep()}
          {step === 'reason' && renderReasonStep()}
          {step === 'confirm' && renderConfirmStep()}
        </div>

        {step === 'reason' && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
            <button
              onClick={handleBack}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              返回
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
