import { create } from 'zustand';
import type { User, InsuranceAccount, Transaction, PaymentOrder, ServiceApplication, InsuranceService, ScanRecord } from '@/types';
import { mockUser, mockInsuranceAccount, mockTransactions, mockPaymentOrders, mockServiceApplications, mockInsuranceServices, mockNotifications, mockInsurancePolicies, mockScanRecords } from '@/data/mockData';
import { getStorage, setStorage, clearStorage } from '@/utils/storage';

interface StoreState {
  user: User;
  insuranceAccount: InsuranceAccount;
  transactions: Transaction[];
  paymentOrders: PaymentOrder[];
  serviceApplications: ServiceApplication[];
  insuranceServices: InsuranceService[];
  notifications: Notification[];
  insurancePolicies: InsurancePolicy[];
  scanRecords: ScanRecord[];
  isQrPaused: boolean;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  updateInsuranceAccount: (account: Partial<InsuranceAccount>) => void;
  addTransaction: (transaction: Transaction) => void;
  addPaymentOrder: (order: PaymentOrder) => void;
  addServiceApplication: (application: ServiceApplication) => void;
  updateServiceApplication: (id: string, updates: Partial<ServiceApplication>) => void;
  markNotificationRead: (id: string) => void;
  addScanRecord: (record: ScanRecord) => void;
  toggleQrPause: () => void;
  resetToMockData: () => void;
  logout: () => void;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  read: boolean;
  date: string;
  type: 'system' | 'business' | 'payment';
}

export interface InsurancePolicy {
  id: string;
  policyNo: string;
  type: string;
  insurer: string;
  effectiveDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
  premium: number;
}

const STORAGE_KEYS = {
  USER: 'insurance_user',
  ACCOUNT: 'insurance_account',
  TRANSACTIONS: 'insurance_transactions',
  ORDERS: 'insurance_orders',
  APPLICATIONS: 'insurance_applications',
  SERVICES: 'insurance_services',
  NOTIFICATIONS: 'insurance_notifications',
  POLICIES: 'insurance_policies',
  SCAN_RECORDS: 'insurance_scan_records',
  QR_PAUSED: 'insurance_qr_paused',
};

export const useStore = create<StoreState>((set, get) => ({
  user: getStorage<User>(STORAGE_KEYS.USER, mockUser),
  insuranceAccount: getStorage<InsuranceAccount>(STORAGE_KEYS.ACCOUNT, mockInsuranceAccount),
  transactions: getStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, mockTransactions),
  paymentOrders: getStorage<PaymentOrder[]>(STORAGE_KEYS.ORDERS, mockPaymentOrders),
  serviceApplications: getStorage<ServiceApplication[]>(STORAGE_KEYS.APPLICATIONS, mockServiceApplications),
  insuranceServices: getStorage<InsuranceService[]>(STORAGE_KEYS.SERVICES, mockInsuranceServices),
  notifications: getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, mockNotifications),
  insurancePolicies: getStorage<InsurancePolicy[]>(STORAGE_KEYS.POLICIES, mockInsurancePolicies),
  scanRecords: getStorage<ScanRecord[]>(STORAGE_KEYS.SCAN_RECORDS, mockScanRecords),
  isQrPaused: getStorage<boolean>(STORAGE_KEYS.QR_PAUSED, false),

  setUser: (user) => {
    set({ user });
    setStorage(STORAGE_KEYS.USER, user);
  },

  updateUser: (updates) => {
    const { user } = get();
    const updated = { ...user, ...updates };
    set({ user: updated });
    setStorage(STORAGE_KEYS.USER, updated);
  },

  updateInsuranceAccount: (updates) => {
    const { insuranceAccount } = get();
    const updated = { ...insuranceAccount, ...updates };
    set({ insuranceAccount: updated });
    setStorage(STORAGE_KEYS.ACCOUNT, updated);
  },

  addTransaction: (transaction) => {
    const { transactions } = get();
    const updated = [transaction, ...transactions];
    set({ transactions: updated });
    setStorage(STORAGE_KEYS.TRANSACTIONS, updated);
  },

  addPaymentOrder: (order) => {
    const { paymentOrders } = get();
    const updated = [order, ...paymentOrders];
    set({ paymentOrders: updated });
    setStorage(STORAGE_KEYS.ORDERS, updated);
  },

  addServiceApplication: (application) => {
    const { serviceApplications } = get();
    const updated = [application, ...serviceApplications];
    set({ serviceApplications: updated });
    setStorage(STORAGE_KEYS.APPLICATIONS, updated);
  },

  updateServiceApplication: (id, updates) => {
    const { serviceApplications } = get();
    const updated = serviceApplications.map((app) =>
      app.id === id ? { ...app, ...updates } : app
    );
    set({ serviceApplications: updated });
    setStorage(STORAGE_KEYS.APPLICATIONS, updated);
  },

  markNotificationRead: (id) => {
    const { notifications } = get();
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    set({ notifications: updated });
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  addScanRecord: (record) => {
    const { scanRecords } = get();
    const updated = [record, ...scanRecords];
    set({ scanRecords: updated });
    setStorage(STORAGE_KEYS.SCAN_RECORDS, updated);
  },

  toggleQrPause: () => {
    const { isQrPaused } = get();
    const updated = !isQrPaused;
    set({ isQrPaused: updated });
    setStorage(STORAGE_KEYS.QR_PAUSED, updated);
  },

  resetToMockData: () => {
    set({
      user: mockUser,
      insuranceAccount: mockInsuranceAccount,
      transactions: mockTransactions,
      paymentOrders: mockPaymentOrders,
      serviceApplications: mockServiceApplications,
      insuranceServices: mockInsuranceServices,
      notifications: mockNotifications,
      insurancePolicies: mockInsurancePolicies,
      scanRecords: mockScanRecords,
      isQrPaused: false,
    });
    setStorage(STORAGE_KEYS.USER, mockUser);
    setStorage(STORAGE_KEYS.ACCOUNT, mockInsuranceAccount);
    setStorage(STORAGE_KEYS.TRANSACTIONS, mockTransactions);
    setStorage(STORAGE_KEYS.ORDERS, mockPaymentOrders);
    setStorage(STORAGE_KEYS.APPLICATIONS, mockServiceApplications);
    setStorage(STORAGE_KEYS.SERVICES, mockInsuranceServices);
    setStorage(STORAGE_KEYS.NOTIFICATIONS, mockNotifications);
    setStorage(STORAGE_KEYS.POLICIES, mockInsurancePolicies);
    setStorage(STORAGE_KEYS.SCAN_RECORDS, mockScanRecords);
    setStorage(STORAGE_KEYS.QR_PAUSED, false);
  },

  logout: () => {
    clearStorage();
    set({
      user: mockUser,
      insuranceAccount: mockInsuranceAccount,
      transactions: mockTransactions,
      paymentOrders: mockPaymentOrders,
      serviceApplications: mockServiceApplications,
      insuranceServices: mockInsuranceServices,
      notifications: mockNotifications,
      insurancePolicies: mockInsurancePolicies,
      scanRecords: mockScanRecords,
      isQrPaused: false,
    });
  },
}));
