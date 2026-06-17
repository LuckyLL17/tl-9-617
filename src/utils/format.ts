export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatCurrencyNoSymbol = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateStr: string, format: 'full' | 'short' | 'date' = 'full'): string => {
  const date = new Date(dateStr);
  
  if (format === 'short') {
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    });
  }
  
  if (format === 'date') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  if (phone.includes('*')) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

export const formatIdCard = (idCard: string): string => {
  if (!idCard) return '';
  if (idCard.includes('*')) return idCard;
  if (idCard.length === 18) {
    return `${idCard.slice(0, 6)}********${idCard.slice(14)}`;
  }
  return idCard;
};

export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: '待支付',
    success: '支付成功',
    failed: '支付失败',
    refunded: '已退款',
    draft: '草稿',
    reviewing: '审核中',
    approved: '已通过',
    rejected: '已驳回',
    completed: '已完成',
    normal: '正常参保',
    suspended: '参保暂停',
    cancelled: '已停保',
  };
  return statusMap[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    success: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
    draft: 'bg-gray-100 text-gray-700',
    reviewing: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    completed: 'bg-green-100 text-green-700',
    normal: 'bg-green-100 text-green-700',
    suspended: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-gray-100 text-gray-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
};

export const getTransactionTypeText = (type: string): string => {
  return type === 'income' ? '收入' : '支出';
};

export const getTransactionTypeColor = (type: string): string => {
  return type === 'income' ? 'text-insurance-green-600' : 'text-red-600';
};

export const getScanTypeText = (type: string): string => {
  const typeMap: Record<string, string> = {
    payment: '医保支付',
    identity: '身份核验',
    registration: '挂号登记',
  };
  return typeMap[type] || type;
};

export const getScanTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    payment: 'bg-insurance-blue-100 text-insurance-blue-700',
    identity: 'bg-insurance-green-100 text-insurance-green-700',
    registration: 'bg-insurance-orange-100 text-insurance-orange-700',
  };
  return colorMap[type] || 'bg-gray-100 text-gray-700';
};

export const getQrStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: '正常使用',
    suspended: '暂停使用',
    lost: '已挂失',
  };
  return statusMap[status] || status;
};

export const getQrStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-yellow-100 text-yellow-700',
    lost: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
};
