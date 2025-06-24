# Next.js 企业级项目模板

一个基于 Next.js 15 + TypeScript + TailwindCSS + Ant Design 的现代化企业级前端项目模板。

## 🚀 技术栈

### 核心框架

- **Next.js 15** - React 全栈框架，支持 SSR/SSG/ISR
- **React 18** - UI 库
- **TypeScript 5** - 类型安全的 JavaScript 超集

### 样式解决方案

- **TailwindCSS 4** - 原子化 CSS 框架
- **Ant Design 5** - 企业级 UI 组件库
- **Sass** - CSS 预处理器
- **PostCSS** - CSS 后处理工具

### 状态管理

- **Redux Toolkit** - 现代化的 Redux 状态管理
- **React Redux** - React 的 Redux 绑定
- **next-redux-wrapper** - Next.js 的 Redux SSR 支持

### 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Stylelint** - CSS 代码规范
- **Husky** - Git hooks 管理
- **Commitlint** - 提交信息规范

### 工具库

- **Axios** - HTTP 客户端
- **Day.js** - 日期处理库
- **Lodash-es** - 实用工具库
- **ahooks** - React Hooks 工具集
- **classnames** - CSS 类名处理

## 📁 项目结构

```
template-nextjs/
├── public/                     # 静态资源目录
│   └── static/                 # 静态文件 (图片、字体等)
├── src/                        # 源代码目录
│   ├── assets/                 # 项目资源文件
│   │   └── svgs/              # SVG 图标资源
│   ├── components/            # 通用组件
│   │   └── RenderInBody/      # 示例：Portal 组件
│   ├── hooks/                 # 自定义 React Hooks
│   ├── layout/                # 布局组件
│   ├── pages/                 # Next.js 页面文件
│   ├── store/                 # Redux 状态管理
│   │   ├── services/          # API 服务层
│   │   └── slices/            # Redux 切片
│   └── utils/                 # 工具函数
├── types/                     # 全局类型定义
└── 配置文件...
```

## 📂 目录详细说明

### `/src/components/` - 通用组件

存放可复用的 React 组件：

```typescript
// 示例：按钮组件
export interface ButtonProps {
  type?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type = 'primary', children }) => {
  return <button className={`btn btn-${type}`}>{children}</button>;
};
```

### `/src/hooks/` - 自定义 Hooks

存放自定义的 React Hooks：

```typescript
// 示例：useInterval Hook
export const useInterval = (callback: () => void, delay: number | null) => {
  // Hook 逻辑
};
```

### `/src/layout/` - 布局组件

存放页面布局相关组件：

- `Header.tsx` - 页面头部
- `Footer.tsx` - 页面底部
- `SEO.tsx` - SEO 配置组件
- `index.tsx` - 主布局组件

### `/src/pages/` - 页面文件

Next.js 的文件系统路由：

- `_app.tsx` - 应用入口，全局配置
- `_document.tsx` - HTML 文档结构
- `index.tsx` - 首页
- `global.css` - 全局样式

### `/src/store/` - 状态管理

Redux Toolkit 状态管理：

#### `/store/slices/` - Redux 切片

```typescript
// 示例：user.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: User | null;
  isLoggedIn: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
  },
});
```

#### `/store/services/` - API 服务

```typescript
// 示例：user.ts
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (params: { auth: string }) => {
    const response = await api.get('/user/info', { headers: { Authorization: params.auth } });
    return response.data;
  },
);
```

### `/src/utils/` - 工具函数

存放通用的工具函数：

```typescript
// 示例：api.ts - API 请求封装
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// 示例：util.ts - 通用工具函数
export const formatDate = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
```

### `/src/assets/` - 项目资源

- `svgs/` - SVG 图标文件，支持 SVGR 自动转换为 React 组件

### `/types/` - 全局类型定义

```typescript
// 示例：tying.d.ts
type LabelValueList = {
  value: number | string;
  label: string;
  children?: {
    value: number | string;
    label: string;
  }[];
}[];
```

## 🛠️ 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev  # 启动开发服务器 (端口 8000)
```

### 构建部署

```bash
pnpm build    # 构建生产版本
pnpm start    # 启动生产服务器
```

### 代码规范

```bash
pnpm lint           # 运行所有检查
pnpm lint:js        # ESLint 检查
pnpm lint:style     # Stylelint 检查
pnpm prettier       # 格式化代码
```

## 🔧 核心特性

### 1. TypeScript 支持

- 严格的类型检查
- 路径别名 `@/*` 指向 `src/*`
- 全局类型定义

### 2. 样式解决方案

- TailwindCSS 4.0 原子化样式
- Ant Design 5 组件库
- Sass 预处理器
- PostCSS 自动处理

### 3. 状态管理

- Redux Toolkit 现代化状态管理
- SSR 状态同步
- 类型安全的 hooks

### 4. 开发体验

- 热重载开发环境
- 代码规范自动检查
- Git hooks 自动化
- 提交信息规范

### 5. 性能优化

- 自动代码分割
- 图片优化
- Bundle 分析
- 生产环境 console 移除

## 📋 编码规范

### 组件命名

- 组件文件使用 PascalCase: `UserProfile.tsx`
- 组件导出使用具名导出和默认导出

### 文件组织

- 每个功能模块独立文件夹
- 相关文件就近放置
- 使用 `index.ts` 统一导出

### 样式规范

- 优先使用 TailwindCSS 类名
- 复杂样式使用 Sass 模块
- 遵循 BEM 命名规范

### TypeScript 规范

- 严格类型定义
- 使用接口定义 Props
- 避免使用 `any` 类型
