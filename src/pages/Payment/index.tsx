import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScanLine, CreditCard, Receipt, X, CheckCircle, AlertCircle, ArrowLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatDate } from '@/utils/format';
import StatusBadge from '@/components/Card/StatusBadge';
import type { PaymentOrder } from '@/types';

type TabType = 'scan' | 'orders';
type PaymentStep = 'idle' | 'scanning' | 'confirm' | 'password' | 'success' | 'failed';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'orders' ? 'orders' : 'scan';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab') === 'orders' ? 'orders' : 'scan';
    setActiveTab(tab);
  }, [searchParams]);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('idle');
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const { paymentOrders, addPaymentOrder, addTransaction, insuranceAccount, updateInsuranceAccount } = useStore();

  const mockOrder: PaymentOrder = {
    id: 'pay' + Date.now(),
    userId: 'user001',
    orderNo: 'YB' + Date.now(),
    amount: 186.50,
    hospital: '上海市第一人民医院',
    department: '内科门诊',
    status: 'pending',
    paymentDate: new Date().toISOString(),
    items: [
      { name: '挂号费', amount: 50.00, insuranceCoverage: 40.00, selfPayment: 10.00 },
      { name: '血常规检查', amount: 86.50, insuranceCoverage: 69.20, selfPayment: 17.30 },
      { name: '药品费', amount: 50.00, insuranceCoverage: 40.00, selfPayment: 10.00 },
    ],
  };

  const filteredOrders = paymentOrders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = !searchText || 
      order.hospital.includes(searchText) || 
      order.department.includes(searchText) ||
      order.orderNo.includes(searchText);
    return matchesStatus && matchesSearch;
  });

  const totalCoverage = mockOrder.items.reduce((sum, item) => sum + item.insuranceCoverage, 0);
  const totalSelfPayment = mockOrder.items.reduce((sum, item) => sum + item.selfPayment, 0);

  const handleStartScan = () => {
    setPaymentStep('scanning');
    setTimeout(() => {
      setPaymentStep('confirm');
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setShowPasswordModal(true);
    setPaymentStep('password');
  };

  const handlePasswordInput = (num: string) => {
    if (password.length < 6) {
      const newPassword = password + num;
      setPassword(newPassword);
      if (newPassword.length === 6) {
        setTimeout(() => {
          if (newPassword === '123456') {
            const successOrder = { ...mockOrder, status: 'success' as const, paymentDate: new Date().toISOString() };
            addPaymentOrder(successOrder);
            addTransaction({
              id: 'tx' + Date.now(),
              accountId: insuranceAccount.id,
              type: 'expense',
              amount: mockOrder.amount,
              description: `门诊费用-${mockOrder.hospital}`,
              transactionDate: new Date().toISOString().split('T')[0],
              merchant: mockOrder.hospital,
              category: '门诊',
            });
            updateInsuranceAccount({
              totalBalance: insuranceAccount.totalBalance - totalSelfPayment,
              personalAccount: insuranceAccount.personalAccount - totalSelfPayment,
            });
            setPaymentStep('success');
          } else {
            setPaymentStep('failed');
          }
          setShowPasswordModal(false);
          setPassword('');
        }, 500);
      }
    }
  };

  const handleClearPassword = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  const handleReset = () => {
    setPaymentStep('idle');
    setPassword('');
    setShowPasswordModal(false);
  };

  const statusTabs = [
    { value: 'all', label: '全部' },
    { value: 'success', label: '成功' },
    { value: 'refunded', label: '退款' },
    { value: 'failed', label: '失败' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">医保支付</h1>
      </div>

      <div className="flex border-b border-gray-200 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
            activeTab === 'scan'
              ? 'border-insurance-blue-500 text-insurance-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ScanLine size={16} className="sm:w-[18px] sm:h-[18px]" />
          扫码支付
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-insurance-blue-500 text-insurance-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Receipt size={16} className="sm:w-[18px] sm:h-[18px]" />
          支付记录
        </button>
      </div>

      {activeTab === 'scan' && (
        <div className="max-w-2xl mx-auto">
          {paymentStep === 'idle' && (
            <div className="card p-6 sm:p-8 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-insurance-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ScanLine size={40} className="sm:w-12 sm:h-12 text-insurance-blue-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">扫码支付</h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm">扫描医疗机构的收款二维码，使用医保账户支付</p>
              <button onClick={handleStartScan} className="btn-primary w-full">
                开始扫码
              </button>
              <p className="text-xs text-gray-400 mt-4">
                提示：支付密码为 123456（演示用）
              </p>
            </div>
          )}

          {paymentStep === 'scanning' && (
            <div className="card p-4 sm:p-8">
              <div className="relative w-full aspect-square max-w-sm mx-auto bg-gray-900 rounded-2xl overflow-hidden">
                <div className="absolute inset-6 sm:inset-8 border-2 border-white/30 rounded-lg">
                  <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-insurance-green-400"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-insurance-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-insurance-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-insurance-green-400"></div>
                  <div className="absolute inset-x-0 h-1 bg-insurance-green-400/50 animate-scan shadow-lg shadow-insurance-green-400/50"></div>
                </div>
                <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
                  <p className="text-white/70 text-xs sm:text-sm">正在识别二维码...</p>
                </div>
              </div>
            </div>
          )}

          {paymentStep === 'confirm' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="card p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-insurance-blue-50 flex items-center justify-center">
                    <CreditCard size={24} className="sm:w-8 sm:h-8 text-insurance-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-900">{mockOrder.hospital}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">{mockOrder.department}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-3 sm:mb-4">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-gray-500 text-sm">订单编号</span>
                    <span className="font-mono text-gray-900 text-xs sm:text-sm">{mockOrder.orderNo}</span>
                  </div>
                  {mockOrder.items.map((item, index) => (
                    <div key={index} className="py-2 sm:py-3 border-b border-gray-50 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-gray-900 text-sm">{item.name}</span>
                        <span className="font-medium text-gray-900 text-sm">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">医保统筹支付 {formatCurrency(item.insuranceCoverage)}</span>
                        <span className="text-gray-400">个人支付 {formatCurrency(item.selfPayment)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">医保统筹支付</span>
                    <span className="text-insurance-green-600 font-medium">-{formatCurrency(totalCoverage)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">个人账户支付</span>
                    <span className="text-insurance-orange-600 font-medium">-{formatCurrency(totalSelfPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                    <span className="font-medium text-gray-900 text-sm">应付金额</span>
                    <span className="text-xl sm:text-2xl font-bold text-insurance-blue-600">{formatCurrency(mockOrder.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button onClick={handleReset} className="btn-secondary flex-1">
                  取消
                </button>
                <button onClick={handleConfirmPayment} className="btn-primary flex-1">
                  确认支付
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="card p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-insurance-green-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle size={40} className="sm:w-12 sm:h-12 text-insurance-green-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">支付成功</h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm">您的医保支付已完成</p>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="text-gray-500 text-sm">支付金额</span>
                  <span className="text-xl sm:text-2xl font-bold text-insurance-blue-600">{formatCurrency(mockOrder.amount)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{mockOrder.hospital}</span>
                  <span className="text-gray-400">{formatDate(new Date().toISOString(), 'full')}</span>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button onClick={() => setActiveTab('orders')} className="btn-secondary flex-1">
                  查看订单
                </button>
                <button onClick={handleReset} className="btn-primary flex-1">
                  返回首页
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'failed' && (
            <div className="card p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <AlertCircle size={40} className="sm:w-12 sm:h-12 text-red-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">支付失败</h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm">密码错误，请重新支付</p>
              <div className="flex gap-3 sm:gap-4">
                <button onClick={handleReset} className="btn-secondary flex-1">
                  返回
                </button>
                <button onClick={handleStartScan} className="btn-primary flex-1">
                  重新支付
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative flex-1">
              <Search size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索医院、科室、订单号"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
              <div className="flex gap-1 flex-shrink-0">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setFilterStatus(tab.value);
                      if (activeTab !== 'orders') {
                        setActiveTab('orders');
                      }
                    }}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      filterStatus === tab.value
                        ? 'bg-insurance-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="card card-hover p-3 sm:p-5 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-insurance-blue-50 flex items-center justify-center flex-shrink-0">
                      <CreditCard size={20} className="sm:w-6 sm:h-6 text-insurance-blue-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{order.hospital}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{order.department}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate">
                        订单号：{order.orderNo} · {formatDate(order.paymentDate, 'date')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 text-base sm:text-lg">{formatCurrency(order.amount)}</p>
                    <div className="flex items-center justify-end gap-1 sm:gap-2 mt-1">
                      <StatusBadge status={order.status} />
                      <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="card p-8 sm:p-12 text-center">
              <Receipt size={40} className="sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-sm">暂无支付记录</p>
            </div>
          )}
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">请输入支付密码</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPaymentStep('confirm');
                  setPassword('');
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-xl flex items-center justify-center transition-colors ${
                      password.length > i ? 'border-insurance-blue-500 bg-insurance-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {password.length > i && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-900 rounded-full"></div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((key, index) => (
                  <button
                    key={index}
                    onClick={() => key === 'delete' ? handleClearPassword() : key && handlePasswordInput(key)}
                    disabled={key === ''}
                    className={`h-12 sm:h-14 text-lg sm:text-xl font-semibold rounded-xl transition-colors ${
                      key === ''
                        ? 'bg-transparent cursor-default'
                        : key === 'delete'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                  >
                    {key === 'delete' ? '←' : key}
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">
                演示密码：123456
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-lg text-gray-900">订单详情</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <StatusBadge status={selectedOrder.status} className="px-4 py-1.5 text-sm mb-4" />
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(selectedOrder.amount)}</p>
                <p className="text-sm text-gray-500 mt-2">{selectedOrder.hospital}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">订单编号</span>
                  <span className="font-mono text-gray-900">{selectedOrder.orderNo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">就诊科室</span>
                  <span className="text-gray-900">{selectedOrder.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">支付时间</span>
                  <span className="text-gray-900">{formatDate(selectedOrder.paymentDate, 'full')}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">费用明细</h4>
                <div className="card divide-y divide-gray-100">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-900">{item.name}</span>
                        <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-insurance-green-600">医保支付 {formatCurrency(item.insuranceCoverage)}</span>
                        <span className="text-insurance-orange-600">自费 {formatCurrency(item.selfPayment)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">医保统筹支付</span>
                  <span className="text-insurance-green-600 font-medium">
                    -{formatCurrency(selectedOrder.items.reduce((sum, item) => sum + item.insuranceCoverage, 0))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">个人账户支付</span>
                  <span className="text-insurance-orange-600 font-medium">
                    -{formatCurrency(selectedOrder.items.reduce((sum, item) => sum + item.selfPayment, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
