import { useState, useEffect } from 'react';
import {
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatDate, getTransactionTypeText, getTransactionTypeColor } from '@/utils/format';
import InfoCard from '@/components/Card/InfoCard';

export default function Balance() {
  const { insuranceAccount, transactions } = useStore();
  const [displayBalance, setDisplayBalance] = useState(0);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);

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

  const categories = ['all', '门诊', '购药', '住院', '体检', '账户划入'];
  const months = ['all', '2026-05', '2026-04', '2026-03', '2026-02', '2026-01'];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesCategory = filterCategory === 'all' || tx.category === filterCategory;
    const matchesMonth = selectedMonth === 'all' || tx.transactionDate.startsWith(selectedMonth);
    const matchesSearch = !searchText || 
      tx.description.includes(searchText) || 
      tx.merchant.includes(searchText);
    return matchesType && matchesCategory && matchesMonth && matchesSearch;
  });

  const incomeTotal = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expenseTotal = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pieData = [
    { name: '个人账户', value: insuranceAccount.personalAccount, color: '#1A73E8' },
    { name: '统筹账户', value: insuranceAccount.overallAccount, color: '#34A853' },
  ];

  const categoryStats = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  const barData = Object.entries(categoryStats).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  const monthlyData = [
    { month: '1月', income: 1200, expense: 1568 },
    { month: '2月', income: 1200, expense: 890 },
    { month: '3月', income: 1200, expense: 1280 },
    { month: '4月', income: 1200, expense: 201 },
    { month: '5月', income: 1200, expense: 866 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">余额查询</h1>
      </div>

      <div className="gradient-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <CircleDollarSign size={18} className="sm:w-5 sm:h-5 text-white/70" />
            <p className="text-white/70 text-xs sm:text-sm">医保账户总余额</p>
          </div>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
            {formatCurrency(displayBalance)}
          </p>
          <p className="text-white/60 text-xs sm:text-sm">
            数据更新于 {formatDate(new Date().toISOString(), 'full')}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <PieChart size={14} className="sm:w-4 sm:h-4" />
                </div>
                <span className="text-white/70 text-xs sm:text-sm">个人账户</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{formatCurrency(insuranceAccount.personalAccount)}</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-1">可用于门诊、购药等</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <PieChart size={14} className="sm:w-4 sm:h-4" />
                </div>
                <span className="text-white/70 text-xs sm:text-sm">统筹账户</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{formatCurrency(insuranceAccount.overallAccount)}</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-1">住院等大病报销</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <InfoCard
          label="本月收入"
          value={`+${formatCurrency(incomeTotal)}`}
          icon={<ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px] text-insurance-green-500" />}
          valueClassName="text-insurance-green-600"
        />
        <InfoCard
          label="本月支出"
          value={`-${formatCurrency(expenseTotal)}`}
          icon={<ArrowDownRight size={16} className="sm:w-[18px] sm:h-[18px] text-red-500" />}
          valueClassName="text-red-600"
        />
        <InfoCard
          label="缴费基数"
          value={formatCurrency(insuranceAccount.paymentBase)}
          icon={<Calendar size={16} className="sm:w-[18px] sm:h-[18px] text-insurance-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="card p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 mb-3 sm:mb-4">账户构成</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 mb-3 sm:mb-4">支出分类</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" tickFormatter={(value) => `¥${value}`} />
                <YAxis type="category" dataKey="name" width={50} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#1A73E8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-3 sm:mb-4">收支趋势（近5个月）</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `¥${value}`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="income" name="收入" fill="#34A853" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" name="支出" fill="#FB923C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">交易记录</h3>
          <span className="text-sm text-gray-500">共 {filteredTransactions.length} 条记录</span>
        </div>

        <div className="card p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索交易描述、商户"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500 text-sm"
                >
                  <option value="all">全部类型</option>
                  <option value="income">收入</option>
                  <option value="expense">支出</option>
                </select>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '全部分类' : cat}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500 text-sm"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month === 'all' ? '全部时间' : month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="card card-hover p-4 cursor-pointer"
              onClick={() => setSelectedTransaction(tx)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tx.type === 'income' ? 'bg-insurance-green-50' : 'bg-red-50'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <TrendingUp size={24} className="text-insurance-green-500" />
                    ) : (
                      <TrendingDown size={24} className="text-red-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tx.description}</h4>
                    <p className="text-sm text-gray-500">
                      {tx.merchant} · {formatDate(tx.transactionDate, 'date')}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {tx.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className={`font-bold text-lg ${getTransactionTypeColor(tx.type)}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-gray-400">{getTransactionTypeText(tx.type)}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="card p-12 text-center">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无匹配的交易记录</p>
          </div>
        )}
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">交易详情</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    selectedTransaction.type === 'income' ? 'bg-insurance-green-50' : 'bg-red-50'
                  }`}
                >
                  {selectedTransaction.type === 'income' ? (
                    <TrendingUp size={32} className="text-insurance-green-500" />
                  ) : (
                    <TrendingDown size={32} className="text-red-500" />
                  )}
                </div>
                <p className={`text-3xl font-bold ${getTransactionTypeColor(selectedTransaction.type)}`}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                </p>
                <p className="text-gray-500 mt-2">{selectedTransaction.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">交易类型</span>
                  <span className="text-gray-900 font-medium">{getTransactionTypeText(selectedTransaction.type)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">交易分类</span>
                  <span className="text-gray-900 font-medium">{selectedTransaction.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">商户名称</span>
                  <span className="text-gray-900 font-medium">{selectedTransaction.merchant}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">交易时间</span>
                  <span className="text-gray-900 font-medium">{formatDate(selectedTransaction.transactionDate, 'date')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">交易编号</span>
                  <span className="text-gray-900 font-medium font-mono">{selectedTransaction.id}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="btn-primary w-full"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
