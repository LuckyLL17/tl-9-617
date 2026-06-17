import { useState, useMemo } from 'react';
import { Clock, MapPin, CreditCard, ChevronDown, ChevronUp, Filter, CheckCircle, XCircle } from 'lucide-react';
import type { ScanRecord } from '@/types';
import { formatCurrency, formatDate, getScanTypeText, getScanTypeColor } from '@/utils/format';
import { cn } from '@/lib/utils';

type FilterType = 'all' | ScanRecord['type'];

interface ScanHistoryProps {
  records: ScanRecord[];
  className?: string;
  initialDisplayCount?: number;
}

export default function ScanHistory({
  records,
  className,
  initialDisplayCount = 5,
}: ScanHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredRecords = useMemo(() => {
    if (filterType === 'all') {
      return records;
    }
    return records.filter((record) => record.type === filterType);
  }, [records, filterType]);

  const displayRecords = useMemo(() => {
    if (showAll) {
      return filteredRecords;
    }
    return filteredRecords.slice(0, initialDisplayCount);
  }, [filteredRecords, showAll, initialDisplayCount]);

  const hasMore = filteredRecords.length > initialDisplayCount;

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'payment', label: '医保支付' },
    { value: 'identity', label: '身份核验' },
    { value: 'registration', label: '挂号登记' },
  ];

  const getStatusIcon = (status: ScanRecord['status']) => {
    if (status === 'success') {
      return <CheckCircle size={14} className="text-green-500" />;
    }
    return <XCircle size={14} className="text-red-500" />;
  };

  const getFilterLabel = () => {
    const option = filterOptions.find((opt) => opt.value === filterType);
    return option?.label || '全部';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-insurance-blue-500" />
          <h3 className="font-bold text-gray-900">刷码记录</h3>
          <span className="text-xs text-gray-400">
            共 {filteredRecords.length} 条
          </span>
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={cn(
            'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            showFilter || filterType !== 'all'
              ? 'bg-insurance-blue-100 text-insurance-blue-700'
              : 'text-gray-500 hover:bg-gray-100'
          )}
        >
          <Filter size={14} />
          <span>{getFilterLabel()}</span>
        </button>
      </div>

      {showFilter && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterType(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                filterType === option.value
                  ? 'bg-insurance-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {displayRecords.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
            <CreditCard size={20} className="text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">暂无刷码记录</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayRecords.map((record) => (
              <div
                key={record.id}
                className="card card-hover p-4 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getScanTypeColor(record.type)
                      )}
                    >
                      {getScanTypeText(record.type)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      {getStatusIcon(record.status)}
                      <span>
                        {record.status === 'success' ? '成功' : '失败'}
                      </span>
                    </span>
                  </div>
                  {record.amount > 0 && (
                    <span className="font-bold text-gray-900 text-sm">
                      -{formatCurrency(record.amount)}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-2">
                  {record.merchant}
                </h4>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{formatDate(record.scanTime, 'short')}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <MapPin size={12} className="flex-shrink-0" />
                    <span className="truncate">{record.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-1 py-3 text-insurance-blue-500 hover:text-insurance-blue-600 text-sm font-medium transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp size={16} />
                  收起
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  查看全部 {filteredRecords.length} 条记录
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
