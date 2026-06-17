import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Info, RefreshCw, LogOut, AlertCircle, ChevronRight, Moon, Volume2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Settings() {
  const navigate = useNavigate();
  const { resetToMockData, logout } = useStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleResetData = () => {
    if (confirm('确定要重置所有演示数据吗？此操作不可撤销。')) {
      resetToMockData();
    }
  };

  const settingsGroups = [
    {
      title: '通知设置',
      items: [
        {
          icon: Bell,
          label: '消息通知',
          desc: '接收账户变动、业务办理等提醒',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: Volume2,
          label: '声音提醒',
          desc: '支付成功、通知到达时播放提示音',
          type: 'toggle',
          value: soundEnabled,
          onChange: setSoundEnabled,
        },
      ],
    },
    {
      title: '通用',
      items: [
        {
          icon: Moon,
          label: '深色模式',
          desc: '切换浅色/深色主题',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
        },
      ],
    },
    {
      title: '关于',
      items: [
        {
          icon: Info,
          label: '关于我们',
          desc: '医保电子凭证 v1.0.0',
          type: 'static',
        },
        {
          icon: RefreshCw,
          label: '重置演示数据',
          desc: '恢复到初始演示状态',
          type: 'action',
          action: handleResetData,
          danger: false,
        },
        {
          icon: LogOut,
          label: '退出登录',
          desc: '清除本地数据并退出',
          type: 'action',
          action: () => setShowLogoutConfirm(true),
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">账户设置</h1>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
              {group.title}
            </h3>
            <div className="card overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === group.items.length - 1;

                if (item.type === 'toggle') {
                  return (
                    <div
                      key={itemIndex}
                      className={`flex items-center justify-between p-4 ${!isLast ? 'border-b border-gray-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => item.onChange && item.onChange(!item.value)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          item.value ? 'bg-insurance-blue-500' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                            item.value ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  );
                }

                if (item.type === 'link') {
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-4 ${!isLast ? 'border-b border-gray-50' : ''} hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  );
                }

                if (item.type === 'static') {
                  return (
                    <div
                      key={itemIndex}
                      className={`flex items-center justify-between p-4 ${!isLast ? 'border-b border-gray-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'action') {
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-4 ${!isLast ? 'border-b border-gray-50' : ''} hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.danger ? 'bg-red-50' : 'bg-gray-50'}`}>
                          <Icon size={20} className={item.danger ? 'text-red-500' : 'text-gray-600'} />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${item.danger ? 'text-red-600' : 'text-gray-900'}`}>{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {showLogoutConfirm && (
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
                  onClick={() => setShowLogoutConfirm(false)}
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
