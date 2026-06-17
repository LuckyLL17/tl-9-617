import { useState } from 'react';
import {
  ClipboardList,
  Clock,
  ChevronRight,
  Search,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRightLeft,
  MapPin,
  Receipt,
  Hospital,
  CreditCard,
  Wallet,
  User,
  Building2,
  Stethoscope,
  Plus,
  Flame,
  Clock3,
  ListChecks,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatDate } from '@/utils/format';
import StatusBadge from '@/components/Card/StatusBadge';
import type { InsuranceService, ServiceApplication } from '@/types';

type TabType = 'apply' | 'progress';

const iconMap: Record<string, React.ElementType> = {
  ArrowRightLeft,
  MapPin,
  Receipt,
  Hospital,
  CreditCard,
  Wallet,
  User,
  Search,
  Building2,
  Stethoscope,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabType>('apply');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedService, setSelectedService] = useState<InsuranceService | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingService, setApplyingService] = useState<InsuranceService | null>(null);

  const { insuranceServices, serviceApplications, addServiceApplication } = useStore();

  const categories = [
    { value: 'all', label: '全部' },
    { value: '关系转移', label: '关系转移' },
    { value: '异地就医', label: '异地就医' },
    { value: '费用报销', label: '费用报销' },
    { value: '卡业务', label: '卡业务' },
    { value: '账户业务', label: '账户业务' },
    { value: '信息维护', label: '信息维护' },
    { value: '查询服务', label: '查询服务' },
    { value: '定点管理', label: '定点管理' },
    { value: '资格认定', label: '资格认定' },
  ];

  const filteredServices = insuranceServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = !searchText || 
      service.name.includes(searchText) || 
      service.description.includes(searchText);
    return matchesCategory && matchesSearch;
  });

  const handleApply = (service: InsuranceService) => {
    setApplyingService(service);
    setShowApplyModal(true);
  };

  const handleConfirmApply = () => {
    if (applyingService) {
      const newApplication: ServiceApplication = {
        id: 'svc' + Date.now(),
        userId: 'user001',
        serviceType: applyingService.id,
        title: applyingService.name,
        status: 'reviewing',
        applyDate: new Date().toISOString().split('T')[0],
        remark: '',
        estimatedTime: applyingService.estimatedTime,
      };
      addServiceApplication(newApplication);
      setShowApplyModal(false);
      setApplyingService(null);
      setActiveTab('progress');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">业务办理</h1>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'apply'
              ? 'border-insurance-blue-500 text-insurance-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ClipboardList size={18} />
          我要办理
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'progress'
              ? 'border-insurance-blue-500 text-insurance-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Clock size={18} />
          办理进度
          {serviceApplications.filter((a) => a.status === 'reviewing').length > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {serviceApplications.filter((a) => a.status === 'reviewing').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'apply' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索业务名称"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-insurance-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredServices.map((service) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <div
                  key={service.id}
                  className="card card-hover p-4 sm:p-5 cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-insurance-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} className="sm:w-6 sm:h-6 text-insurance-blue-500" />
                    </div>
                    {service.hot && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                        <Flame size={10} className="sm:w-3 sm:h-3 text-orange-500" />
                        <span className="text-[10px] sm:text-xs text-orange-500 font-medium">热门</span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{service.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock3 size={10} className="sm:w-3 sm:h-3" />
                      <span>{service.estimatedTime}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                      {service.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(service);
                    }}
                    className="mt-3 sm:mt-4 w-full py-1.5 sm:py-2 bg-insurance-blue-50 text-insurance-blue-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-insurance-blue-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                    立即办理
                  </button>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="card p-12 text-center">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">未找到相关业务</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-4">
          {serviceApplications.map((application) => (
            <div
              key={application.id}
              className="card card-hover p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    application.status === 'completed' || application.status === 'approved'
                      ? 'bg-insurance-green-50'
                      : application.status === 'rejected'
                      ? 'bg-red-50'
                      : 'bg-insurance-blue-50'
                  }`}>
                    {application.status === 'completed' || application.status === 'approved' ? (
                      <CheckCircle size={24} className="text-insurance-green-500" />
                    ) : application.status === 'rejected' ? (
                      <AlertCircle size={24} className="text-red-500" />
                    ) : (
                      <ListChecks size={24} className="text-insurance-blue-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{application.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      申请时间：{formatDate(application.applyDate, 'date')}
                    </p>
                    {application.remark && (
                      <p className="text-sm text-gray-400 mt-1">{application.remark}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={application.status} />
                  <p className="text-xs text-gray-400 mt-2">
                    预计 {application.estimatedTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        ['approved', 'completed', 'rejected'].includes(application.status)
                          ? 'bg-insurance-green-500'
                          : 'bg-insurance-blue-500 animate-pulse'
                      }`} />
                      <span>提交申请</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-2">
                      <div className={`h-full ${
                        ['reviewing', 'approved', 'completed', 'rejected'].includes(application.status)
                          ? 'bg-insurance-blue-500 w-full'
                          : 'bg-gray-200 w-0'
                      } transition-all duration-500`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        ['approved', 'completed', 'rejected'].includes(application.status)
                          ? 'bg-insurance-green-500'
                          : 'bg-gray-200'
                      }`} />
                      <span>审核中</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-2">
                      <div className={`h-full ${
                        ['completed', 'rejected'].includes(application.status)
                          ? 'bg-insurance-green-500 w-full'
                          : 'bg-gray-200 w-0'
                      } transition-all duration-500`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        ['completed', 'rejected'].includes(application.status)
                          ? application.status === 'completed'
                            ? 'bg-insurance-green-500'
                            : 'bg-red-500'
                          : 'bg-gray-200'
                      }`} />
                      <span>完成</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {serviceApplications.length === 0 && (
            <div className="card p-12 text-center">
              <ClipboardList size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">暂无办理记录</p>
              <button
                onClick={() => setActiveTab('apply')}
                className="btn-primary"
              >
                去办理业务
              </button>
            </div>
          )}
        </div>
      )}

      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-lg text-gray-900">业务详情</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-insurance-blue-50 flex items-center justify-center">
                  {selectedService.icon && iconMap[selectedService.icon] && (
                    (() => {
                      const Icon = iconMap[selectedService.icon];
                      return <Icon size={32} className="text-insurance-blue-500" />;
                    })()
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{selectedService.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-insurance-blue-50 text-insurance-blue-600 text-xs rounded">
                      {selectedService.category}
                    </span>
                    {selectedService.hot && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-500 text-xs rounded flex items-center gap-1">
                        <Flame size={10} />
                        热门
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600">{selectedService.description}</p>

              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="font-medium text-gray-900 mb-3">办理信息</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">预计办理时间</span>
                    <span className="text-gray-900 font-medium">{selectedService.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">办理方式</span>
                    <span className="text-gray-900 font-medium">线上办理</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">所需材料</h5>
                <div className="space-y-2">
                  {selectedService.requiredMaterials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText size={18} className="text-insurance-blue-500" />
                      <span className="text-sm text-gray-700">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedService(null);
                  handleApply(selectedService);
                }}
                className="btn-primary w-full"
              >
                立即办理
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplyModal && applyingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">确认办理</h3>
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setApplyingService(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-insurance-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-insurance-blue-900">{applyingService.name}</h4>
                <p className="text-sm text-insurance-blue-700 mt-1">预计 {applyingService.estimatedTime}</p>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                您确认要提交此项业务申请吗？提交后请耐心等待审核结果。
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowApplyModal(false);
                    setApplyingService(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmApply}
                  className="btn-primary flex-1"
                >
                  确认提交
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
