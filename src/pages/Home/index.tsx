import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanLine,
  QrCode,
  CircleDollarSign,
  ClipboardList,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  MapPin,
  Heart,
  Eye,
  ArrowRightLeft,
  Flame,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatDate, getTransactionTypeText, getTransactionTypeColor } from '@/utils/format';
import StatusBadge from '@/components/Card/StatusBadge';

const quickActions = [
  { id: 'qa001', name: '医保支付', icon: ScanLine, path: '/payment', color: 'bg-insurance-blue-500', hoverColor: 'hover:bg-insurance-blue-600' },
  { id: 'qa002', name: '医保码', icon: QrCode, path: '/qrcode', color: 'bg-insurance-green-500', hoverColor: 'hover:bg-insurance-green-600' },
  { id: 'qa003', name: '余额查询', icon: CircleDollarSign, path: '/balance', color: 'bg-insurance-orange-500', hoverColor: 'hover:bg-insurance-orange-600' },
  { id: 'qa004', name: '业务办理', icon: ClipboardList, path: '/services', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
];

const recommendServices = [
  { id: 'rs001', name: '异地就医备案', icon: MapPin, description: '跨省就医直接结算', hot: true },
  { id: 'rs002', name: '门诊费用报销', icon: ClipboardList, description: '在线提交报销申请', hot: true },
  { id: 'rs003', name: '医保关系转移', icon: ArrowRightLeft, description: '跨地区转移接续', hot: false },
  { id: 'rs004', name: '医保卡补办', icon: QrCode, description: '挂失补办新社保卡', hot: true },
];



export default function Home() {
  const { user, insuranceAccount, transactions, paymentOrders, serviceApplications } = useStore();
  const [displayBalance, setDisplayBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const targetBalance = insuranceAccount.totalBalance;
    const duration = 1000;
    const steps = 30;
    const increment = targetBalance / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetBalance) {
        setDisplayBalance(targetBalance);
        clearInterval(timer);
      } else {
        setDisplayBalance(Math.floor(current * 100) / 100);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [insuranceAccount.totalBalance]);

  const recentTransactions = transactions.slice(0, 3);
  const recentOrders = paymentOrders.slice(0, 2);
  const pendingApplications = serviceApplications.filter((app) => app.status === 'reviewing').length;

  return (
    <div className="space-y-6">
      <div className="gradient-card rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div>
                <p className="text-white/80 text-sm">您好</p>
                <h2 className="text-xl font-bold">{user.name}</h2>
              </div>
            </div>
            <StatusBadge status={insuranceAccount.status} className="bg-white/20 text-white" />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-white/80 text-sm">医保账户余额</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Eye size={16} className="text-white/70" />
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {showBalance ? formatCurrency(displayBalance) : '****'}
              </span>
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-white/60 text-xs">个人账户</p>
                <p className="text-lg font-semibold">
                  {showBalance ? formatCurrency(insuranceAccount.personalAccount) : '****'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs">统筹账户</p>
                <p className="text-lg font-semibold">
                  {showBalance ? formatCurrency(insuranceAccount.overallAccount) : '****'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-white/70">
              <Shield size={14} />
              <span>正常参保 · {insuranceAccount.insuredUnit}</span>
            </div>
            <Link
              to="/balance"
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            >
              查看明细
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              to={action.path}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white card card-hover group"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${action.color} ${action.hoverColor} flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
              >
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{action.name}</span>
            </Link>
          );
        })}
      </div>

      {pendingApplications > 0 && (
        <div className="card card-hover p-4 border-l-4 border-l-insurance-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-insurance-blue-50 flex items-center justify-center">
                <Clock size={20} className="text-insurance-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">您有 {pendingApplications} 项业务正在审核中</p>
                <p className="text-sm text-gray-500">点击查看办理进度</p>
              </div>
            </div>
            <Link to="/services" className="text-insurance-blue-500 hover:text-insurance-blue-600">
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">热门服务</h3>
          <Link to="/services" className="text-sm text-gray-500 hover:text-insurance-blue-500 flex items-center gap-1">
            更多
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {recommendServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to="/services"
                className="card card-hover p-3 sm:p-4 relative overflow-hidden"
              >
                {service.hot && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-0.5">
                    <Flame size={10} className="sm:w-3 sm:h-3 text-orange-500" />
                    <span className="text-[10px] sm:text-xs text-orange-500 font-medium">热门</span>
                  </div>
                )}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-insurance-blue-50 flex items-center justify-center mb-2 sm:mb-3">
                  <Icon size={18} className="sm:w-5 sm:h-5 text-insurance-blue-500" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">{service.name}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">最近交易</h3>
          <Link to="/balance" className="text-sm text-gray-500 hover:text-insurance-blue-500 flex items-center gap-1">
            全部记录
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="card overflow-hidden">
          {recentTransactions.map((tx, index) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between p-4 ${index !== recentTransactions.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-insurance-green-50' : 'bg-red-50'
                  }`}
                >
                  {tx.type === 'income' ? (
                    <TrendingUp size={20} className="text-insurance-green-500" />
                  ) : (
                    <TrendingDown size={20} className="text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(tx.transactionDate, 'date')} · {tx.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getTransactionTypeColor(tx.type)}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
                <p className="text-xs text-gray-400">{getTransactionTypeText(tx.type)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">最近支付</h3>
          <Link to="/payment?tab=orders" className="text-sm text-gray-500 hover:text-insurance-blue-500 flex items-center gap-1">
            全部订单
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              to="/payment"
              className="card card-hover p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-insurance-blue-50 flex items-center justify-center">
                  <Heart size={24} className="text-insurance-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.hospital}</p>
                  <p className="text-sm text-gray-500">
                    {order.department} · {formatDate(order.paymentDate, 'date')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
