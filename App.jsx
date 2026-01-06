import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Home, Building2, Calendar, DollarSign, Phone, Mail, ChevronLeft, Plus, X, Filter, List, Map as MapIcon, Bed, Bath, Car, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

// 模拟楼盘数据库
const initialProperties = [
  {
    id: 1,
    name: "Lumina Residences",
    developer: "Mirvac",
    address: "88 Harbour Street, Sydney NSW",
    suburb: "Sydney",
    lat: -33.8688,
    lng: 151.2093,
    totalUnits: 156,
    availableUnits: 42,
    priceRange: { min: 850000, max: 2800000 },
    avgPrice: 1250000,
    launchDate: "2024-03-15",
    completionDate: "2026-06",
    status: "selling",
    propertyType: "Apartment",
    bedrooms: [1, 2, 3],
    features: ["海景", "泳池", "健身房", "门禁系统"],
    description: "位于悉尼港湾的顶级公寓项目，享有无敌海景。",
    contactName: "Sarah Chen",
    contactPhone: "0412 345 678",
    contactEmail: "sarah@lumina.com.au",
    image: "🏙️"
  },
  {
    id: 2,
    name: "Parkview Gardens",
    developer: "Stockland",
    address: "25 Victoria Avenue, Chatswood NSW",
    suburb: "Chatswood",
    lat: -33.7969,
    lng: 151.1803,
    totalUnits: 89,
    availableUnits: 23,
    priceRange: { min: 680000, max: 1500000 },
    avgPrice: 920000,
    launchDate: "2024-01-20",
    completionDate: "2025-12",
    status: "selling",
    propertyType: "Apartment",
    bedrooms: [1, 2, 3],
    features: ["近火车站", "购物中心", "学区房", "停车位"],
    description: "Chatswood核心地段，步行可达火车站和Westfield。",
    contactName: "Michael Wong",
    contactPhone: "0423 456 789",
    contactEmail: "michael@parkview.com.au",
    image: "🌳"
  },
  {
    id: 3,
    name: "Azure Tower",
    developer: "Lendlease",
    address: "100 George Street, Parramatta NSW",
    suburb: "Parramatta",
    lat: -33.8151,
    lng: 151.0011,
    totalUnits: 220,
    availableUnits: 85,
    priceRange: { min: 520000, max: 1100000 },
    avgPrice: 750000,
    launchDate: "2024-06-01",
    completionDate: "2026-09",
    status: "coming_soon",
    propertyType: "Apartment",
    bedrooms: [1, 2, 3, 4],
    features: ["CBD核心", "地铁直达", "商业配套", "智能家居"],
    description: "Parramatta CBD标杆项目，坐享西悉尼发展红利。",
    contactName: "David Li",
    contactPhone: "0434 567 890",
    contactEmail: "david@azure.com.au",
    image: "🏢"
  },
  {
    id: 4,
    name: "Riverside Terrace",
    developer: "Crown Group",
    address: "15 Bennelong Parkway, Wentworth Point NSW",
    suburb: "Wentworth Point",
    lat: -33.8318,
    lng: 151.0772,
    totalUnits: 180,
    availableUnits: 12,
    priceRange: { min: 620000, max: 1350000 },
    avgPrice: 880000,
    launchDate: "2023-09-10",
    completionDate: "2025-06",
    status: "selling",
    propertyType: "Apartment",
    bedrooms: [2, 3],
    features: ["河景", "码头", "BBQ区", "访客停车"],
    description: "水景社区，享受悠闲水岸生活。",
    contactName: "Jenny Zhang",
    contactPhone: "0445 678 901",
    contactEmail: "jenny@riverside.com.au",
    image: "🌊"
  },
  {
    id: 5,
    name: "Green Valley Estate",
    developer: "Sekisui House",
    address: "200 Schofields Road, Schofields NSW",
    suburb: "Schofields",
    lat: -33.7008,
    lng: 150.8792,
    totalUnits: 350,
    availableUnits: 156,
    priceRange: { min: 750000, max: 1200000 },
    avgPrice: 920000,
    launchDate: "2024-02-01",
    completionDate: "2025-09",
    status: "selling",
    propertyType: "House & Land",
    bedrooms: [3, 4, 5],
    features: ["独栋别墅", "大花园", "近学校", "社区配套"],
    description: "西北区优质别墅社区，适合家庭置业。",
    contactName: "Kevin Liu",
    contactPhone: "0456 789 012",
    contactEmail: "kevin@greenvalley.com.au",
    image: "🏡"
  },
  {
    id: 6,
    name: "Melbourne Central Living",
    developer: "PDG",
    address: "350 Queen Street, Melbourne VIC",
    suburb: "Melbourne CBD",
    lat: -37.8136,
    lng: 144.9631,
    totalUnits: 280,
    availableUnits: 98,
    priceRange: { min: 450000, max: 1800000 },
    avgPrice: 780000,
    launchDate: "2024-04-15",
    completionDate: "2026-12",
    status: "selling",
    propertyType: "Apartment",
    bedrooms: [1, 2, 3],
    features: ["CBD核心", "电车便利", "屋顶花园", "共享办公"],
    description: "墨尔本CBD心脏位置，尽享都市繁华。",
    contactName: "Emma Wang",
    contactPhone: "0467 890 123",
    contactEmail: "emma@mcliving.com.au",
    image: "🎭"
  },
  {
    id: 7,
    name: "Brisbane River Walk",
    developer: "Brookfield",
    address: "45 Eagle Street, Brisbane QLD",
    suburb: "Brisbane CBD",
    lat: -27.4698,
    lng: 153.0251,
    totalUnits: 145,
    availableUnits: 67,
    priceRange: { min: 520000, max: 1400000 },
    avgPrice: 820000,
    launchDate: "2024-05-20",
    completionDate: "2026-06",
    status: "selling",
    propertyType: "Apartment",
    bedrooms: [1, 2, 3],
    features: ["河景", "近渡轮", "餐饮街", "会所"],
    description: "布里斯班河畔高端公寓，投资自住两相宜。",
    contactName: "Tom Chen",
    contactPhone: "0478 901 234",
    contactEmail: "tom@riverwalk.com.au",
    image: "🌴"
  },
  {
    id: 8,
    name: "Gold Coast Horizon",
    developer: "Sunland",
    address: "3500 Main Beach Parade, Main Beach QLD",
    suburb: "Gold Coast",
    lat: -27.9881,
    lng: 153.4288,
    totalUnits: 95,
    availableUnits: 31,
    priceRange: { min: 980000, max: 4500000 },
    avgPrice: 1850000,
    launchDate: "2024-07-01",
    completionDate: "2027-03",
    status: "coming_soon",
    propertyType: "Apartment",
    bedrooms: [2, 3, 4],
    features: ["海滨一线", "私人泳池", "五星配套", "管家服务"],
    description: "黄金海岸顶级海滨公寓，度假投资首选。",
    contactName: "Lisa Huang",
    contactPhone: "0489 012 345",
    contactEmail: "lisa@gchorizon.com.au",
    image: "🏖️"
  }
];

