# React + TypeScript + Vite + Web3

这是一个使用React、TypeScript和Vite构建的Web3应用程序模板，集成了MetaMask钱包连接功能。

## 功能特点

- 基于Vite的快速开发环境，支持HMR（热模块替换）
- TypeScript类型支持
- 以太坊钱包(MetaMask)连接功能
- 账户状态和网络变化监听

## 技术栈

- React 19
- TypeScript 5.8
- Vite 6.3
- ethers.js 5.7

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm preview
```

## Web3功能

该项目包含以下Web3相关功能：

- 连接MetaMask钱包
- 获取用户以太坊地址
- 监听账户变化
- 监听网络变化
- 显示当前连接的网络（主网、测试网等）

## ESLint配置

如果您正在开发生产应用程序，我们建议更新配置以启用类型感知的lint规则：

```js
export default tseslint.config({
  extends: [
    // 删除 ...tseslint.configs.recommended 并替换为以下内容
    ...tseslint.configs.recommendedTypeChecked,
    // 或者使用更严格的规则
    ...tseslint.configs.strictTypeChecked,
    // 可选，添加样式规则
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // 其他选项...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

您还可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 获取React特定的lint规则：

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // 添加react-x和react-dom插件
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // 其他规则...
    // 启用推荐的TypeScript规则
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
