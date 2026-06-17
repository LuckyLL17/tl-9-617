import { Clock, MapPin, CreditCard } from 'lucide-react';
import type { ScanRecord } from '@/types';
import { formatCurrency, formatDate, getScanTypeText, getScanTypeColor } from '@/utils/format';
import { cn } from '@/lib/utils';

interface ScanHistoryProps {
  records: ScanRecord[];
  className?: string;
}

export default function ScanHistory({ records, className }: ScanHistoryProps) {
  const recentRecords = records.slice(0, 5);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-insurance-blue-500" />
          <h3 className="font-bold text-gray-900">刷码记录</h3>
        </div>
        <span className="text-xs text-gray-400">最近5条</span>
      </div>

      {recentRecords.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-400 text-sm">暂无刷码记录</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentRecords.map((record) => (
            <div
              key={record.id}
              className="card card-hover p-4 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getScanTypeColor(record.type)
                    )}
                  >
                    {getScanTypeText(record.type)}
                  </span>
                  <h4 className="font-medium text-gray-900 text-sm">
                    {record.merchant}
                  </h4>
                </div>
                {record.amount > 0 && (
                  <span className="font-bold text-gray-900 text-sm">
                    -{formatCurrency(record.amount)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDate(record.scanTime, 'short')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="truncate max-w-[150px]">{record.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
