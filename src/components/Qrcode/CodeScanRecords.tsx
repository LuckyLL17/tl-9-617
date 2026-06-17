import { useState } from 'react';
import { History, ChevronDown, ChevronUp, MapPin, CheckCircle, XCircle, Receipt } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatDate } from '@/utils/format';
import EmptyState from '@/components/EmptyState/EmptyState';

export default function CodeScanRecords() {
  const { codeScanRecords } = useStore();
  const [expanded, setExpanded] = useState(false);
  const displayRecords = expanded ? codeScanRecords : codeScanRecords.slice(0, 3);

  const getScanTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      payment: '医保支付',
      query: '信息查询',
      verification: '身份核验',
    };
    return typeMap[type] || type;
  };

  const getScanTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <Receipt size={18} className="text-insurance-blue-500" />;
      case 'query':
        return <MapPin size={18} className="text-insurance-green-500" />;
      default:
        return <CheckCircle size={18} className="text-purple-500" />;
    }
  };

  if (codeScanRecords.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <History size={18} className="text-insurance-blue-500" />
          <h3 className="font-bold text-gray-900">刷码记录</h3>
        </div>
        <EmptyState
          title="暂无刷码记录"
          description="使用医保码支付后将在这里显示记录"
          icon={<History size={40} className="text-gray-300" />}
        />
      </div>
    );
  }

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History size={18} className="text-insurance-blue-500" />
          <h3 className="font-bold text-gray-900">刷码记录</h3>
          <span className="text-xs text-gray-400">共 {codeScanRecords.length} 条</span>
        </div>
      </div>

      <div className="space-y-3">
        {displayRecords.map((record) => (
          <div
            key={record.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
              {getScanTypeIcon(record.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 text-sm truncate">{record.merchant}</h4>
                <span className={`font-bold text-sm flex-shrink-0 ml-2 ${
                  record.status === 'success' ? 'text-insurance-green-600' : 'text-red-500'
                }`}>
                  {record.status === 'success' ? '+' : '-'}
                  {record.amount > 0 ? formatCurrency(record.amount) : '--'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{getScanTypeText(record.type)}</span>
                <span>·</span>
                <span>{formatDate(record.scanTime, 'short')}</span>
                {record.location && (
                  <>
                    <span>·</span>
                    <MapPin size={12} />
                    <span className="truncate">{record.location}</span>
                  </>
                )}
              </div>
            </div>

            {record.status === 'success' ? (
              <CheckCircle size={16} className="text-insurance-green-500 flex-shrink-0" />
            ) : (
              <XCircle size={16} className="text-red-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {codeScanRecords.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 py-2 flex items-center justify-center gap-1 text-sm text-insurance-blue-500 hover:text-insurance-blue-600 font-medium transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              收起
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              查看更多记录
            </>
          )}
        </button>
      )}
    </div>
  );
}
