# 医保小程序功能模块扩展与代码改进建议

## 一、项目概述

本项目是一个仿支付宝医保小程序的网页版应用，基于 React 18 + TypeScript + Vite + Tailwind CSS + Zustand 技术栈开发。现有核心功能包括：首页账户概览、医保支付、账户管理、医保二维码、业务办理、余额查询、帮助中心、系统设置等。

---

## 二、可扩展功能模块（从0-1开发）

### 1. 医保计算器模块
**功能描述**：帮助用户计算医保报销金额、自付比例、年度限额等。
**交互功能**：
- 选择就医类型（门诊/住院/购药）
- 输入医疗总费用
- 选择医院等级（一级/二级/三级）
- 实时计算医保统筹支付、个人账户支付、自费金额
- 显示费用明细构成饼图
- 保存计算历史记录

### 2. 定点医院导航模块
**功能描述**：展示附近的医保定点医院、药店信息。
**交互功能**：
- 列表展示定点医疗机构
- 按距离、等级、类型筛选
- 医疗机构详情页（地址、电话、营业时间、可报销项目）
- 收藏常用医院
- 模拟路线导航指引
- 医院评分与用户评价展示

### 3. 健康档案管理模块
**功能描述**：用户个人健康数据管理中心。
**交互功能**：
- 手动录入体检报告数据（身高、体重、血压、血糖等）
- 健康指标趋势图展示
- 就诊记录上传与管理
- 用药历史记录
- 过敏史、慢性病信息维护
- 健康数据可视化仪表盘

### 4. 医保政策问答模块
**功能描述**：智能问答系统解答用户医保相关问题。
**交互功能**：
- 常见问题分类展示
- 关键词搜索问题
- 模拟智能问答对话
- 问题反馈与点赞
- 问题收藏功能
- 政策法规原文查阅

### 5. 家庭成员管理模块
**功能描述**：管理家庭成员医保信息，支持代办业务。
**交互功能**：
- 添加家庭成员（配偶、子女、父母）
- 成员信息录入与维护
- 切换成员视角查看账户
- 为家庭成员代办业务
- 家庭账户总览
- 成员权限管理

### 6. 预约挂号模块
**功能描述**：在线预约医院门诊号源。
**交互功能**：
- 选择医院、科室、医生
- 查看医生排班表
- 选择就诊时间段
- 预约确认与取消
- 预约记录管理
- 就诊提醒设置

### 7. 用药提醒模块
**功能描述**：用药时间提醒与药品库存管理。
**交互功能**：
- 添加用药计划（药品名称、剂量、频次）
- 设置提醒时间
- 推送提醒通知（模拟）
- 药品库存管理
- 用药打卡记录
- 用药依从性统计

### 8. 体检套餐预约模块
**功能描述**：在线预约体检套餐，查看体检报告。
**交互功能**：
- 体检套餐列表展示
- 套餐详情与项目介绍
- 选择预约日期和时段
- 预约确认与取消
- 体检报告上传与查看
- 体检历史记录

### 9. 医保权益查询模块
**功能描述**：展示用户医保待遇、报销比例、年度限额等信息。
**交互功能**：
- 医保待遇分类展示
- 各项目报销比例说明
- 年度累计使用额度
- 剩余可用额度展示
- 待遇享受条件说明
- 权益变更历史记录

### 10. 投诉建议模块
**功能描述**：在线提交投诉、建议、满意度评价。
**交互功能**：
- 投诉类型选择（服务态度、流程繁琐、系统问题等）
- 问题描述与图片上传
- 满意度星级评价
- 提交进度追踪
- 历史投诉记录
- 回复与评价功能

### 11. 电子发票管理模块
**功能描述**：查看、下载医疗费用电子发票。
**交互功能**：
- 发票列表展示（按时间、医院筛选）
- 发票详情查看
- 发票下载（模拟）
- 发票报销状态标记
- 发票批量导出
- 发票真伪查验（模拟）

### 12. 慢病管理模块
**功能描述**：慢性病患者专项健康管理。
**交互功能**：
- 慢病类型选择（高血压、糖尿病等）
- 每日健康数据录入
- 数据趋势分析图表
- 用药依从性提醒
- 定期复诊提醒
- 健康建议推送

---

## 三、可迭代功能模块（在已有功能上开发）

### 1. 交易记录导出功能
**基于模块**：余额查询页
**功能描述**：支持将交易记录导出为文件。
**交互功能**：
- 选择导出时间范围
- 选择导出格式（PDF/Excel）
- 选择导出字段（日期、金额、类型、商户等）
- 导出进度展示
- 导出历史记录
- 文件下载（模拟）

