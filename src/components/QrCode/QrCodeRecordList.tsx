import { useState } from 'react';
import { QrCode, CreditCard, UserCheck, ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react';
import type { QrCodeRecord } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import EmptyState from '@/components/EmptyState/EmptyState';

interface QrCodeRecordListProps {
  records: QrCodeRecord[];
  maxVisible?: number;
}

const getRecordTypeIcon = (type: QrCodeRecord['type']) => {
  switch (type) {
    case 'payment':
      return <CreditCard size={18} />;
    case 'identity':
      return <UserCheck size={18} />;
    case 'registration':
      return <QrCode size={18} />;
    default:
      return <QrCode size={18} />;
  }
};

const getRecordTypeText = (type: QrCodeRecord['type']) => {
  const typeMap: Record<QrCodeRecord['type'], string> = {
    payment: '医保支付',
    identity: '身份核验',
    registration: '就诊登记',
  };
  return typeMap[type] || type;
};

const getRecordTypeColor = (type: QrCodeRecord['type']) => {
  const colorMap: Record<QrCodeRecord['type'], string> = {
    payment: 'bg-insurance-blue-50 text-insurance-blue-600',
    identity: 'bg-insurance-green-50 text-insurance-green-600',
    registration: 'bg-insurance-orange-50 text-insurance-orange-600',
  };
  return colorMap[type] || 'bg-gray-50 text-gray-600';
};

export default function QrCodeRecordList({ records, maxVisible = 3 }: QrCodeRecordListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayRecords = showAll ? records : records.slice(0, maxVisible);
  const hasMore = records.length > maxVisible;

  if (records.length === 0) {
    return (
      <EmptyState
        title="暂无刷码记录"
        description="使用医保码后将在这里显示记录"
      />
    );
  }

  return (
    <div className="space-y-3">
      {displayRecords.map((record) => (
        <div
          key={record.id}
          className="card card-hover p-4"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${getRecordTypeColor(record.type)}`}>
              {getRecordTypeIcon(record.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 truncate">{record.merchant}</h4>
                {record.amount !== undefined && (
                  <span className={`font-bold text-base ${record.status === 'success' ? 'text-insurance-green-600' : 'text-gray-400'}`}>
                    {record.status === 'success' ? '-' : ''}{formatCurrency(record.amount)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span className={`px-2 py-0.5 rounded-full ${getRecordTypeColor(record.type)}`}>
                  {getRecordTypeText(record.type)}
                </span>
                <span className="text-gray-400">|</span>
                <span className={record.status === 'success' ? 'text-insurance-green-600' : 'text-gray-400'}>
                  {record.status === 'success' ? '成功' : record.status === 'failed' ? '失败' : '处理中'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDate(record.scanTime)}</span>
                </div>
                {record.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{record.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 flex items-center justify-center gap-1 text-insurance-blue-500 hover:text-insurance-blue-600 text-sm font-medium transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              收起记录
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              查看全部记录
            </>
          )}
        </button>
      )}
    </div>
  );
}
