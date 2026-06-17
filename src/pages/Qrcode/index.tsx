import { useState, useEffect, useCallback, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Barcode, RefreshCw, Shield, Info, Clock, Eye, EyeOff, Copy, Check, AlertTriangle, Lock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useScreenshotDetection } from '@/hooks/useScreenshotDetection';
import ScreenshotWarning from '@/components/Qrcode/ScreenshotWarning';
import CodeScanRecords from '@/components/Qrcode/CodeScanRecords';
import CodeStatusControl from '@/components/Qrcode/CodeStatusControl';

type QrMode = 'qr' | 'barcode';

export default function Qrcode() {
  const { user, insuranceAccount, qrCodeFrozen } = useStore();
  const { screenshotDetected, dismissWarning } = useScreenshotDetection();
  const [mode, setMode] = useState<QrMode>('qr');
  const [countdown, setCountdown] = useState(60);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const generateQrValue = useCallback(() => {
    const timestamp = Date.now();
    return JSON.stringify({
      userId: user.id,
      userName: user.name,
      idCard: user.idCard,
      accountId: insuranceAccount.id,
      timestamp,
      type: 'insurance_payment',
    });
  }, [user, insuranceAccount]);

  const [qrValue, setQrValue] = useState(generateQrValue);

  const barcodeBars = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      width: i % 5 === 0 ? 3 : 1,
      height: Math.random() * 60 + 40,
    }));
  }, [qrValue]);

  useEffect(() => {
    if (qrCodeFrozen) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrValue(generateQrValue());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [generateQrValue, qrCodeFrozen]);

  const handleRefresh = () => {
    setQrValue(generateQrValue());
    setCountdown(60);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usageTips = [
    { id: 1, title: '医保支付', desc: '在定点医院、药店出示此码即可支付' },
    { id: 2, title: '身份凭证', desc: '可作为医保业务办理的身份凭证' },
    { id: 3, title: '就诊登记', desc: '挂号、就诊、取药时出示即可' },
  ];

  const renderFrozenState = () => (
    <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
        <Lock size={32} className="sm:w-10 sm:h-10 text-white/70" />
      </div>
      <h3 className="text-white font-bold text-lg sm:text-xl mb-2">二维码已暂停使用</h3>
      <p className="text-white/70 text-center text-sm mb-4">
        挂失期间无法使用医保码支付
      </p>
      <p className="text-white/50 text-center text-xs">
        如需恢复使用，请在下方点击"恢复使用"
      </p>
    </div>
  );

  const renderCodeDisplay = () => {
    if (qrCodeFrozen) {
      return renderFrozenState();
    }

    if (!showCode) {
      return (
        <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center">
          <EyeOff size={36} className="sm:w-12 sm:h-12 text-white/50 mb-3 sm:mb-4" />
          <p className="text-white/70 text-center text-sm">点击上方眼睛图标查看二维码</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center">
        {mode === 'qr' ? (
          <QRCodeCanvas
            value={qrValue}
            size={200}
            level="H"
            includeMargin={false}
            fgColor="#1A73E8"
          />
        ) : (
          <div className="w-full h-28 sm:h-32 bg-gray-900 rounded-xl flex items-center justify-center px-3 sm:px-4">
            <div className="flex gap-0.5 h-20 sm:h-24 items-end">
              {barcodeBars.map((bar, i) => (
                <div
                  key={i}
                  className="bg-white"
                  style={{
                    width: `${bar.width}px`,
                    height: `${bar.height}%`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-3 sm:mt-4 text-gray-500">
          <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
          <span className="text-xs sm:text-sm">
            码将在 <span className="text-insurance-blue-600 font-bold">{countdown}s</span> 后刷新
          </span>
        </div>

        <button
          onClick={handleRefresh}
          className="mt-2 sm:mt-3 flex items-center gap-1 text-insurance-blue-500 hover:text-insurance-blue-600 text-xs sm:text-sm font-medium transition-colors"
        >
          <RefreshCw size={12} className="sm:w-[14px] sm:h-[14px]" />
          立即刷新
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0 pb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">医保电子凭证</h1>
        <p className="text-gray-500 text-sm">刷码即可享受医保服务</p>
      </div>

      <div className="gradient-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-white/70 text-xs sm:text-sm">参保人</p>
                <p className="font-bold text-base sm:text-lg">{user.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowCode(!showCode)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              {showCode ? <Eye size={18} className="sm:w-5 sm:h-5" /> : <EyeOff size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <div className="flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setMode('qr')}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  mode === 'qr' ? 'bg-white text-insurance-blue-600' : 'text-white/80'
                }`}
              >
                <QrCode size={16} className="sm:w-[18px] sm:h-[18px]" />
                二维码
              </button>
              <button
                onClick={() => setMode('barcode')}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  mode === 'barcode' ? 'bg-white text-insurance-blue-600' : 'text-white/80'
                }`}
              >
                <Barcode size={16} className="sm:w-[18px] sm:h-[18px]" />
                条形码
              </button>
            </div>
          </div>

          {renderCodeDisplay()}

          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/70">医保卡号：</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 font-mono hover:text-white transition-colors text-[10px] sm:text-sm"
              >
                <span>{user.id}</span>
                {copied ? <Check size={12} className="sm:w-[14px] sm:h-[14px] text-green-400" /> : <Copy size={12} className="sm:w-[14px] sm:h-[14px]" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CodeStatusControl />

      <div className="card p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-insurance-orange-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-insurance-orange-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">安全提示</h4>
            <p className="text-sm text-gray-500">
              请勿将二维码截图或分享给他人，每次使用后请及时关闭页面。如发现异常请立即联系医保服务热线 12393。
            </p>
          </div>
        </div>
      </div>

      <CodeScanRecords />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info size={18} className="text-insurance-blue-500" />
          <h3 className="font-bold text-gray-900">使用场景</h3>
        </div>
        <div className="space-y-3">
          {usageTips.map((tip) => (
            <div key={tip.id} className="card card-hover p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-insurance-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-insurance-blue-500 font-bold">{tip.id}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{tip.title}</h4>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-insurance-blue-50 to-insurance-green-50">
        <h4 className="font-bold text-gray-900 mb-4">激活信息</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">首次激活时间</span>
            <span className="text-gray-900 font-medium">2024-01-15 10:30:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">累计使用次数</span>
            <span className="text-gray-900 font-medium">128 次</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">最近使用</span>
            <span className="text-gray-900 font-medium">2026-05-20 14:30:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">使用城市</span>
            <span className="text-gray-900 font-medium">上海市</span>
          </div>
        </div>
      </div>

      <ScreenshotWarning visible={screenshotDetected} onClose={dismissWarning} />
    </div>
  );
}
