import { Lock, ShieldOff } from 'lucide-react';

export default function FrozenOverlay() {
  return (
    <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <Lock size={32} className="text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">医保码已冻结</h3>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-3">
        当前医保码已暂停使用，无法出示二维码进行支付。如需恢复，请点击下方"恢复使用"按钮。
      </p>
      <div className="flex items-center gap-1.5 text-xs text-red-500">
        <ShieldOff size={14} />
        <span>挂失冻结中，码已失效</span>
      </div>
    </div>
  );
}