### 2. 支付订单申诉功能
**基于模块**：医保支付页
**功能描述**：对有异议的支付订单发起申诉。
**交互功能**：
- 订单详情页增加"申诉"按钮
- 选择申诉原因（重复扣费、金额错误、未收到服务等）
- 申诉说明与凭证上传
- 申诉进度追踪
- 申诉结果通知
- 历史申诉记录

### 3. 业务办理材料上传功能
**基于模块**：业务办理页
**功能描述**：办理业务时支持上传所需材料。
**交互功能**：
- 业务办理流程增加材料上传步骤
- 拍照或从相册选择图片
- 图片预览与重新拍摄
- 上传进度展示
- 材料清单核对
- 已上传材料管理

### 4. 二维码安全设置功能
**基于模块**：医保二维码页
**功能描述**：增强二维码支付安全性。
**交互功能**：
- 设置二维码有效期（1分钟/5分钟/30分钟）
- 设置单笔支付限额
- 设置每日支付限额
- 开启/关闭免密支付
- 免密支付额度设置
- 二维码刷新频率设置

### 5. 账户安全中心模块
**基于模块**：账户管理/设置页
**功能描述**：全方位账户安全管理。
**交互功能**：
- 登录设备管理（查看、下线）
- 登录历史记录
- 支付密码修改
- 登录密码修改
- 指纹/面容识别开关
- 异常登录提醒设置

### 6. 消息通知分类管理
**基于模块**：账户管理页消息通知
**功能描述**：优化消息通知管理体验。
**交互功能**：
- 消息按类型分组（系统通知、支付通知、业务通知）
- 批量标记已读
- 全部标记已读
- 消息删除功能
- 推送开关设置（按消息类型）
- 重要消息置顶

### 7. 余额变动预警功能
**基于模块**：余额查询页
**功能描述**：账户余额异常变动提醒。
**交互功能**：
- 设置余额最低阈值提醒
- 设置大额支出提醒阈值
- 预警方式选择（消息通知/弹窗提醒）
- 预警记录查看
- 临时关闭预警
- 预警规则管理

### 8. 支付方式管理功能
**基于模块**：医保支付页
**功能描述**：管理多种支付方式。
**交互功能**：
- 添加银行卡（模拟）
- 银行卡列表管理
- 设置默认支付方式
- 支付顺序设置
- 银行卡解绑
- 支付方式选择弹窗优化

### 9. 服务评价功能
**基于模块**：业务办理页
**功能描述**：对已完成的业务进行评价。
**交互功能**：
- 已完成业务增加"评价"按钮
- 星级评分（1-5星）
- 评价标签选择（效率高、服务好、流程繁琐等）
- 文字评价输入
- 评价提交与修改
- 评价历史记录

### 10. 账单分期功能
**基于模块**：医保支付页
**功能描述**：大额医疗费用分期支付。
**交互功能**：
- 支付确认页增加"分期付款"选项
- 分期期数选择（3期/6期/12期）
- 分期费率与每期金额展示
- 分期协议确认
- 分期记录管理
- 提前还款功能（模拟）

### 11. 常用联系人功能
**基于模块**：账户管理页
**功能描述**：保存常用的医院、医生、药店信息。
**交互功能**：
- 添加常用联系人（医院/医生/药店）
- 联系人分类管理
- 联系人详情页
- 快速跳转挂号/支付
- 联系人排序
- 联系人搜索

### 12. 年度账单功能
**基于模块**：余额查询页
**功能描述**：生成年度医保消费总结报告。
**交互功能**：
- 年度总览（总收入、总支出、笔数）
- 消费分类统计图表
- 就诊医院排名
- 最大单笔支出
- 医保报销汇总
- 年度账单分享（模拟）

---

## 四、代码理解建议

### 建议1：深入理解状态管理架构

**核心代码位置**：
- [useStore.ts](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/store/useStore.ts)

**理解要点**：

1. **Zustand 状态管理模式**
   - 采用函数式创建 store，通过 `create` 方法定义状态和 actions
   - 状态与本地存储（localStorage）双向同步，通过 `getStorage`/`setStorage` 实现持久化
   - 每个状态更新动作都会同时更新内存状态和本地存储

2. **状态分片设计**
   ```typescript
   // 状态按业务领域分片存储
   user: User;                          // 用户信息
   insuranceAccount: InsuranceAccount;  // 医保账户
   transactions: Transaction[];         // 交易记录
   paymentOrders: PaymentOrder[];       // 支付订单
   serviceApplications: ServiceApplication[];  // 业务申请
   ```

3. **Action 设计模式**
   - 纯更新类：`updateUser`、`updateInsuranceAccount`
   - 添加类：`addTransaction`、`addPaymentOrder`、`addServiceApplication`
   - 复杂操作类：`resetToMockData`、`logout`
   - 每个 action 内部处理状态更新和存储同步

4. **存储键管理**
   - 使用 `STORAGE_KEYS` 对象统一管理存储键名，避免硬编码
   - 每个业务领域对应独立的存储键，便于数据隔离和迁移

