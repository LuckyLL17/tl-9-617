import { useState } from 'react';
import { Pause, Play, AlertTriangle, Shield, ShieldOff, Clock, X, CheckCircle } from 'lucide-react';
import type { QrCodeStatus } from '@/types';
import { formatDate } from '@/utils/format';

interface QrCodeStatusControlProps {
  status: QrCodeStatus;
  suspendTime?: string;
  suspendReason?: string;
  onSuspend: (reason: string) => void;
  onActivate: () => void;
  onReportLost: () => void;
}

type ActionType = 'suspend' | 'activate' | 'lost' | null;

const getStatusText = (status: QrCodeStatus): string => {
  const statusMap: Record<QrCodeStatus, string> = {
    active: '正常使用',
    suspended: '已暂停',
    lost: '已挂失',
  };
  return statusMap[status];
};

const getStatusColor = (status: QrCodeStatus): string => {
  const colorMap: Record<QrCodeStatus, string> = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-yellow-100 text-yellow-700',
    lost: 'bg-red-100 text-red-700',
  };
  return colorMap[status];
};

const suspendReasons = [
  '暂时不需要使用',
  '担心账号安全',
  '设备丢失',
  '其他原因',
];

export default function QrCodeStatusControl({
  status,
  suspendTime,
  suspendReason,
  onSuspend,
  onActivate,
  onReportLost,
}: QrCodeStatusControlProps) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [confirmStep, setConfirmStep] = useState(false);

  const openModal = (action: ActionType) => {
    setActionType(action);
    setConfirmStep(false);
    setSelectedReason('');
    setCustomReason('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActionType(null);
    setConfirmStep(false);
    setSelectedReason('');
    setCustomReason('');
  };

  const handleConfirm = () => {
    if (actionType === 'suspend') {
      const reason = selectedReason === '其他原因' ? customReason : selectedReason;
      onSuspend(reason || '暂停使用');
    } else if (actionType === 'lost') {
      onReportLost();
    } else if (actionType === 'activate') {
      onActivate();
    }
    closeModal();
  };

  const handleNextStep = () => {
    if (actionType === 'suspend' && !selectedReason) return;
    if (actionType === 'suspend' && selectedReason === '其他原因' && !customReason.trim()) return;
    setConfirmStep(true);
  };

  const canProceed = () => {
    if (actionType === 'suspend') {
      if (!selectedReason) return false;
      if (selectedReason === '其他原因' && !customReason.trim()) return false;
    }
    return true;
  };

  const renderModalContent = () => {
    if (!confirmStep) {
      if (actionType === 'suspend') {
        return (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">请选择暂停使用的原因：</p>
            <div className="space-y-2">
              {suspendReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedReason === reason
                      ? 'border-insurance-blue-500 bg-insurance-blue-50 text-insurance-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
            {selectedReason === '其他原因' && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="请输入具体原因..."
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-insurance-blue-500 resize-none"
                rows={3}
              />
            )}
          </div>
        );
      }

      if (actionType === 'lost') {
        return (
          <div className="space-y-4">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 mb-1">挂失注意事项</h4>
                  <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                    <li>挂失后二维码将立即冻结，无法使用</li>
                    <li>请及时联系医保服务热线 12393</li>
                    <li>找回后可随时解除挂失</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              确认要挂失医保电子凭证吗？挂失后所有刷码功能将被冻结。
            </p>
          </div>
        );
      }

      if (actionType === 'activate') {
        return (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-700 mb-1">恢复使用</h4>
                  <p className="text-sm text-green-600">
                    恢复后医保电子凭证将可以正常使用，请确保您的账号安全。
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              确认要恢复医保电子凭证的使用吗？
            </p>
          </div>
        );
      }
    }

    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-2">操作确认</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">操作类型</span>
              <span className="text-gray-900 font-medium">
                {actionType === 'suspend' && '暂停使用'}
                {actionType === 'lost' && '挂失冻结'}
                {actionType === 'activate' && '恢复使用'}
              </span>
            </div>
            {actionType === 'suspend' && (
              <div className="flex justify-between">
                <span className="text-gray-500">暂停原因</span>
                <span className="text-gray-900">
                  {selectedReason === '其他原因' ? customReason : selectedReason}
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-sm text-center">
          请确认以上信息，确认后将立即生效。
        </p>
      </div>
    );
  };

  const getModalTitle = () => {
    if (actionType === 'suspend') return confirmStep ? '确认暂停' : '暂停使用';
    if (actionType === 'lost') return confirmStep ? '确认挂失' : '挂失冻结';
    if (actionType === 'activate') return confirmStep ? '确认恢复' : '恢复使用';
    return '';
  };

  return (
    <>
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              status === 'active' ? 'bg-green-100 text-green-600' :
              status === 'suspended' ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}>
              {status === 'active' ? <Shield size={20} /> : <ShieldOff size={20} />}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">二维码状态</h4>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            </div>
          </div>
        </div>

        {status !== 'active' && suspendTime && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={14} />
              <span>
                {status === 'suspended' ? '暂停时间' : '挂失时间'}：
                {formatDate(suspendTime)}
              </span>
            </div>
            {suspendReason && (
              <p className="text-sm text-gray-500 mt-1 ml-6">
                原因：{suspendReason}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {status === 'active' ? (
            <>
              <button
                onClick={() => openModal('suspend')}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Pause size={16} />
                暂停使用
              </button>
              <button
                onClick={() => openModal('lost')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle size={16} />
                挂失冻结
              </button>
            </>
          ) : (
            <button
              onClick={() => openModal('activate')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-insurance-blue-500 text-white hover:bg-insurance-blue-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} />
              恢复使用
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{getModalTitle()}</h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              {renderModalContent()}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3">
              {!confirmStep ? (
                <>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceed()}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      canProceed()
                        ? 'bg-insurance-blue-500 text-white hover:bg-insurance-blue-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    下一步
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setConfirmStep(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    上一步
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      actionType === 'lost'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-insurance-blue-500 text-white hover:bg-insurance-blue-600'
                    }`}
                  >
                    确认
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
