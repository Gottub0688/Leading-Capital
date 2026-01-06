# 🏠 澳洲新房销售管理系统

Property Sales Hub - 一个用于管理和展示新房楼盘的应用

## 功能特点

- 📍 地图可视化展示所有楼盘
- 🔍 搜索和筛选功能
- 📱 响应式设计，支持手机和电脑
- ➕ 添加和管理楼盘信息

## 快速部署

### 方法一：Vercel 部署（最简单）

1. Fork 这个仓库到你的 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 点击 "Deploy"
6. 等待 1-2 分钟，部署完成！

### 方法二：本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 方法三：Netlify 部署

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `dist` 文件夹到页面上
3. 完成！

## 项目结构

```
property-sales-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 样式文件
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 自定义楼盘数据

编辑 `src/App.jsx` 文件中的 `initialProperties` 数组来添加你的楼盘数据：

```javascript
const initialProperties = [
  {
    id: 1,
    name: "楼盘名称",
    developer: "开发商",
    address: "详细地址",
    suburb: "区域",
    lat: -33.8688,        // 纬度
    lng: 151.2093,        // 经度
    totalUnits: 100,      // 总套数
    availableUnits: 50,   // 可售套数
    priceRange: { min: 500000, max: 1000000 },
    avgPrice: 750000,
    launchDate: "2024-03-15",
    completionDate: "2026-06",
    status: "selling",    // selling | coming_soon | sold_out
    propertyType: "Apartment",
    bedrooms: [1, 2, 3],
    features: ["海景", "泳池", "健身房"],
    description: "项目描述...",
    contactName: "联系人",
    contactPhone: "0412 345 678",
    contactEmail: "email@example.com",
    image: "🏙️"
  },
  // 更多楼盘...
];
```

## 后续功能扩展

如需以下功能，请联系开发：
- 🗺️ 接入 Google Maps API
- 💾 连接后端数据库
- 👥 客户管理系统
- 📅 预约看房功能
- 📊 数据分析报表

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Lucide Icons

---

Made with ❤️ for Australian Property Sales
