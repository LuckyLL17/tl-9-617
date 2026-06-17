import { PauseCircle, Ban, Shield } from 'lucide-react';
import type { QrCodeStatus } from '@/types';
import { getQrStatusText, getQrStatusColor } from '@/utils/format';
import { cn } from '@/lib/utils';

interface QrCodeStatusDisplayProps {
  status: QrCodeStatus;
  onActivate: () => void;
}

export default function QrCodeStatusDisplay({
  status,
  onActivate,
}: QrCodeStatusDisplayProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'suspended':
        return {
          icon: PauseCircle,
          title: '二维码已暂停',
          description: '您已暂停使用医保二维码，点击下方按钮恢复使用。',
          buttonText: '恢复使用',
          buttonClass: 'bg-insurance-orange-500 hover:bg-insurance-orange-600',
          bgClass: 'from-insurance-orange-600 to-insurance-orange-700',
        };
      case 'lost':
        return {
          icon: Ban,
          title: '二维码已挂失冻结',
          description: '您的医保二维码已挂失冻结，无法进行支付操作。如需恢复请先解除挂失。',
          buttonText: '解除挂失',
          buttonClass: 'bg-red-500 hover:bg-red-600',
          bgClass: 'from-red-600 to-red-700',
        };
      default:
        return {
          icon: Shield,
          title: '',
          description: '',
          buttonText: '',
          buttonClass: '',
          bgClass: '',
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        'gradient-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden',
        status === 'suspended' && 'from-insurance-orange-500 to-insurance-orange-600',
        status === 'lost' && 'from-red-500 to-red-600'
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-white/70 text-xs sm:text-sm">参保人</p>
              <p className="font-bold text-base sm:text-lg">张三</p>
            </div>
          </div>
          <span
            className={cn(
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
              getQrStatusColor(status)
            )}
          >
            {getQrStatusText(status)}
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <IconComponent size={32} className="sm:w-10 sm:h-10" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">
            {config.title}
          </h3>
          <p className="text-white/70 text-sm text-center mb-6 max-w-xs">
            {config.description}
          </p>
          <button
            onClick={onActivate}
            className={cn(
              'px-6 py-3 rounded-xl font-medium text-white transition-colors',
              config.buttonClass
            )}
          >
            {config.buttonText}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70">
          <span>如有疑问请拨打医保服务热线</span>
          <span className="font-bold text-white">12393</span>
        </div>
      </div>
    </div>
  );
}
