export interface User {
  id: string;
  name: string;
  idCard: string;
  phone: string;
  avatar: string;
  email?: string;
  address?: string;
}

export interface InsuranceAccount {
  id: string;
  userId: string;
  totalBalance: number;
  personalAccount: number;
  overallAccount: number;
  status: 'normal' | 'suspended' | 'cancelled';
  insuredUnit: string;
  paymentBase: number;
  lastPaymentDate: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  transactionDate: string;
  merchant: string;
  category: string;
}

export interface PaymentOrder {
  id: string;
  userId: string;
  orderNo: string;
  amount: number;
  hospital: string;
  department: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentDate: string;
  items: {
    name: string;
    amount: number;
    insuranceCoverage: number;
    selfPayment: number;
  }[];
}

export interface ServiceApplication {
  id: string;
  userId: string;
  serviceType: string;
  title: string;
  status: 'draft' | 'reviewing' | 'approved' | 'rejected' | 'completed';
  applyDate: string;
  remark: string;
  estimatedTime: string;
}

export interface InsuranceService {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requiredMaterials: string[];
  estimatedTime: string;
  hot: boolean;
}

export interface QuickAction {
  id: string;
  name: string;
  icon: string;
  path: string;
  color: string;
}

export type StatusType = PaymentOrder['status'] | ServiceApplication['status'];

export interface ScanRecord {
  id: string;
  accountId: string;
  merchant: string;
  amount: number;
  type: 'payment' | 'identity' | 'registration';
  status: 'success' | 'failed';
  scanTime: string;
  location: string;
}

export type QrCodeStatus = 'active' | 'suspended' | 'lost';

export interface QrCodeStatusInfo {
  status: QrCodeStatus;
  reason?: string;
  operateTime?: string;
}
