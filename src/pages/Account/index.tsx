import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Shield, Phone, Mail, MapPin, FileText, Settings, Bell, HelpCircle, LogOut, Eye, EyeOff, ChevronRight, Building, Calendar, Hash, X, CheckCircle, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatIdCard, formatPhone, formatCurrency, formatDate } from '@/utils/format';
import StatusBadge from '@/components/Card/StatusBadge';
import InfoCard from '@/components/Card/InfoCard';

type ModalType = 'notifications' | 'policies' | 'logout' | null;

export default function Account() {
  const navigate = useNavigate();
  const { user, insuranceAccount, notifications, insurancePolicies, updateUser, resetToMockData, logout, markNotificationRead } = useStore();
  const [showIdCard, setShowIdCard] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const menuItems = [
    { id: '1', icon: Bell, label: '消息通知', modal: 'notifications' as ModalType, badge: unreadCount },
    { id: '2', icon: FileText, label: '我的保单', modal: 'policies' as ModalType },
    { id: '3', icon: Settings, label: '账户设置', path: '/settings' },
    { id: '4', icon: HelpCircle, label: '帮助中心', path: '/help' },
  ];

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue || '');
  };

  const handleSave = () => {
    if (editingField && editValue.trim()) {
      updateUser({ [editingField]: editValue.trim() });
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleLogout = () => {
    logout();
    setActiveModal(null);
  };

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return <Info size={20} className="text-blue-500" />;
      case 'business': return <FileText size={20} className="text-orange-500" />;
      case 'payment': return <CheckCircle size={20} className="text-green-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="gradient-card rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <div className="flex items-center gap-2">
                <StatusBadge status={insuranceAccount.status} className="bg-white/20 text-white" />
                <span className="text-white/70 text-sm">{insuranceAccount.insuredUnit}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">账户余额</p>
              <p className="text-xl font-bold">{formatCurrency(insuranceAccount.totalBalance)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">缴费基数</p>
              <p className="text-xl font-bold">{formatCurrency(insuranceAccount.paymentBase)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-1">最后缴费</p>
              <p className="text-xl font-bold">{insuranceAccount.lastPaymentDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-insurance-blue-50 flex items-center justify-center">
              <User size={20} className="text-insurance-blue-500" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">个人信息</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Hash size={18} className="text-gray-400" />
                <span className="text-gray-500">姓名</span>
              </div>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-400" />
                <span className="text-gray-500">身份证号</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-900">
                  {showIdCard ? user.idCard : formatIdCard(user.idCard)}
                </span>
                <button
                  onClick={() => setShowIdCard(!showIdCard)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {showIdCard ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-500">手机号码</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-900">
                  {showPhone ? user.phone : formatPhone(user.phone)}
                </span>
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {showPhone ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-500">邮箱</span>
              </div>
              {editingField === 'email' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500"
                    placeholder="请输入邮箱"
                  />
                  <button onClick={handleSave} className="text-insurance-blue-500 text-sm font-medium">保存</button>
                  <button onClick={handleCancel} className="text-gray-400 text-sm">取消</button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit('email', user.email || '')}
                  className="flex items-center gap-1 text-insurance-blue-500 hover:text-insurance-blue-600"
                >
                  <span>{user.email || '去设置'}</span>
                  {!user.email && <ChevronRight size={16} />}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-500">联系地址</span>
              </div>
              {editingField === 'address' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500"
                    placeholder="请输入地址"
                  />
                  <button onClick={handleSave} className="text-insurance-blue-500 text-sm font-medium">保存</button>
                  <button onClick={handleCancel} className="text-gray-400 text-sm">取消</button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit('address', user.address || '')}
                  className="flex items-center gap-1 text-insurance-blue-500 hover:text-insurance-blue-600"
                >
                  <span className="max-w-[200px] truncate">{user.address || '去设置'}</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-insurance-green-50 flex items-center justify-center">
              <Shield size={20} className="text-insurance-green-500" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">参保信息</h3>
          </div>

          <div className="space-y-4">
            <InfoCard
              label="参保单位"
              value={insuranceAccount.insuredUnit}
              icon={<Building size={18} />}
            />
            <InfoCard
              label="缴费基数"
              value={formatCurrency(insuranceAccount.paymentBase)}
              icon={<Calendar size={18} />}
            />
            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                label="个人账户"
                value={formatCurrency(insuranceAccount.personalAccount)}
                valueClassName="text-insurance-blue-600"
              />
              <InfoCard
                label="统筹账户"
                value={formatCurrency(insuranceAccount.overallAccount)}
                valueClassName="text-insurance-green-600"
              />
            </div>
            <InfoCard
              label="最后缴费日期"
              value={insuranceAccount.lastPaymentDate}
              icon={<Calendar size={18} />}
            />
            <div className="flex items-center justify-between py-4 px-4 bg-insurance-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <StatusBadge status={insuranceAccount.status} />
                <span className="text-sm text-gray-600">参保状态</span>
              </div>
              <span className="text-sm text-insurance-green-600 font-medium">正常缴费中</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === menuItems.length - 1;
          const content = (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && item.badge > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </>
          );

          if (item.path) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  !isLast ? 'border-b border-gray-50' : ''
                }`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveModal(item.modal)}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                !isLast ? 'border-b border-gray-50' : ''
              }`}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={resetToMockData}
          className="flex-1 py-3 px-6 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <Settings size={18} />
          重置演示数据
        </button>
        <button 
          onClick={() => setActiveModal('logout')}
          className="flex-1 py-3 px-6 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>

      {activeModal === 'notifications' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-lg text-gray-900">消息通知</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                    notification.read ? 'bg-gray-50 border-gray-100' : 'bg-insurance-blue-50/50 border-insurance-blue-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-insurance-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{notification.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatDate(notification.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'policies' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-lg text-gray-900">我的保单</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
              {insurancePolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="p-5 rounded-2xl border border-gray-100 hover:border-insurance-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        policy.status === 'active' ? 'bg-insurance-green-50' : 'bg-gray-100'
                      }`}>
                        <Shield size={24} className={policy.status === 'active' ? 'text-insurance-green-500' : 'text-gray-400'} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{policy.type}</h4>
                        <p className="text-xs text-gray-500 font-mono">{policy.policyNo}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      policy.status === 'active' 
                        ? 'bg-insurance-green-50 text-insurance-green-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {policy.status === 'active' ? '有效' : '已过期'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">承保机构</span>
                      <span className="text-gray-900">{policy.insurer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">生效日期</span>
                      <span className="text-gray-900">{policy.effectiveDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">到期日期</span>
                      <span className="text-gray-900">{policy.expiryDate}</span>
                    </div>
                    {policy.premium > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">年度保费</span>
                        <span className="text-gray-900 font-medium">{formatCurrency(policy.premium)}</span>
                      </div>
                    )}
                  </div>
                  <button className="mt-4 w-full py-2 bg-insurance-blue-50 text-insurance-blue-600 rounded-lg text-sm font-medium hover:bg-insurance-blue-100 transition-colors flex items-center justify-center gap-1">
                    查看详情 <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



      {activeModal === 'logout' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">确认退出登录</h3>
              <p className="text-sm text-gray-500 mb-6">退出后您的本地数据将被清除，下次登录需要重新加载。</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  确认退出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
