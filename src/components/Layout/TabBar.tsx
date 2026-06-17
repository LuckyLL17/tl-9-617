import { Link, useLocation } from 'react-router-dom';
import { Home, ScanLine, QrCode, ClipboardList, User } from 'lucide-react';

const tabItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/payment', label: '支付', icon: ScanLine },
  { path: '/qrcode', label: '医保码', icon: QrCode },
  { path: '/services', label: '办理', icon: ClipboardList },
  { path: '/account', label: '我的', icon: User },
];

export default function TabBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-all duration-200 ${
                isActive ? 'text-insurance-blue-600' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-insurance-blue-600 rounded-full" />
                )}
              </div>
              <span className="text-xs mt-1 font-medium truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