**学习价值**：
- 理解无 Reducer 的状态管理模式
- 学习状态持久化的最佳实践
- 掌握大型应用状态分片策略

### 建议2：理解通用组件设计思想

**核心代码位置**：
- [InfoCard.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/components/Card/InfoCard.tsx)
- [StatusBadge.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/components/Card/StatusBadge.tsx)
- [Layout.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/components/Layout/Layout.tsx)

**理解要点**：

1. **InfoCard 组件 - 信息展示容器**
   ```typescript
   interface InfoCardProps {
     label: string;           // 标签文本
     value: string | number;  // 展示值
     icon?: React.ReactNode;  // 可选图标
     className?: string;      // 自定义样式
     valueClassName?: string; // 值的自定义样式
   }
   ```
   - 采用"配置驱动"设计，通过 props 控制展示内容
   - 使用 `cn` 工具函数合并 Tailwind 类名，支持样式扩展
   - 可选图标设计，兼顾简单场景和复杂场景

2. **StatusBadge 组件 - 状态标签**
   - 外部传入 `status` 字符串，内部通过 `getStatusText`/`getStatusColor` 映射
   - 支持自定义 className，便于在不同上下文复用
   - 纯展示组件，无内部状态，符合单一职责

3. **Layout 组件 - 布局容器**
   - 采用"插槽模式"，通过 `children` 接收页面内容
   - 内置 Navbar 和 TabBar，实现全局布局统一
   - 响应式设计：移动端底部导航，桌面端内边距适配

**设计模式共性**：
- 组件类型清晰：容器组件（Layout）、展示组件（InfoCard、StatusBadge）
- Props 设计遵循"最小必要"原则
- 样式可扩展，不硬编码业务逻辑
- 无副作用，纯函数组件

**学习价值**：
- 掌握组件粒度划分原则
- 学习可复用组件的设计技巧
- 理解"展示组件"与"容器组件"的职责边界

---

## 五、代码重构建议

### 建议1：提取通用业务逻辑为自定义 Hooks

