import { Pause, Play, AlertTriangle } from 'lucide-react';

interface PauseControlProps {
  isPaused: boolean;
  onTogglePause: () => void;
}

export default function PauseControl({ isPaused, onTogglePause }: PauseControlProps) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isPaused ? 'bg-red-50' : 'bg-insurance-blue-50'
          }`}>
            {isPaused ? (
              <AlertTriangle size={20} className="text-red-500" />
            ) : (
              <Pause size={20} className="text-insurance-blue-500" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {isPaused ? '医保码已暂停使用' : '暂停使用'}
            </h4>
            <p className="text-sm text-gray-500 mt-0.5">
              {isPaused
                ? '您的医保码已冻结，无法进行刷码支付。如需恢复使用，请点击下方按钮。'
                : '挂失或暂停使用后，医保码将被冻结，无法进行刷码支付。'}
            </p>
          </div>
        </div>
        <button
          onClick={onTogglePause}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
            isPaused
              ? 'bg-insurance-green-500 text-white hover:bg-insurance-green-600'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          {isPaused ? (
            <>
              <Play size={14} />
              恢复使用
            </>
          ) : (
            <>
              <Pause size={14} />
              暂停使用
            </>
          )}
        </button>
      </div>
    </div>
  );
}
