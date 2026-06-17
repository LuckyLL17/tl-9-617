import { Clock, MapPin, Shield } from 'lucide-react';
import type { ScanRecord } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ScanRecordListProps {
  records: ScanRecord[];
}

export default function ScanRecordList({ records }: ScanRecordListProps) {
  if (records.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-400 text-sm">暂无刷码记录</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div key={record.id} className="card card-hover p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-insurance-blue-50 flex items-center justify-center">
                <MapPin size={16} className="text-insurance-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{record.merchant}</p>
                <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-insurance-blue-50 text-insurance-blue-600 mt-0.5">
                  {record.category}
                </span>
              </div>
            </div>
            <p className="font-bold text-gray-900 text-sm">{formatCurrency(record.amount)}</p>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={12} />
              <span className="text-xs">{record.scanTime}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-insurance-green-600">
                医保 {formatCurrency(record.insuranceCoverage)}
              </span>
              <span className="text-gray-500">
                自付 {formatCurrency(record.selfPayment)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