**问题现状**：
- 多个页面存在重复的业务逻辑，如 [Home/index.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/pages/Home/index.tsx#L44-L60) 和 [Balance/index.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/pages/Balance/index.tsx#L29-L45) 中的余额数字滚动动画逻辑完全重复
- 支付流程逻辑在 [Payment/index.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/pages/Payment/index.tsx) 中过于庞大，单个组件超过 500 行

**重构方案**：

1. **创建 `useBalanceAnimation` Hook**
   ```typescript
   // src/hooks/useBalanceAnimation.ts
   import { useState, useEffect } from 'react';
   
   export function useBalanceAnimation(targetValue: number, duration: number = 1000) {
     const [displayValue, setDisplayValue] = useState(0);
   
     useEffect(() => {
       const steps = 30;
       const increment = targetValue / steps;
       let current = 0;
       const timer = setInterval(() => {
         current += increment;
         if (current >= targetValue) {
           setDisplayValue(targetValue);
           clearInterval(timer);
         } else {
           setDisplayValue(Math.floor(current * 100) / 100);
         }
       }, duration / steps);
       return () => clearInterval(timer);
     }, [targetValue, duration]);
   
     return displayValue;
   }
   ```

2. **创建 `usePaymentFlow` Hook**
   ```typescript
   // src/hooks/usePaymentFlow.ts
   import { useState, useCallback } from 'react';
   import { useStore } from '@/store/useStore';
   import type { PaymentOrder } from '@/types';
   
   type PaymentStep = 'idle' | 'scanning' | 'confirm' | 'password' | 'success' | 'failed';
   
   export function usePaymentFlow() {
     const [paymentStep, setPaymentStep] = useState<PaymentStep>('idle');
     const [password, setPassword] = useState('');
     const { addPaymentOrder, addTransaction, updateInsuranceAccount, insuranceAccount } = useStore();
   
     const startScan = useCallback(() => {
       setPaymentStep('scanning');
       setTimeout(() => setPaymentStep('confirm'), 2000);
     }, []);
   
     const confirmPayment = useCallback(() => {
       setPaymentStep('password');
     }, []);
   
     const verifyPassword = useCallback((pwd: string, mockOrder: PaymentOrder) => {
       return new Promise<boolean>((resolve) => {
         setTimeout(() => {
           if (pwd === '123456') {
             // 支付成功逻辑
             const totalSelfPayment = mockOrder.items.reduce((sum, item) => sum + item.selfPayment, 0);
             addPaymentOrder({ ...mockOrder, status: 'success', paymentDate: new Date().toISOString() });
             addTransaction({ /* ... */ });
             updateInsuranceAccount({ /* ... */ });
             setPaymentStep('success');
             resolve(true);
           } else {
             setPaymentStep('failed');
             resolve(false);
           }
         }, 500);
       });
     }, [addPaymentOrder, addTransaction, updateInsuranceAccount, insuranceAccount]);
   
     const reset = useCallback(() => {
       setPaymentStep('idle');
       setPassword('');
     }, []);
   
     return {
       paymentStep,
       password,
       setPassword,
       startScan,
       confirmPayment,
       verifyPassword,
       reset,
     };
   }
   ```

**重构收益**：
- 代码复用率提升，消除重复逻辑
- 组件职责更清晰，页面组件专注于 UI 渲染
- 业务逻辑可独立测试
- 便于后续功能扩展

### 建议2：统一表单处理与验证逻辑

**问题现状**：
- 表单处理分散在各个页面，如 [Account/index.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/pages/Account/index.tsx#L29-L45) 中的字段编辑逻辑
- 缺乏统一的表单验证机制
- 错误提示风格不统一

**重构方案**：

1. **创建通用表单 Hook**
   ```typescript
   // src/hooks/useForm.ts
   import { useState, useCallback } from 'react';
   
   interface ValidationRule<T> {
     field: keyof T;
     validator: (value: any) => boolean;
     message: string;
   }
   
   export function useForm<T extends Record<string, any>>(
     initialValues: T,
     validationRules?: ValidationRule<T>[]
   ) {
     const [values, setValues] = useState<T>(initialValues);
     const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
     const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
   
     const setFieldValue = useCallback((field: keyof T, value: any) => {
       setValues(prev => ({ ...prev, [field]: value }));
       setTouched(prev => ({ ...prev, [field]: true }));
       // 实时验证
       if (validationRules) {
         const rule = validationRules.find(r => r.field === field);
         if (rule && !rule.validator(value)) {
           setErrors(prev => ({ ...prev, [field]: rule.message }));
         } else {
           setErrors(prev => ({ ...prev, [field]: undefined }));
         }
       }
     }, [validationRules]);
   
     const validateAll = useCallback(() => {
       if (!validationRules) return true;
       const newErrors: Partial<Record<keyof T, string>> = {};
       let isValid = true;
       validationRules.forEach(rule => {
         if (!rule.validator(values[rule.field])) {
           newErrors[rule.field] = rule.message;
           isValid = false;
         }
       });
       setErrors(newErrors);
       return isValid;
     }, [values, validationRules]);
   
     const reset = useCallback(() => {
       setValues(initialValues);
       setErrors({});
       setTouched({});
     }, [initialValues]);
   
     return {
       values,
       errors,
       touched,
       setFieldValue,
       validateAll,
       reset,
     };
   }
   ```

2. **创建通用表单字段组件**
   ```typescript
   // src/components/Form/FormField.tsx
   import { cn } from '@/lib/utils';
   
   interface FormFieldProps {
     label: string;
     error?: string;
     touched?: boolean;
     children: React.ReactNode;
     className?: string;
   }
   
   export default function FormField({ label, error, touched, children, className }: FormFieldProps) {
     return (
       <div className={cn('space-y-1', className)}>
         <label className="block text-sm font-medium text-gray-700">{label}</label>
         {children}
         {touched && error && (
           <p className="text-sm text-red-500">{error}</p>
         )}
       </div>
     );
   }
   ```

**重构收益**：
- 表单处理逻辑统一，减少重复代码
- 验证规则可配置，便于维护
- 错误提示风格一致，提升用户体验
- 表单状态管理清晰，便于调试

---

## 六、代码测试建议

### 建议1：工具函数单元测试

**测试范围**：
- [format.ts](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/utils/format.ts) - 格式化工具函数
- [storage.ts](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/utils/storage.ts) - 存储工具函数
- [utils.ts](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/lib/utils.ts) - 通用工具函数

**测试方案**：

1. **格式化函数测试（format.test.ts）**
   ```typescript
   import { describe, it, expect } from 'vitest';
   import {
     formatCurrency,
     formatCurrencyNoSymbol,
     formatDate,
     formatPhone,
     formatIdCard,
     getStatusText,
     getStatusColor,
     getTransactionTypeText,
     getTransactionTypeColor,
   } from '@/utils/format';
   
   describe('formatCurrency', () => {
     it('should format number to CNY currency', () => {
       expect(formatCurrency(1234.56)).toBe('¥1,234.56');
       expect(formatCurrency(0)).toBe('¥0.00');
       expect(formatCurrency(1000000)).toBe('¥1,000,000.00');
     });
   });
   
   describe('formatPhone', () => {
     it('should format phone number with asterisks', () => {
       expect(formatPhone('13812345678')).toBe('138****5678');
       expect(formatPhone('138****5678')).toBe('138****5678'); // 已脱敏不处理
       expect(formatPhone('')).toBe('');
     });
   });
   
   describe('formatIdCard', () => {
     it('should format ID card with asterisks', () => {
       expect(formatIdCard('310101199001011234')).toBe('310101********1234');
       expect(formatIdCard('')).toBe('');
     });
   });
   
   describe('getStatusText', () => {
     it('should return correct status text', () => {
       expect(getStatusText('success')).toBe('支付成功');
       expect(getStatusText('pending')).toBe('待支付');
       expect(getStatusText('unknown')).toBe('unknown'); // 未知状态返回原值
     });
   });
   ```

2. **存储函数测试（storage.test.ts）**
   ```typescript
   import { describe, it, expect, beforeEach, afterEach } from 'vitest';
   import { getStorage, setStorage, removeStorage, clearStorage } from '@/utils/storage';
   
   describe('storage utilities', () => {
     beforeEach(() => {
       localStorage.clear();
     });
   
     it('should set and get value from localStorage', () => {
       setStorage('test_key', { name: 'test', value: 123 });
       const result = getStorage('test_key', null);
       expect(result).toEqual({ name: 'test', value: 123 });
     });
   
     it('should return default value when key not exists', () => {
       const result = getStorage('non_existent', 'default');
       expect(result).toBe('default');
     });
   
     it('should handle invalid JSON gracefully', () => {
       localStorage.setItem('invalid_json', 'not a json');
       const result = getStorage('invalid_json', 'default');
       expect(result).toBe('default');
     });
   
     it('should remove item from localStorage', () => {
       setStorage('test_key', 'value');
       removeStorage('test_key');
       expect(localStorage.getItem('test_key')).toBeNull();
     });
   
     it('should clear all items from localStorage', () => {
       setStorage('key1', 'value1');
       setStorage('key2', 'value2');
       clearStorage();
       expect(localStorage.length).toBe(0);
     });
   });
   ```

3. **类名合并函数测试（utils.test.ts）**
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { cn } from '@/lib/utils';
   
   describe('cn function', () => {
     it('should merge class names correctly', () => {
       expect(cn('foo', 'bar')).toBe('foo bar');
       expect(cn('foo', undefined, 'bar')).toBe('foo bar');
       expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
       expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
     });
   
     it('should handle Tailwind conflicts', () => {
       expect(cn('px-2', 'px-4')).toBe('px-4');
       expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
     });
   });
   ```

**测试收益**：
- 确保工具函数的正确性和稳定性
- 便于后续重构时验证功能不被破坏
- 作为文档，清晰展示函数预期行为

### 建议2：状态管理与组件交互测试

**测试范围**：
- [useStore.ts](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/store/useStore.ts) - 状态管理
- 通用组件：[InfoCard.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/components/Card/InfoCard.tsx)、[StatusBadge.tsx](file:///Volumes/ExMac/traeProject/全栈/tl-9/tl-9-1/src/components/Card/StatusBadge.tsx)
- 页面交互流程：支付流程、业务办理流程

**测试方案**：

1. **状态管理测试（useStore.test.ts）**
   ```typescript
   import { describe, it, expect, beforeEach, afterEach } from 'vitest';
   import { act, renderHook } from '@testing-library/react';
   import { useStore } from '@/store/useStore';
   import { mockUser } from '@/data/mockData';
   
   describe('useStore', () => {
     beforeEach(() => {
       localStorage.clear();
     });
   
     it('should initialize with mock data', () => {
       const { result } = renderHook(() => useStore());
       expect(result.current.user).toEqual(mockUser);
       expect(result.current.transactions.length).toBeGreaterThan(0);
     });
   
     it('should update user information', () => {
       const { result } = renderHook(() => useStore());
       
       act(() => {
         result.current.updateUser({ email: 'new@example.com' });
       });
       
       expect(result.current.user.email).toBe('new@example.com');
       // 验证 localStorage 同步
       const stored = JSON.parse(localStorage.getItem('insurance_user') || '{}');
       expect(stored.email).toBe('new@example.com');
     });
   
     it('should add transaction correctly', () => {
       const { result } = renderHook(() => useStore());
       const initialCount = result.current.transactions.length;
       const newTransaction = {
         id: 'test_tx',
         accountId: 'acc001',
         type: 'expense' as const,
         amount: 100,
         description: '测试交易',
         transactionDate: '2026-01-01',
         merchant: '测试商户',
         category: '门诊',
       };
       
       act(() => {
         result.current.addTransaction(newTransaction);
       });
       
       expect(result.current.transactions.length).toBe(initialCount + 1);
       expect(result.current.transactions[0]).toEqual(newTransaction);
     });
   
     it('should add payment order and update balance', () => {
       const { result } = renderHook(() => useStore());
       const initialBalance = result.current.insuranceAccount.personalAccount;
       const order = {
         id: 'test_order',
         userId: 'user001',
         orderNo: 'TEST001',
         amount: 200,
         hospital: '测试医院',
         department: '内科',
         status: 'success' as const,
         paymentDate: '2026-01-01',
         items: [
           { name: '测试项目', amount: 200, insuranceCoverage: 160, selfPayment: 40 },
         ],
       };
       
       act(() => {
         result.current.addPaymentOrder(order);
         result.current.updateInsuranceAccount({
           personalAccount: initialBalance - 40,
           totalBalance: result.current.insuranceAccount.totalBalance - 40,
         });
       });
       
       expect(result.current.paymentOrders[0]).toEqual(order);
       expect(result.current.insuranceAccount.personalAccount).toBe(initialBalance - 40);
     });
   
     it('should reset to mock data', () => {
       const { result } = renderHook(() => useStore());
       
       act(() => {
         result.current.updateUser({ name: '测试用户' });
         result.current.resetToMockData();
       });
       
       expect(result.current.user.name).toBe(mockUser.name);
     });
   });
   ```

2. **通用组件测试（InfoCard.test.tsx）**
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import InfoCard from '@/components/Card/InfoCard';
   import { CircleDollarSign } from 'lucide-react';
   
   describe('InfoCard component', () => {
     it('should render label and value correctly', () => {
       render(<InfoCard label="账户余额" value="¥1,234.56" />);
       expect(screen.getByText('账户余额')).toBeInTheDocument();
       expect(screen.getByText('¥1,234.56')).toBeInTheDocument();
     });
   
     it('should render icon when provided', () => {
       render(
         <InfoCard
           label="账户余额"
           value="¥1,234.56"
           icon={<CircleDollarSign data-testid="icon" />}
         />
       );
       expect(screen.getByTestId('icon')).toBeInTheDocument();
     });
   
     it('should apply custom class names', () => {
       const { container } = render(
         <InfoCard
           label="测试"
           value="100"
           className="custom-class"
           valueClassName="text-red-500"
         />
       );
       expect(container.firstChild).toHaveClass('custom-class');
       expect(screen.getByText('100')).toHaveClass('text-red-500');
     });
   });
   ```

3. **支付流程集成测试（Payment.test.tsx）**
   ```typescript
   import { describe, it, expect, beforeEach } from 'vitest';
   import { render, screen, fireEvent, waitFor } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import Payment from '@/pages/Payment/index';
   
   function renderWithRouter(ui: React.ReactElement) {
     return render(<MemoryRouter>{ui}</MemoryRouter>);
   }
   
   describe('Payment page flow', () => {
     beforeEach(() => {
       localStorage.clear();
     });
   
     it('should start with idle state', () => {
       renderWithRouter(<Payment />);
       expect(screen.getByText('扫码支付')).toBeInTheDocument();
       expect(screen.getByRole('button', { name: '开始扫码' })).toBeInTheDocument();
     });
   
     it('should transition to scanning state', async () => {
       renderWithRouter(<Payment />);
       fireEvent.click(screen.getByRole('button', { name: '开始扫码' }));
       
       await waitFor(() => {
         expect(screen.getByText('正在识别二维码...')).toBeInTheDocument();
       });
     });
   
     it('should show confirm payment after scanning', async () => {
       renderWithRouter(<Payment />);
       fireEvent.click(screen.getByRole('button', { name: '开始扫码' }));
       
       await waitFor(() => {
         expect(screen.getByText('确认支付')).toBeInTheDocument();
       }, { timeout: 3000 });
       
       expect(screen.getByText('应付金额')).toBeInTheDocument();
     });
   
     it('should show password modal on confirm', async () => {
       renderWithRouter(<Payment />);
       fireEvent.click(screen.getByRole('button', { name: '开始扫码' }));
       
       await waitFor(() => {
         expect(screen.getByText('确认支付')).toBeInTheDocument();
       }, { timeout: 3000 });
       
       fireEvent.click(screen.getByRole('button', { name: '确认支付' }));
       expect(screen.getByText('请输入支付密码')).toBeInTheDocument();
     });
   
     it('should switch to orders tab', () => {
       renderWithRouter(<Payment />);
       fireEvent.click(screen.getByRole('tab', { name: '支付记录' }));
       expect(screen.getByPlaceholderText('搜索医院、科室、订单号')).toBeInTheDocument();
     });
   });
   ```

**测试收益**：
- 验证核心业务流程的正确性
- 确保组件渲染和交互符合预期
- 提前发现状态更新和存储同步问题
- 为后续功能迭代提供安全网

---

## 七、代码工程化建议

### 建议1：建立规范的项目目录结构与导入策略

**问题现状**：
- 部分工具函数分散在 `src/lib/utils.ts` 和 `src/utils/` 目录，职责边界不够清晰
- 路径别名配置在 `tsconfig.json` 和 `vite.config.ts`，但缺乏统一的导入规范
- 缺少模块索引文件，导入路径冗长

**改进方案**：

1. **目录结构优化**
   ```
   src/
   ├── components/          # 通用组件
   │   ├── Card/           # 卡片类组件
   │   ├── Form/           # 表单组件
   │   ├── Layout/         # 布局组件
   │   ├── Loading/        # 加载组件
   │   ├── Modal/          # 弹窗组件（新增）
   │   └── index.ts        # 组件统一导出
   ├── hooks/              # 自定义 Hooks
   │   ├── useTheme.ts
   │   ├── useForm.ts      # 新增
   │   ├── usePaymentFlow.ts  # 新增
   │   └── index.ts        # Hooks 统一导出
   ├── pages/              # 页面组件
   │   ├── Home/
   │   ├── Payment/
   │   └── ...
   ├── store/              # 状态管理
   │   ├── useStore.ts
   │   └── index.ts
   ├── types/              # TypeScript 类型定义
   │   ├── index.ts
   │   └── form.ts         # 表单相关类型（新增）
   ├── utils/              # 业务工具函数
   │   ├── format.ts       # 格式化工具
   │   ├── storage.ts      # 存储工具
   │   ├── validation.ts   # 验证工具（新增）
   │   └── index.ts        # 统一导出
   ├── lib/                # 第三方库封装
   │   ├── utils.ts        # cn 等基础工具
   │   └── index.ts
   ├── data/               # 静态数据
   │   └── mockData.ts
   ├── constants/          # 常量配置（新增）
   │   ├── routes.ts       # 路由常量
   │   ├── regex.ts        # 正则常量
   │   └── index.ts
   └── styles/             # 样式文件（新增）
       ├── variables.css
       └── animations.css
   ```

2. **创建模块索引文件**
   ```typescript
   // src/components/index.ts
   export { default as Layout } from './Layout/Layout';
   export { default as Navbar } from './Layout/Navbar';
   export { default as TabBar } from './Layout/TabBar';
   export { default as InfoCard } from './Card/InfoCard';
   export { default as StatusBadge } from './Card/StatusBadge';
   export { default as Loading } from './Loading/Loading';
   export { default as EmptyState } from './EmptyState/EmptyState';
   ```

   ```typescript
   // src/utils/index.ts
   export * from './format';
   export * from './storage';
   export * from './validation';
   ```

   ```typescript
   // src/hooks/index.ts
   export { useTheme } from './useTheme';
   export { useForm } from './useForm';
   export { usePaymentFlow } from './usePaymentFlow';
   export { useBalanceAnimation } from './useBalanceAnimation';
   ```

3. **路径别名配置优化**
   在 `tsconfig.json` 中添加更多别名：
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["src/*"],
         "@components/*": ["src/components/*"],
         "@components": ["src/components"],
         "@hooks/*": ["src/hooks/*"],
         "@hooks": ["src/hooks"],
         "@utils/*": ["src/utils/*"],
         "@utils": ["src/utils"],
         "@types/*": ["src/types/*"],
         "@types": ["src/types"],
         "@store/*": ["src/store/*"],
         "@store": ["src/store"],
         "@constants/*": ["src/constants/*"],
         "@constants": ["src/constants"]
       }
     }
   }
   ```

4. **导入规范**
   ```typescript
   // ✅ 推荐：使用统一别名
   import { InfoCard, StatusBadge } from '@components';
   import { useForm, useTheme } from '@hooks';
   import { formatCurrency, formatDate } from '@utils';
   import type { User, Transaction } from '@types';
   
   // ❌ 避免：冗长的相对路径
   import InfoCard from '../../components/Card/InfoCard';
   import { formatCurrency } from '../../utils/format';
   ```

**工程化收益**：
- 目录结构清晰，便于新人理解项目
- 导入语句简洁，减少路径错误
- 模块职责明确，便于维护和迁移
- 支持 Tree Shaking，优化打包体积

### 建议2：建立代码规范与自动化检查体系

**问题现状**：
- 已有 ESLint 配置，但缺少 Prettier 代码格式化
- 缺少 Git 提交规范检查
- 缺少 CI/CD 流程配置
- 缺少类型检查和构建的自动化

**改进方案**：

1. **集成 Prettier 代码格式化**
   安装依赖：
   ```bash
   pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
   ```

   创建 `.prettierrc`：
   ```json
   {
     "semi": true,
     "trailingComma": "all",
     "singleQuote": true,
     "printWidth": 100,
     "tabWidth": 2,
     "arrowParens": "always",
     "endOfLine": "lf"
   }
   ```

   创建 `.prettierignore`：
   ```
   node_modules
   dist
   dist-ssr
   *.local
   ```

   更新 `eslint.config.js`：
   ```javascript
   import js from '@eslint/js';
   import globals from 'globals';
   import reactHooks from 'eslint-plugin-react-hooks';
   import reactRefresh from 'eslint-plugin-react-refresh';
   import tseslint from 'typescript-eslint';
   import prettier from 'eslint-plugin-prettier';
   import prettierConfig from 'eslint-config-prettier';
   
   export default tseslint.config(
     { ignores: ['dist'] },
     {
       extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
       files: ['**/*.{ts,tsx}'],
       languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
       },
       plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         prettier,
       },
       rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
           'warn',
           { allowConstantExport: true },
         ],
         'prettier/prettier': 'error',
         '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
       },
     },
   );
   ```

2. **集成 Husky + lint-staged + commitlint**
   安装依赖：
   ```bash
   pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
   ```

   在 `package.json` 添加 scripts：
   ```json
   {
     "scripts": {
       "prepare": "husky",
       "lint-staged": "lint-staged",
       "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
     },
     "lint-staged": {
       "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
       "src/**/*.{css,md,json}": ["prettier --write"]
     }
   }
   ```

   创建 commitlint 配置 `commitlint.config.js`：
   ```javascript
   export default {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         [
           'feat',     // 新功能
           'fix',      // 修复 bug
           'docs',     // 文档更新
           'style',    // 代码格式
           'refactor', // 重构
           'perf',     // 性能优化
           'test',     // 测试
           'build',    // 构建系统
           'ci',       // CI/CD
           'chore',    // 杂项
           'revert',   // 回滚
         ],
       ],
       'subject-case': [0],
     },
   };
   ```

   初始化 Husky 并添加 hooks：
   ```bash
   pnpm prepare
   pnpm husky add .husky/pre-commit "pnpm lint-staged"
   pnpm husky add .husky/commit-msg "pnpm commitlint --edit $1"
   ```

3. **配置 GitHub Actions CI/CD**
   创建 `.github/workflows/ci.yml`：
   ```yaml
   name: CI
   
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main, develop]
   
   jobs:
     build-and-test:
       runs-on: ubuntu-latest
       
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup pnpm
           uses: pnpm/action-setup@v4
           with:
             version: 9
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'pnpm'
         
         - name: Install dependencies
           run: pnpm install --frozen-lockfile
         
         - name: Type check
           run: pnpm check
         
         - name: Lint
           run: pnpm lint
         
         - name: Test
           run: pnpm test
         
         - name: Build
           run: pnpm build
         
         - name: Upload build artifacts
           uses: actions/upload-artifact@v4
           with:
             name: dist
             path: dist
   ```

4. **添加 Git 忽略规则**
   更新 `.gitignore`：
   ```
   # Logs
   logs
   *.log
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   pnpm-debug.log*
   lerna-debug.log*
   
   node_modules
   dist
   dist-ssr
   *.local
   
   # Editor directories and files
   .vscode/*
   !.vscode/extensions.json
   .idea
   .DS_Store
   *.suo
   *.ntvs*
   *.njsproj
   *.sln
   *.sw?
   
   # Environment variables
   .env
   .env.local
   .env.*.local
   
   # Testing
   coverage
   .nyc_output
   
   # Husky
   .husky/_
   ```

5. **添加 VS Code 工作区配置**
   创建 `.vscode/settings.json`：
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     },
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true,
     "tailwindCSS.experimental.classRegex": [
       ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
     ]
   }
   ```

   创建 `.vscode/extensions.json`：
   ```json
   {
     "recommendations": [
       "dbaeumer.vscode-eslint",
       "esbenp.prettier-vscode",
       "bradlc.vscode-tailwindcss",
       "christian-kohler.path-intellisense",
       "streetsidesoftware.code-spell-checker"
     ]
   }
   ```

**工程化收益**：
- 代码风格统一，减少格式化讨论
- 提交信息规范，便于生成 Changelog
- 自动化检查，提前发现问题
- CI/CD 保障代码质量，防止错误代码合并
- 团队协作效率提升，减少代码审查中的格式问题

---

## 八、总结

本项目作为一个医保小程序的前端演示应用，已经具备了较为完整的核心功能和良好的代码基础。通过上述功能扩展和代码改进建议，可以：

1. **功能层面**：从12个全新模块和12个迭代增强功能两个维度，构建更加完善的医保服务生态，覆盖用户从查询、支付、业务办理到健康管理的全流程需求。

2. **代码质量层面**：通过深入理解现有架构、提取通用 Hooks、统一表单处理、完善测试体系、加强工程化建设，显著提升代码的可维护性、可扩展性和健壮性。

3. **团队协作层面**：建立统一的代码规范和自动化检查流程，降低团队协作成本，提升开发效率。

所有建议均基于现有技术栈，无需引入新的重量级依赖，可逐步落地实施。
