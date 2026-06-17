import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Search, ChevronDown, ChevronUp, MessageCircle, CreditCard, FileText, Shield, QrCode, Clock } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
  icon: typeof CreditCard;
}

const faqCategories = [
  { value: 'all', label: '全部' },
  { value: 'payment', label: '医保支付' },
  { value: 'account', label: '账户管理' },
  { value: 'service', label: '业务办理' },
  { value: 'qrcode', label: '医保码' },
];

const faqs: FAQ[] = [
  { q: '如何使用医保电子凭证？', a: '点击首页"医保码"按钮，出示二维码即可在定点医院、药店扫码使用。二维码每60秒自动刷新，确保安全。', icon: QrCode },
  { q: '医保支付密码忘记了怎么办？', a: '您可以通过"账户设置-修改密码"功能，使用手机号验证后重新设置支付密码。如有疑问可拨打医保服务热线12393。', icon: CreditCard },
  { q: '业务办理进度如何查询？', a: '点击"业务办理-办理进度"标签，即可查看所有申请的业务进度，包括审核状态和预计完成时间。', icon: FileText },
  { q: '账户余额多久更新一次？', a: '个人账户余额在缴费到账后实时更新，一般为每月15日左右。您可以在"余额查询"页面查看详细的收支记录。', icon: Shield },
  { q: '异地就医如何备案？', a: '在"业务办理"中选择"异地就医备案"，填写相关信息并提交材料，预计3个工作日内完成审核。审核通过后即可在异地定点医院直接结算。', icon: FileText },
  { q: '医保码为什么会失效？', a: '医保码每60秒自动刷新以保障安全。如果二维码失效，请刷新页面或重新点击"医保码"按钮获取新的二维码。', icon: QrCode },
  { q: '支付失败怎么办？', a: '支付失败可能是由于余额不足、密码错误或网络问题。请检查账户余额是否充足，确认支付密码是否正确，或稍后重试。如问题持续，请联系医保服务热线。', icon: CreditCard },
  { q: '如何修改个人信息？', a: '在"个人中心-个人信息"中，点击邮箱或地址旁的编辑按钮即可修改。姓名、身份证号等核心信息需携带相关证件到医保经办机构办理变更。', icon: MessageCircle },
  { q: '消费记录可以保留多久？', a: '系统默认保留最近24个月的消费记录，您可以在"余额查询-交易记录"中查看和筛选历史记录。如需更早的记录，请联系医保经办机构。', icon: Clock },
  { q: '定点医院如何查询？', a: '您可以在"余额查询"页面查看最近的消费记录，了解您去过的定点医院。完整的定点医院列表请登录当地医保局官网查询。', icon: Shield },
];

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = !searchText || faq.q.includes(searchText) || faq.a.includes(searchText);
    return matchesSearch;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">帮助中心</h1>
      </div>

      <div className="gradient-card rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">需要帮助？</h2>
          <p className="text-white/80 mb-6">常见问题解答，或拨打医保服务热线</p>
          <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Phone size={28} className="text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">医保服务热线</p>
              <p className="text-3xl font-bold">12393</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="搜索问题关键词..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-blue-500/20 focus:border-insurance-blue-500 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {faqCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-insurance-blue-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">常见问题</h3>
        {filteredFaqs.map((faq, index) => {
          const Icon = faq.icon;
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className="card card-hover overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full flex items-start justify-between p-5 text-left"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-insurance-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-insurance-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{faq.q}</p>
                  </div>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 pt-0">
                  <div className="ml-14 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="card p-12 text-center">
          <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">未找到相关问题</p>
          <p className="text-sm text-gray-400 mt-1">请尝试其他关键词或拨打12393</p>
        </div>
      )}

      <div className="card p-6">
        <h3 className="font-bold text-gray-900 mb-4">没有找到答案？</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl bg-insurance-blue-50 hover:bg-insurance-blue-100 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-insurance-blue-500 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">在线客服</p>
              <p className="text-xs text-gray-500">7*24小时在线</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl bg-insurance-green-50 hover:bg-insurance-green-100 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-insurance-green-500 flex items-center justify-center">
              <Phone size={20} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">电话咨询</p>
              <p className="text-xs text-gray-500">工作日 9:00-17:00</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