// 格式化价格显示
const formatPrice = (price) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
};

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
};

// 状态标签组件
const StatusBadge = ({ status }) => {
  const statusConfig = {
    selling: { label: '热销中', color: 'bg-emerald-500', icon: CheckCircle2 },
    coming_soon: { label: '即将开盘', color: 'bg-amber-500', icon: Clock },
    sold_out: { label: '已售罄', color: 'bg-gray-500', icon: AlertCircle }
  };
  
  const config = statusConfig[status] || statusConfig.selling;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};

// 简易地图组件 (使用Canvas绘制)
const SimpleMap = ({ properties, selectedProperty, onPropertySelect, center, zoom }) => {
  const canvasRef = useRef(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  
  // 坐标转换函数
  const latLngToXY = (lat, lng, width, height) => {
    const scale = Math.pow(2, zoom) * 50;
    const x = (lng - center.lng) * scale + width / 2;
    const y = (center.lat - lat) * scale * 1.2 + height / 2;
    return { x, y };
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清空画布
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制网格
    ctx.strokeStyle = '#cde5ec';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // 绘制楼盘标记
    properties.forEach(property => {
      const { x, y } = latLngToXY(property.lat, property.lng, width, height);
      
      if (x < 0 || x > width || y < 0 || y > height) return;
      
      const isSelected = selectedProperty?.id === property.id;
      const isHovered = hoveredProperty?.id === property.id;
      
      // 绘制标记阴影
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, isSelected ? 22 : 18, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();
      
      // 绘制标记背景
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 20 : 16, 0, Math.PI * 2);
      
      const statusColors = {
        selling: isSelected ? '#059669' : '#10b981',
        coming_soon: isSelected ? '#d97706' : '#f59e0b',
        sold_out: isSelected ? '#4b5563' : '#6b7280'
      };
      
      ctx.fillStyle = statusColors[property.status] || statusColors.selling;
      ctx.fill();
      
      if (isSelected || isHovered) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // 绘制emoji图标
      ctx.font = `${isSelected ? 20 : 16}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(property.image, x, y);
      
      // 绘制价格标签
      if (isSelected || isHovered) {
        const label = formatPrice(property.avgPrice);
        ctx.font = 'bold 11px system-ui';
        const textWidth = ctx.measureText(label).width;
        
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.beginPath();
        ctx.roundRect(x - textWidth/2 - 6, y - 38, textWidth + 12, 20, 4);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x, y - 28);
      }
    });
    
  }, [properties, selectedProperty, hoveredProperty, center, zoom]);
  
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    // 检查是否点击了某个楼盘
    for (const property of properties) {
      const { x, y } = latLngToXY(property.lat, property.lng, canvas.width, canvas.height);
      const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2));
      if (distance < 25) {
        onPropertySelect(property);
        return;
      }
    }
  };
  
  const handleCanvasMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const moveX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const moveY = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    for (const property of properties) {
      const { x, y } = latLngToXY(property.lat, property.lng, canvas.width, canvas.height);
      const distance = Math.sqrt(Math.pow(moveX - x, 2) + Math.pow(moveY - y, 2));
      if (distance < 25) {
        setHoveredProperty(property);
        canvas.style.cursor = 'pointer';
        return;
      }
    }
    setHoveredProperty(null);
    canvas.style.cursor = 'default';
  };
  
  const latLngToXY = (lat, lng, width, height) => {
    const scale = Math.pow(2, zoom) * 50;
    const x = (lng - center.lng) * scale + width / 2;
    const y = (center.lat - lat) * scale * 1.2 + height / 2;
    return { x, y };
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full rounded-xl"
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMove}
    />
  );
};

// 楼盘卡片组件
const PropertyCard = ({ property, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
      isSelected 
        ? 'bg-emerald-50 border-2 border-emerald-500 shadow-lg' 
        : 'bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md'
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="text-3xl">{property.image}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{property.name}</h3>
          <StatusBadge status={property.status} />
        </div>
        <p className="text-sm text-gray-500 truncate">{property.address}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-emerald-600 font-bold">{formatPrice(property.avgPrice)}</span>
          <span className="text-xs text-gray-400">均价</span>
          <span className="text-sm text-gray-600">{property.availableUnits}/{property.totalUnits}套</span>
        </div>
      </div>
    </div>
  </div>
);

// 楼盘详情面板
const PropertyDetail = ({ property, onClose }) => {
  if (!property) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="text-5xl mb-4">{property.image}</div>
        <h2 className="text-2xl font-bold mb-1">{property.name}</h2>
        <p className="text-emerald-100 flex items-center gap-1">
          <MapPin size={14} />
          {property.address}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <StatusBadge status={property.status} />
          <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{property.propertyType}</span>
        </div>
      </div>
      
      {/* Price Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">均价</div>
            <div className="text-2xl font-bold text-emerald-600">{formatPrice(property.avgPrice)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">价格区间</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatPrice(property.priceRange.min)} - {formatPrice(property.priceRange.max)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-2">
              <Home size={20} />
            </div>
            <div className="text-xl font-bold text-gray-800">{property.totalUnits}</div>
            <div className="text-xs text-gray-500">总套数</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <TrendingUp size={20} />
            </div>
            <div className="text-xl font-bold text-emerald-600">{property.availableUnits}</div>
            <div className="text-xs text-gray-500">可售</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mb-2">
              <Bed size={20} />
            </div>
            <div className="text-xl font-bold text-gray-800">{property.bedrooms.join('-')}房</div>
            <div className="text-xs text-gray-500">户型</div>
          </div>
        </div>
      </div>
      
      {/* Dates */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">重要日期</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">开盘日期</span>
            <span className="text-gray-800">{formatDate(property.launchDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">预计交房</span>
            <span className="text-gray-800">{property.completionDate}</span>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="p-6 border-b border-gray-100">
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>
      
      {/* Features */}
      <div className="p-6 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-3">项目亮点</div>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature, index) => (
            <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      {/* Contact */}
      <div className="p-6 bg-gray-50">
        <div className="text-sm font-medium text-gray-700 mb-3">销售联系</div>
        <div className="bg-white rounded-xl p-4 space-y-2">
          <div className="font-medium text-gray-900">{property.contactName}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            {property.contactPhone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            {property.contactEmail}
          </div>
        </div>
        <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors">
          立即咨询
        </button>
      </div>
    </div>
  );
};

// 添加楼盘表单
const AddPropertyForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    developer: '',
    address: '',
    suburb: '',
    lat: -33.8688,
    lng: 151.2093,
    totalUnits: '',
    availableUnits: '',
    avgPrice: '',
    priceMin: '',
    priceMax: '',
    launchDate: '',
    completionDate: '',
    status: 'selling',
    propertyType: 'Apartment',
    bedrooms: [],
    features: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      ...formData,
      totalUnits: parseInt(formData.totalUnits),
      availableUnits: parseInt(formData.availableUnits),
      avgPrice: parseInt(formData.avgPrice),
      priceRange: {
        min: parseInt(formData.priceMin),
        max: parseInt(formData.priceMax)
      },
      bedrooms: formData.bedrooms,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      image: formData.propertyType === 'House & Land' ? '🏡' : '🏢'
    };
    onAdd(newProperty);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">添加新楼盘</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="楼盘名称 *"
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="开发商"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.developer}
                onChange={e => setFormData({...formData, developer: e.target.value})}
              />
            </div>
            <input
              type="text"
              placeholder="详细地址 *"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="区域/Suburb"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.suburb}
                onChange={e => setFormData({...formData, suburb: e.target.value})}
              />
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.propertyType}
                onChange={e => setFormData({...formData, propertyType: e.target.value})}
              >
                <option value="Apartment">公寓 Apartment</option>
                <option value="House & Land">别墅 House & Land</option>
                <option value="Townhouse">联排 Townhouse</option>
              </select>
            </div>
          </div>
          
          {/* Price Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">价格信息</h3>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="均价 *"
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.avgPrice}
                onChange={e => setFormData({...formData, avgPrice: e.target.value})}
              />
              <input
                type="number"
                placeholder="最低价"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.priceMin}
                onChange={e => setFormData({...formData, priceMin: e.target.value})}
              />
              <input
                type="number"
                placeholder="最高价"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.priceMax}
                onChange={e => setFormData({...formData, priceMax: e.target.value})}
              />
            </div>
          </div>
          
          {/* Units Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">房源信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="总套数 *"
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.totalUnits}
                onChange={e => setFormData({...formData, totalUnits: e.target.value})}
              />
              <input
                type="number"
                placeholder="可售套数 *"
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.availableUnits}
                onChange={e => setFormData({...formData, availableUnits: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">户型 (可多选)</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map(bed => (
                  <button
                    key={bed}
                    type="button"
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      formData.bedrooms.includes(bed)
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => {
                      const newBedrooms = formData.bedrooms.includes(bed)
                        ? formData.bedrooms.filter(b => b !== bed)
                        : [...formData.bedrooms, bed].sort();
                      setFormData({...formData, bedrooms: newBedrooms});
                    }}
                  >
                    {bed}房
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Dates */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">日期与状态</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">开盘日期</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.launchDate}
                  onChange={e => setFormData({...formData, launchDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">预计交房</label>
                <input
                  type="text"
                  placeholder="如: 2026-06"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.completionDate}
                  onChange={e => setFormData({...formData, completionDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">销售状态</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="coming_soon">即将开盘</option>
                  <option value="selling">热销中</option>
                  <option value="sold_out">已售罄</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">项目描述</h3>
            <textarea
              placeholder="项目描述..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <input
              type="text"
              placeholder="项目亮点 (用逗号分隔，如: 海景, 近地铁, 学区房)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.features}
              onChange={e => setFormData({...formData, features: e.target.value})}
            />
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">联系方式</h3>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="联系人"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.contactName}
                onChange={e => setFormData({...formData, contactName: e.target.value})}
              />
              <input
                type="tel"
                placeholder="电话"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.contactPhone}
                onChange={e => setFormData({...formData, contactPhone: e.target.value})}
              />
              <input
                type="email"
                placeholder="邮箱"
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.contactEmail}
                onChange={e => setFormData({...formData, contactEmail: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
            >
              添加楼盘
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 主应用组件
export default function PropertyApp() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [mapCenter, setMapCenter] = useState({ lat: -33.8, lng: 151.1 });
  const [mapZoom, setMapZoom] = useState(1);
  
  // 筛选楼盘
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesType = filterType === 'all' || property.propertyType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // 统计数据
  const stats = {
    total: properties.length,
    selling: properties.filter(p => p.status === 'selling').length,
    comingSoon: properties.filter(p => p.status === 'coming_soon').length,
    totalUnits: properties.reduce((sum, p) => sum + p.availableUnits, 0)
  };
  
  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
    setShowAddForm(false);
  };
  
  // 快速定位到城市
  const cityLocations = [
    { name: '悉尼', lat: -33.8688, lng: 151.1 },
    { name: '墨尔本', lat: -37.8136, lng: 144.9631 },
    { name: '布里斯班', lat: -27.4698, lng: 153.0251 },
    { name: '黄金海岸', lat: -27.9881, lng: 153.4288 }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">新房销售管理</h1>
                <p className="text-xs text-gray-500">Property Sales Hub</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">添加楼盘</span>
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-gray-600">热销中 <span className="font-semibold text-gray-900">{stats.selling}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-gray-600">即将开盘 <span className="font-semibold text-gray-900">{stats.comingSoon}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">可售房源 <span className="font-semibold text-emerald-600">{stats.totalUnits}</span> 套</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Search & Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索楼盘名称、地址或区域..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <select
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">全部状态</option>
            <option value="selling">热销中</option>
            <option value="coming_soon">即将开盘</option>
            <option value="sold_out">已售罄</option>
          </select>
          
          <select
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">全部类型</option>
            <option value="Apartment">公寓</option>
            <option value="House & Land">别墅</option>
            <option value="Townhouse">联排</option>
          </select>
          
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <MapIcon size={16} />
              <span className="text-sm">地图</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List size={16} />
              <span className="text-sm">列表</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4">
          {/* Map / List View */}
          <div className={`flex-1 ${selectedProperty ? 'hidden lg:block' : ''}`}>
            {viewMode === 'map' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* City Quick Nav */}
                <div className="p-3 border-b border-gray-100 flex items-center gap-2 overflow-x-auto">
                  <span className="text-sm text-gray-500 whitespace-nowrap">快速定位:</span>
                  {cityLocations.map(city => (
                    <button
                      key={city.name}
                      onClick={() => setMapCenter({ lat: city.lat, lng: city.lng })}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg text-sm whitespace-nowrap transition-colors"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
                
                {/* Map */}
                <div className="aspect-[4/3] relative">
                  <SimpleMap
                    properties={filteredProperties}
                    selectedProperty={selectedProperty}
                    onPropertySelect={setSelectedProperty}
                    center={mapCenter}
                    zoom={mapZoom}
                  />
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <div className="text-xs font-medium text-gray-700 mb-2">图例</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span>热销中</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span>即将开盘</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                        <span>已售罄</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Zoom Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-1">
                    <button
                      onClick={() => setMapZoom(z => Math.min(z + 0.3, 3))}
                      className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setMapZoom(z => Math.max(z - 0.3, 0.5))}
                      className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
                    >
                      −
                    </button>
                  </div>
                </div>
                
                {/* Property Count */}
                <div className="p-3 border-t border-gray-100 text-sm text-gray-500">
                  当前显示 <span className="font-medium text-gray-900">{filteredProperties.length}</span> 个楼盘
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSelected={selectedProperty?.id === property.id}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
                {filteredProperties.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    没有找到符合条件的楼盘
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Detail Panel */}
          {selectedProperty && (
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft size={20} />
                  返回地图
                </button>
              </div>
              <PropertyDetail
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
              />
            </div>
          )}
        </div>
      </main>
      
      {/* Add Property Form Modal */}
      {showAddForm && (
        <AddPropertyForm
          onAdd={handleAddProperty}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
