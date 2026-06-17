import { cn } from '@/lib/utils';

interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export default function InfoCard({ label, value, icon, className, valueClassName }: InfoCardProps) {
  return (
    <div className={cn('bg-white rounded-xl p-4 border border-gray-100', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className={cn('text-xl font-bold text-gray-900', valueClassName)}>{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
