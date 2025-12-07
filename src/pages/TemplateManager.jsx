import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Copy, 
  Trash2, 
  Eye, 
  Edit, 
  Share2, 
  Star,
  Clock,
  User,
  Tag as TagIcon,
  MoreVertical,
  X,
  Check
} from 'lucide-react';
import { message } from 'antd';
import {
  getAllTemplates,
  getTemplateById,
  saveTemplate,
  deleteTemplate,
  createTemplate,
  applyTemplate,
  searchTemplates,
  exportTemplate,
  importTemplate,
  duplicateTemplate,
  getTemplateStats
} from '../utils/templateManager';
import { GRADE_LEVELS, SUBJECTS } from '../data/lesson_plan_config';
import { useNavigate } from 'react-router-dom';

const TemplateManager = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    author: ''
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [stats, setStats] = useState(null);

  // 模板类型定义
  const TEMPLATE_TYPES = {
    parameter: { label: '参数模板', icon: '⚙️', color: 'blue' },
    outline: { label: '大纲模板', icon: '📋', color: 'green' },
    content: { label: '内容模板', icon: '📝', color: 'purple' },
    mixed: { label: '混合模板', icon: '🎯', color: 'orange' }
  };

  // 模板分类
  const TEMPLATE_CATEGORIES = [
    { id: 'daily', label: '日常教学' },
    { id: 'exam', label: '考试复习' },
    { id: 'project', label: '项目实践' },
    { id: 'activity', label: '活动课程' },
    { id: 'other', label: '其他' }
  ];

  // 加载模板数据
  useEffect(() => {
    loadTemplates();
    loadStats();
  }, []);

  // 应用搜索和筛选
  useEffect(() => {
    const filtered = searchTemplates(searchKeyword, filters);
    setFilteredTemplates(filtered);
  }, [searchKeyword, filters, templates, searchTemplates]);

  const loadTemplates = () => {
    const allTemplates = getAllTemplates();
    setTemplates(allTemplates);
    setFilteredTemplates(allTemplates);
  };

  const loadStats = () => {
    const statistics = getTemplateStats();
    setStats(statistics);
  };

  // 应用模板
  const handleApplyTemplate = (template) => {
    try {
      // 应用模板并跳转到创建页面
      const appliedData = applyTemplate(template);
      message.success(`已应用模板: ${template.name}`);
      
      // 将数据传递到创建页面
      navigate('/lesson-plan/create', { state: { formData: appliedData } });
    } catch (error) {
      message.error('应用模板失败');
      console.error(error);
    }
  };

  // 预览模板
  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
  };

  // 删除模板
  const handleDeleteTemplate = (templateId) => {
    const confirmed = window.confirm('确定要删除此模板吗？');
    if (confirmed) {
      try {
        deleteTemplate(templateId);
        message.success('模板已删除');
        loadTemplates();
        if (selectedTemplate?.templateId === templateId) {
          setSelectedTemplate(null);
        }
      } catch (error) {
        message.error('删除失败');
      }
    }
  };

  // 复制模板
  const handleDuplicateTemplate = (template) => {
    try {
      const newTemplate = duplicateTemplate(template.templateId);
      message.success('模板已复制');
      loadTemplates();
    } catch (error) {
      message.error(error.message || '复制失败');
    }
  };

  // 导出模板
  const handleExportTemplate = (template) => {
    try {
      const jsonStr = exportTemplate(template.templateId);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `template_${template.name}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      message.success('模板已导出');
    } catch (error) {
      message.error('导出失败');
    }
  };

  // 导入模板
  const handleImportTemplate = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonStr = e.target.result;
        const imported = importTemplate(jsonStr);
        message.success('模板已导入');
        loadTemplates();
      } catch (error) {
        message.error(error.message || '导入失败');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // 获取类型信息
  const getTypeInfo = (type) => TEMPLATE_TYPES[type] || TEMPLATE_TYPES.parameter;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                模板管理
              </h1>
              <p className="text-gray-600">
                管理和使用教案模板，提高创建效率
              </p>
            </div>
            <div className="flex gap-3">
              <label className="btn-secondary cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                导入模板
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportTemplate}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => navigate('/lesson-plan/create')}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                创建教案并保存为模板
              </button>
            </div>
          </div>

          {/* 统计信息 */}
          {stats && (
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{stats.totalCount}</div>
                <div className="text-sm text-gray-600">总模板数</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">{stats.byType.parameter || 0}</div>
                <div className="text-sm text-gray-600">参数模板</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{stats.byType.outline || 0}</div>
                <div className="text-sm text-gray-600">大纲模板</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{stats.mostUsed?.usageCount || 0}</div>
                <div className="text-sm text-gray-600">最高使用次数</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 左侧筛选器 */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                筛选条件
              </h3>

              {/* 搜索框 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  搜索模板
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="输入关键词或标签"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* 类型筛选 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  模板类型
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ ...filters, type: '' })}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.type === '' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    全部类型
                  </button>
                  {Object.entries(TEMPLATE_TYPES).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => setFilters({ ...filters, type: key })}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.type === key ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      {info.icon} {info.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 分类筛选 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  教案分类
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ ...filters, category: '' })}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.category === '' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    全部分类
                  </button>
                  {TEMPLATE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters({ ...filters, category: cat.id })}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.category === cat.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 重置按钮 */}
              <button
                onClick={() => {
                  setSearchKeyword('');
                  setFilters({ type: '', category: '', author: '' });
                }}
                className="w-full btn-secondary"
              >
                重置筛选
              </button>
            </div>
          </div>

          {/* 中间模板列表 */}
          <div className="col-span-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                找到 <span className="font-semibold text-gray-900">{filteredTemplates.length}</span> 个模板
              </div>
            </div>

            <div className="space-y-4">
              {filteredTemplates.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">暂无模板</p>
                  <button
                    onClick={() => navigate('/lesson-plan/create')}
                    className="btn-primary"
                  >
                    创建第一个模板
                  </button>
                </div>
              ) : (
                filteredTemplates.map((template) => {
                  const typeInfo = getTypeInfo(template.type);
                  return (
                    <motion.div
                      key={template.templateId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                        selectedTemplate?.templateId === template.templateId ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handlePreviewTemplate(template)}
                    >
                      {/* 模板头部 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{typeInfo.icon}</span>
                            <h3 className="text-xl font-semibold">{template.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${typeInfo.color}-100 text-${typeInfo.color}-700`}>
                              {typeInfo.label}
                            </span>
                          </div>
                          {template.description && (
                            <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                          )}
                        </div>
                      </div>

                      {/* 模板元信息 */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {template.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(template.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          使用 {template.usageCount || 0} 次
                        </div>
                      </div>

                      {/* 标签 */}
                      {template.tags && template.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {template.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 操作按钮 */}
                      <div className="flex gap-2 pt-4 border-t">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyTemplate(template);
                          }}
                          className="flex-1 btn-primary text-sm"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          应用
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateTemplate(template);
                          }}
                          className="btn-secondary text-sm"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportTemplate(template);
                          }}
                          className="btn-secondary text-sm"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.templateId);
                          }}
                          className="btn-secondary text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* 右侧详情面板 */}
          <div className="col-span-3">
            <AnimatePresence>
              {selectedTemplate ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">模板详情</h3>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">模板名称</label>
                      <p className="text-gray-900">{selectedTemplate.name}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">模板类型</label>
                      <p className="text-gray-900">{getTypeInfo(selectedTemplate.type).label}</p>
                    </div>

                    {selectedTemplate.description && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">描述</label>
                        <p className="text-gray-900">{selectedTemplate.description}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-500">作者</label>
                      <p className="text-gray-900">{selectedTemplate.author}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">创建时间</label>
                      <p className="text-gray-900">
                        {new Date(selectedTemplate.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">使用次数</label>
                      <p className="text-gray-900">{selectedTemplate.usageCount || 0} 次</p>
                    </div>

                    {/* 配置预览 */}
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">配置预览</label>
                      <div className="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                          {JSON.stringify(selectedTemplate.previewData || selectedTemplate.config, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyTemplate(selectedTemplate)}
                      className="w-full btn-primary"
                    >
                      应用此模板
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-lg p-12 text-center sticky top-8"
                >
                  <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">点击模板查看详情</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
