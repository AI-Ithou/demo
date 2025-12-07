import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Upload, FileText, Video, Link as LinkIcon,
    File, FileSpreadsheet, Presentation, Image as ImageIcon,
    Edit, Trash2, Eye, Search, Filter, Plus, X, Check,
    Download, ExternalLink, BookOpen, HelpCircle, Grid, List,
    FolderOpen, FolderPlus, ChevronRight, ChevronDown
} from 'lucide-react';
import { Modal, Upload as AntUpload, Input, Select, message, Tag, Tabs } from 'antd';
import { motion } from 'framer-motion';
import KNOWLEDGE_POINTS_LIST from '../data/knowledge_points_list';

const { TextArea } = Input;
const { TabPane } = Tabs;

const TeacherResourceManager = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [activeTab, setActiveTab] = useState('all'); // all, files, questions, links
    const [searchText, setSearchText] = useState('');
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
    const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [uploadType, setUploadType] = useState('file');
    const [iframeError, setIframeError] = useState(false);

    const initialFolders = [
        { id: 'root', name: '全部资料', parentId: null },
        { id: 'uncategorized', name: '未分配', parentId: 'root' },
        { id: 'f-shared', name: '公共资料', parentId: 'root' },
        { id: 'f-course', name: '课程模板', parentId: 'root' },
        { id: 'f-h5', name: '互动工具', parentId: 'root' },
        { id: 'f-question', name: '题库资源', parentId: 'root' }
    ];
    const [folders, setFolders] = useState(initialFolders);
    const [expandedFolders, setExpandedFolders] = useState(['root']);
    const [selectedFolderId, setSelectedFolderId] = useState('root');
    const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
    const [folderForm, setFolderForm] = useState({
        name: '',
        parentId: 'root'
    });
    const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
    const [resourceToMove, setResourceToMove] = useState(null);
    const [moveFolderId, setMoveFolderId] = useState('uncategorized');

    // 自定义分类管理
    const [customCategories, setCustomCategories] = useState([
        { id: 'doc', name: '文档资料', icon: 'FileText', color: 'blue' },
        { id: 'presentation', name: '演示文稿', icon: 'Presentation', color: 'orange' },
        { id: 'video', name: '视频资源', icon: 'Video', color: 'purple' },
        { id: 'data', name: '数据表格', icon: 'FileSpreadsheet', color: 'green' },
        { id: 'h5', name: '互动工具', icon: 'Link', color: 'cyan' },
        { id: 'question', name: '题库资源', icon: 'HelpCircle', color: 'pink' }
    ]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
    const [selectedKnowledgeFilter, setSelectedKnowledgeFilter] = useState('all'); // 新增：知识点筛选

    // 文件上传表单
    const [fileForm, setFileForm] = useState({
        title: '',
        description: '',
        category: 'document',
        tags: [],
        knowledgePoints: [], // 新增：关联知识点
        folderId: 'uncategorized'
    });

    // 题库表单
    const [questionForm, setQuestionForm] = useState({
        title: '',
        type: 'choice', // choice, multi-choice, true-false, fill, subjective
        content: '',
        options: ['', '', '', ''],
        answer: '',
        analysis: '',
        difficulty: 'medium',
        knowledge: '',
        tags: [],
        knowledgePoints: [], // 新增：关联知识点
        folderId: 'f-question'
    });

    // H5链接表单
    const [linkForm, setLinkForm] = useState({
        title: '',
        url: '',
        description: '',
        category: 'h5',
        tags: [],
        knowledgePoints: [], // 新增：关联知识点
        folderId: 'f-h5'
    });

    // Mock 资源数据
    const [resources, setResources] = useState([
        {
            id: 1,
            type: 'pdf',
            title: '量子力学基础理论.pdf',
            description: '量子力学核心概念和基础理论讲解',
            fileSize: '3.2MB',
            uploadTime: '2024-01-15',
            category: 'document',
            tags: ['理论', '基础'],
            knowledgePoints: ['kp1', 'kp2'], // 关联知识点
            url: 'https://example.com/file.pdf',
            folderId: 'f-shared',
            thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'
        },
        {
            id: 2,
            type: 'ppt',
            title: '薛定谔方程推导PPT',
            description: '薛定谔方程详细推导过程',
            fileSize: '8.5MB',
            uploadTime: '2024-01-14',
            category: 'presentation',
            tags: ['推导', '公式'],
            knowledgePoints: ['kp3', 'kp5'], // 关联知识点
            url: 'https://example.com/file.pptx',
            folderId: 'f-course',
            thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400'
        },
        {
            id: 3,
            type: 'excel',
            title: '学生成绩统计表',
            description: '期末考试成绩分析数据',
            fileSize: '1.8MB',
            uploadTime: '2024-01-13',
            category: 'data',
            tags: ['成绩', '统计'],
            url: 'https://example.com/file.xlsx',
            folderId: 'f-shared',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
        },
        {
            id: 4,
            type: 'video',
            title: '波粒二象性实验演示',
            description: '双缝干涉实验视频讲解',
            fileSize: '45.3MB',
            uploadTime: '2024-01-12',
            category: 'video',
            tags: ['实验', '演示'],
            knowledgePoints: ['kp7', 'kp8'], // 关联知识点
            url: 'https://example.com/video.mp4',
            folderId: 'f-course',
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400'
        },
        {
            id: 5,
            type: 'h5',
            title: 'PhET交互式物理模拟器',
            description: 'PhET提供的量子波干涉互动模拟器，可视化展示量子力学现象',
            uploadTime: '2024-01-11',
            category: 'h5',
            tags: ['交互', '模拟', 'PhET'],
            url: 'https://phet.colorado.edu/sims/html/quantum-wave-interference/latest/quantum-wave-interference_zh_CN.html',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400'
        },
        {
            id: 8,
            type: 'h5',
            title: 'Desmos图形计算器',
            description: '强大的在线图形计算器，可绘制函数图像、进行数学计算',
            uploadTime: '2024-01-11',
            category: 'h5',
            tags: ['数学', '计算器', '函数'],
            url: 'https://www.desmos.com/calculator?lang=zh-CN',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=400'
        },
        {
            id: 9,
            type: 'h5',
            title: 'GeoGebra几何工具',
            description: '在线几何绘图工具，支持动态几何、代数、微积分等',
            uploadTime: '2024-01-10',
            category: 'h5',
            tags: ['几何', '绘图', '数学'],
            url: 'https://www.geogebra.org/classic?lang=zh_CN',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400'
        },
        {
            id: 10,
            type: 'h5',
            title: '周期表互动工具',
            description: '交互式化学元素周期表，点击查看元素详细信息',
            uploadTime: '2024-01-09',
            category: 'h5',
            tags: ['化学', '周期表', '元素'],
            url: 'https://ptable.com/?lang=zh',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400'
        },
        {
            id: 11,
            type: 'h5',
            title: 'Regex101正则表达式测试',
            description: '在线正则表达式测试和学习工具，支持实时匹配',
            uploadTime: '2024-01-08',
            category: 'h5',
            tags: ['编程', '正则', '工具'],
            url: 'https://regex101.com/',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400'
        },
        {
            id: 12,
            type: 'h5',
            title: 'JSON Editor在线工具',
            description: '在线JSON编辑器和验证工具，可视化JSON数据',
            uploadTime: '2024-01-07',
            category: 'h5',
            tags: ['JSON', '编程', '工具'],
            url: 'https://jsoneditoronline.org/',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400'
        },
        {
            id: 13,
            type: 'h5',
            title: 'CanIUse浏览器兼容性查询',
            description: '查询Web技术在各浏览器的兼容性支持情况',
            uploadTime: '2024-01-06',
            category: 'h5',
            tags: ['前端', '兼容性', '开发'],
            url: 'https://caniuse.com/',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
        },
        {
            id: 14,
            type: 'h5',
            title: 'Excalidraw在线画板',
            description: '在线白板绘图工具，适合画流程图、架构图',
            uploadTime: '2024-01-05',
            category: 'h5',
            tags: ['画板', '绘图', '协作'],
            url: 'https://excalidraw.com/',
            folderId: 'f-h5',
            thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400'
        },
        {
            id: 6,
            type: 'question',
            title: '波粒二象性选择题',
            content: '下列关于波粒二象性的描述，正确的是？',
            questionType: 'choice',
            difficulty: 'medium',
            uploadTime: '2024-01-10',
            category: 'question',
            tags: ['选择题', '波粒二象性'],
            knowledgePoints: ['kp4', 'kp6'], // 关联知识点
            folderId: 'f-question',
            options: ['只有光具有波粒二象性', '所有微观粒子都具有波粒二象性', '只有电子具有波粒二象性', '宏观物体也具有明显的波粒二象性'],
            answer: 'B',
            analysis: '根据德布罗意假设，所有微观粒子都具有波粒二象性，包括光子、电子、质子等。'
        },
        {
            id: 7,
            type: 'question',
            title: '薛定谔方程简答题',
            content: '请简述薛定谔方程的物理意义',
            questionType: 'subjective',
            difficulty: 'hard',
            uploadTime: '2024-01-09',
            category: 'question',
            tags: ['简答题', '薛定谔方程'],
            folderId: 'f-question',
            answer: '薛定谔方程描述了量子系统波函数随时间的演化规律...',
            analysis: ''
        }
    ]);

    const getFolderName = (folderId) => {
        if (folderId === 'root' || !folderId) return '未分配';
        const folder = folders.find(f => f.id === folderId);
        return folder ? folder.name : '未知文件夹';
    };

    const buildFolderTree = (parentId = 'root') =>
        folders
            .filter(folder => folder.parentId === parentId)
            .map(folder => ({
                ...folder,
                children: buildFolderTree(folder.id)
            }));

    const descendantFolderIds = (folderId) => {
        const ids = [folderId];
        folders
            .filter(folder => folder.parentId === folderId)
            .forEach(child => ids.push(...descendantFolderIds(child.id)));
        return ids;
    };

    const folderTree = buildFolderTree();

    const countResourcesInFolder = (folderId) => {
        const ids = descendantFolderIds(folderId);
        return resources.filter(resource => ids.includes(resource.folderId || 'uncategorized')).length;
    };

    const handleFolderSelect = (folderId) => {
        setSelectedFolderId(folderId);
        if (!expandedFolders.includes(folderId)) {
            setExpandedFolders([...expandedFolders, folderId]);
        }
    };

    const toggleFolderExpansion = (folderId) => {
        setExpandedFolders(prev =>
            prev.includes(folderId)
                ? prev.filter(id => id !== folderId)
                : [...prev, folderId]
        );
    };

    const renderFolderNodes = (nodes, level = 0) => (
        nodes.map(node => (
            <div key={node.id} className="select-none">
                <div
                    className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer hover:bg-slate-100 ${selectedFolderId === node.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                        }`}
                    style={{ marginLeft: level * 12 }}
                    onClick={() => handleFolderSelect(node.id)}
                >
                    <div className="flex items-center gap-2">
                        {node.children.length > 0 ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFolderExpansion(node.id);
                                }}
                                className="p-1 hover:bg-white rounded-md"
                            >
                                {expandedFolders.includes(node.id) ? (
                                    <ChevronDown size={14} />
                                ) : (
                                    <ChevronRight size={14} />
                                )}
                            </button>
                        ) : (
                            <span className="w-4" />
                        )}
                        <span className="font-medium">{node.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{countResourcesInFolder(node.id)}</span>
                </div>
                {node.children.length > 0 && expandedFolders.includes(node.id) && (
                    <div className="mt-1">
                        {renderFolderNodes(node.children, level + 1)}
                    </div>
                )}
            </div>
        ))
    );

    // 获取文件类型图标
    const getFileIcon = (type) => {
        const iconMap = {
            'pdf': { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
            'ppt': { icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50' },
            'excel': { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-50' },
            'video': { icon: Video, color: 'text-purple-500', bg: 'bg-purple-50' },
            'h5': { icon: LinkIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
            'question': { icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pink-50' },
            'doc': { icon: File, color: 'text-blue-600', bg: 'bg-blue-50' },
            'image': { icon: ImageIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' }
        };
        return iconMap[type] || iconMap['pdf'];
    };

    // 过滤资源
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
            resource.description?.toLowerCase().includes(searchText.toLowerCase());
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'files' && ['pdf', 'ppt', 'excel', 'video', 'doc', 'image'].includes(resource.type)) ||
            (activeTab === 'questions' && resource.type === 'question') ||
            (activeTab === 'links' && resource.type === 'h5');
        const matchesCategory = selectedCategoryFilter === 'all' || resource.category === selectedCategoryFilter;
        const scope = selectedFolderId === 'root' ? null : descendantFolderIds(selectedFolderId);
        const resourceFolderId = resource.folderId || 'uncategorized';
        const matchesFolder = !scope ? true : scope.includes(resourceFolderId);
        return matchesSearch && matchesTab && matchesCategory && matchesFolder;
    });

    const folderOptions = folders.filter(folder => folder.id !== 'root');
    const selectableFolders = folderOptions.filter(folder => folder.id !== 'uncategorized');

    // 添加自定义分类
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            message.error('请输入分类名称');
            return;
        }
        const newCategory = {
            id: `custom_${Date.now()}`,
            name: newCategoryName,
            icon: 'Folder',
            color: 'gray'
        };
        setCustomCategories([...customCategories, newCategory]);
        setNewCategoryName('');
        message.success('分类添加成功');
    };

    // 删除自定义分类
    const handleDeleteCategory = (categoryId) => {
        const confirmed = window.confirm('确定要删除此分类吗？');
        if (confirmed) {
            setCustomCategories(customCategories.filter(cat => cat.id !== categoryId));
            message.success('分类已删除');
        }
    };

    const handleCreateFolder = () => {
        if (!folderForm.name.trim()) {
            message.error('请输入文件夹名称');
            return;
        }
        const newFolder = {
            id: `folder_${Date.now()}`,
            name: folderForm.name.trim(),
            parentId: folderForm.parentId
        };
        setFolders(prev => [...prev, newFolder]);
        setExpandedFolders(prev => Array.from(new Set([...prev, folderForm.parentId])));
        message.success('文件夹创建成功');
        setFolderForm({ name: '', parentId: 'root' });
        setIsFolderModalVisible(false);
    };

    const openMoveModal = (resource) => {
        setResourceToMove(resource);
        setMoveFolderId(resource.folderId || 'uncategorized');
        setIsMoveModalVisible(true);
    };

    const handleMoveResource = () => {
        if (!resourceToMove) return;
        setResources(prev =>
            prev.map(res =>
                res.id === resourceToMove.id ? { ...res, folderId: moveFolderId } : res
            )
        );
        message.success('资料已移动至新文件夹');
        setIsMoveModalVisible(false);
        setResourceToMove(null);
    };

    // 处理文件上传
    const handleFileUpload = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    };

    // 预览资源
    const handlePreview = (resource) => {
        setSelectedResource(resource);
        setIsPreviewModalVisible(true);
        setIframeError(false);
    };

    const fileTypeMap = {
        document: 'pdf',
        presentation: 'ppt',
        data: 'excel',
        video: 'video',
        image: 'image'
    };

    const resetFileForm = () => {
        setFileForm({
            title: '',
            description: '',
            category: 'document',
            tags: [],
            folderId: selectedFolderId !== 'root' ? selectedFolderId : 'uncategorized'
        });
    };

    const handleConfirmUpload = () => {
        if (!fileForm.title.trim()) {
            message.error('请输入文件标题');
            return;
        }
        const newResource = {
            id: Date.now(),
            type: fileTypeMap[fileForm.category] || 'pdf',
            title: fileForm.title,
            description: fileForm.description,
            fileSize: '—',
            uploadTime: new Date().toISOString().split('T')[0],
            category: fileForm.category,
            tags: fileForm.tags,
            folderId: fileForm.folderId || 'uncategorized',
            url: '#',
            thumbnail: null
        };
        setResources(prev => [...prev, newResource]);
        message.success('上传成功！');
        setIsUploadModalVisible(false);
        resetFileForm();
    };

    const resetLinkForm = () => {
        setLinkForm({
            title: '',
            url: '',
            description: '',
            category: 'h5',
            tags: [],
            folderId: selectedFolderId !== 'root' ? selectedFolderId : 'f-h5'
        });
    };

    const handleConfirmLink = () => {
        if (!linkForm.title.trim() || !linkForm.url.trim()) {
            message.error('请填写链接标题和地址');
            return;
        }
        const newResource = {
            id: Date.now(),
            type: 'h5',
            title: linkForm.title,
            description: linkForm.description,
            uploadTime: new Date().toISOString().split('T')[0],
            category: 'h5',
            tags: linkForm.tags,
            folderId: linkForm.folderId || 'f-h5',
            url: linkForm.url,
            thumbnail: null
        };
        setResources(prev => [...prev, newResource]);
        message.success('链接添加成功！');
        setIsLinkModalVisible(false);
        resetLinkForm();
    };

    const resetQuestionForm = () => {
        setQuestionForm({
            title: '',
            type: 'choice',
            content: '',
            options: ['', '', '', ''],
            answer: '',
            analysis: '',
            difficulty: 'medium',
            knowledge: '',
            tags: [],
            folderId: 'f-question'
        });
    };

    const handleConfirmQuestion = () => {
        if (!questionForm.title.trim() || !questionForm.content.trim()) {
            message.error('请完善题目信息');
            return;
        }
        const newResource = {
            id: Date.now(),
            type: 'question',
            title: questionForm.title,
            content: questionForm.content,
            questionType: questionForm.type,
            difficulty: questionForm.difficulty,
            uploadTime: new Date().toISOString().split('T')[0],
            category: 'question',
            tags: questionForm.tags,
            folderId: questionForm.folderId || 'f-question',
            options: questionForm.options,
            answer: questionForm.answer,
            analysis: questionForm.analysis
        };
        setResources(prev => [...prev, newResource]);
        message.success('题目创建成功！');
        setIsQuestionModalVisible(false);
        resetQuestionForm();
    };

    // 渲染预览内容
    const renderPreviewContent = () => {
        if (!selectedResource) return null;

        if (selectedResource.type === 'h5') {
            return (
                <div className="w-full h-[700px] bg-slate-50 rounded-lg overflow-hidden relative">
                    {iframeError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <LinkIcon size={64} className="text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">无法在弹窗中加载此页面</h3>
                            <p className="text-slate-500 mb-6 max-w-md">
                                该网站可能不允许在iframe中嵌入，请点击下方按钮在新窗口中打开。
                            </p>
                            <a
                                href={selectedResource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                                <ExternalLink size={18} />
                                在新窗口中打开
                            </a>
                            <p className="text-xs text-slate-400 mt-4">
                                URL: {selectedResource.url}
                            </p>
                        </div>
                    ) : (
                        <iframe
                            src={selectedResource.url}
                            className="w-full h-full border-0"
                            title={selectedResource.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation"
                            onError={() => setIframeError(true)}
                        />
                    )}
                </div>
            );
        }

        if (selectedResource.type === 'video') {
            return (
                <div className="w-full">
                    <video
                        src={selectedResource.url}
                        controls
                        className="w-full rounded-lg"
                    />
                </div>
            );
        }

        if (selectedResource.type === 'question') {
            return (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Tag color={selectedResource.difficulty === 'easy' ? 'green' : selectedResource.difficulty === 'medium' ? 'orange' : 'red'}>
                            {selectedResource.difficulty === 'easy' ? '简单' : selectedResource.difficulty === 'medium' ? '中等' : '困难'}
                        </Tag>
                        <Tag color="blue">{selectedResource.questionType === 'choice' ? '单选题' : selectedResource.questionType === 'multi-choice' ? '多选题' : '主观题'}</Tag>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-base font-medium text-slate-800 mb-4">{selectedResource.content}</p>
                        {selectedResource.options && (
                            <div className="space-y-2">
                                {selectedResource.options.map((option, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded">
                                        <span className="font-medium text-slate-600">{String.fromCharCode(65 + idx)}.</span>
                                        <span className="text-slate-700">{option}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-1">参考答案：</p>
                        <p className="text-slate-700">{selectedResource.answer}</p>
                    </div>
                    {selectedResource.analysis && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 mb-1">答案解析：</p>
                            <p className="text-slate-700">{selectedResource.analysis}</p>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="text-center py-8">
                <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">该文件类型暂不支持在线预览</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 mx-auto">
                    <Download size={16} />
                    下载文件
                </button>
            </div>
        );
    };

    const renderResourceArea = () => (
        <div className="bg-white rounded-xl border border-slate-200 mb-6">
            <div className="flex items-center border-b border-slate-200 px-2">
                {[
                    { key: 'all', label: '全部资料', count: resources.length },
                    { key: 'files', label: '文件资料', count: resources.filter(r => ['pdf', 'ppt', 'excel', 'video', 'doc'].includes(r.type)).length },
                    { key: 'questions', label: '题库', count: resources.filter(r => r.type === 'question').length },
                    { key: 'links', label: 'H5链接', count: resources.filter(r => r.type === 'h5').length }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 font-medium transition-all relative ${activeTab === tab.key
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-slate-800'
                            }`}
                    >
                        {tab.label}
                        <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                            {tab.count}
                        </span>
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-6">
                {filteredResources.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 mb-2">该文件夹下暂无资料</p>
                        <p className="text-sm text-slate-400">点击上方按钮上传或切换其他文件夹</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredResources.map((resource) => {
                            const iconInfo = getFileIcon(resource.type);
                            const Icon = iconInfo.icon;

                            return (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                                >
                                    <div className="relative h-40 bg-slate-100 overflow-hidden">
                                        {resource.thumbnail ? (
                                            <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${iconInfo.bg}`}>
                                                <Icon size={48} className={iconInfo.color} />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            <div className={`px-2 py-1 ${iconInfo.bg} backdrop-blur-sm rounded-lg flex items-center gap-1`}>
                                                <Icon size={14} className={iconInfo.color} />
                                                <span className={`text-xs font-medium ${iconInfo.color}`}>
                                                    {resource.type.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-bold text-slate-800 mb-1 truncate group-hover:text-blue-600 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-500 flex-shrink-0">
                                                {getFolderName(resource.folderId)}
                                            </span>
                                        </div>
                                        {resource.description && (
                                            <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                                {resource.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                                            <span>{resource.uploadTime}</span>
                                            {resource.fileSize && <span>{resource.fileSize}</span>}
                                        </div>
                                        {resource.tags && resource.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {resource.tags.map((tag, idx) => (
                                                    <Tag key={idx} className="text-xs">{tag}</Tag>
                                                ))}
                                            </div>
                                        )}

                                        {/* 关联知识点显示 */}
                                        {resource.knowledgePoints && resource.knowledgePoints.length > 0 && (
                                            <div className="mb-3">
                                                <div className="flex flex-wrap gap-1 items-center">
                                                    <span className="text-xs text-slate-500 font-medium">📌 知识点:</span>
                                                    {resource.knowledgePoints.map((kpId) => {
                                                        const kp = KNOWLEDGE_POINTS_LIST.find(k => k.id === kpId);
                                                        return kp ? (
                                                            <span
                                                                key={kpId}
                                                                className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium border border-indigo-200"
                                                            >
                                                                {kp.name}
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePreview(resource)}
                                                className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-sm"
                                            >
                                                <Eye size={14} />
                                                预览
                                            </button>
                                            {['pdf', 'ppt', 'doc'].includes(resource.type) && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate('/teacher/teaching-preview', { state: { resource } });
                                                    }}
                                                    className="flex-1 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-1 text-sm"
                                                >
                                                    <BookOpen size={14} />
                                                    教学
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openMoveModal(resource);
                                                }}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <FolderOpen size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredResources.map((resource) => {
                            const iconInfo = getFileIcon(resource.type);
                            const Icon = iconInfo.icon;

                            return (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-4"
                                >
                                    <div className={`w-12 h-12 ${iconInfo.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <Icon size={24} className={iconInfo.color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-bold text-slate-800 mb-1 truncate">
                                                {resource.title}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-500 flex-shrink-0">
                                                {getFolderName(resource.folderId)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 truncate">{resource.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                            <span>{resource.uploadTime}</span>
                                            {resource.fileSize && <span>{resource.fileSize}</span>}
                                            {resource.tags && resource.tags.map((tag, idx) => (
                                                <Tag key={idx} className="text-xs">{tag}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handlePreview(resource)}
                                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                                        >
                                            <Eye size={16} />
                                            预览
                                        </button>
                                        <button
                                            onClick={() => openMoveModal(resource)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <FolderOpen size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">资料管理</h1>
                                <p className="text-sm text-slate-500">管理课程资料、题库和学习资源</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setUploadType('file'); setIsUploadModalVisible(true); }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
                            >
                                <Upload size={16} />
                                上传文件
                            </button>
                            <button
                                onClick={() => setIsLinkModalVisible(true)}
                                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2 transition-colors"
                            >
                                <LinkIcon size={16} />
                                添加链接
                            </button>
                            <button
                                onClick={() => setIsQuestionModalVisible(true)}
                                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2 transition-colors"
                            >
                                <Plus size={16} />
                                创建题目
                            </button>
                            <button
                                onClick={() => setIsCategoryModalVisible(true)}
                                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2 transition-colors"
                            >
                                <Filter size={16} />
                                分类管理
                            </button>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="搜索资料名称、描述..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <aside className="w-full lg:w-72 space-y-4">
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">文件夹</h3>
                                    <p className="text-xs text-slate-400">左侧树状目录，右侧分列浏览</p>
                                </div>
                                <button
                                    onClick={() => setIsFolderModalVisible(true)}
                                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    <FolderPlus size={16} className="text-slate-600" />
                                </button>
                            </div>
                            <div className="space-y-1 max-h-[420px] overflow-auto pr-1">
                                <button
                                    onClick={() => handleFolderSelect('root')}
                                    className={`w-full flex items-center justify-between px-2 py-2 rounded-lg ${selectedFolderId === 'root'
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="font-medium">全部资料</span>
                                    <span className="text-xs text-slate-400">{resources.length}</span>
                                </button>
                                {renderFolderNodes(folderTree)}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 via-white to-white border border-blue-100 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">使用建议</h4>
                            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                                <li>支持多级文件夹，按项目/课程拆分</li>
                                <li>切换文件夹即可右侧分列展示</li>
                                <li>可用“移动”按钮快速调整归属</li>
                            </ul>
                        </div>
                    </aside>
                    <section className="flex-1 flex flex-col gap-6">
                        {renderResourceArea()}
                    </section>
                </div>
            </main>

            {/* 文件上传弹窗 */}
            <Modal
                title="上传文件"
                open={isUploadModalVisible}
                onCancel={() => setIsUploadModalVisible(false)}
                footer={null}
                width={600}
            >
                <div className="space-y-4">
                    <AntUpload.Dragger
                        name="file"
                        multiple={false}
                        onChange={handleFileUpload}
                        className="mb-4"
                    >
                        <p className="ant-upload-drag-icon">
                            <Upload size={48} className="mx-auto text-blue-500" />
                        </p>
                        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                        <p className="ant-upload-hint">
                            支持 PDF, PPT, Word, Excel, 图片, 视频等格式
                        </p>
                    </AntUpload.Dragger>

                    <Input
                        placeholder="文件标题"
                        value={fileForm.title}
                        onChange={(e) => setFileForm({ ...fileForm, title: e.target.value })}
                    />
                    <TextArea
                        placeholder="文件描述"
                        rows={3}
                        value={fileForm.description}
                        onChange={(e) => setFileForm({ ...fileForm, description: e.target.value })}
                    />
                    <Select
                        placeholder="选择分类"
                        className="w-full"
                        value={fileForm.category}
                        onChange={(value) => setFileForm({ ...fileForm, category: value })}
                    >
                        <Select.Option value="document">文档资料</Select.Option>
                        <Select.Option value="presentation">演示文稿</Select.Option>
                        <Select.Option value="data">数据表格</Select.Option>
                        <Select.Option value="video">视频资料</Select.Option>
                        <Select.Option value="image">图片资料</Select.Option>
                    </Select>
                    <Select
                        mode="tags"
                        placeholder="添加标签"
                        className="w-full"
                        value={fileForm.tags}
                        onChange={(value) => setFileForm({ ...fileForm, tags: value })}
                    />
                    <Select
                        placeholder="归属文件夹"
                        className="w-full"
                        value={fileForm.folderId}
                        onChange={(value) => setFileForm({ ...fileForm, folderId: value })}
                    >
                        <Select.Option value="uncategorized">未分配</Select.Option>
                        {selectableFolders.map(folder => (
                            <Select.Option key={folder.id} value={folder.id}>
                                {folder.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={() => setIsUploadModalVisible(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleConfirmUpload}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            确认上传
                        </button>
                    </div>
                </div>
            </Modal>

            {/* H5链接添加弹窗 */}
            <Modal
                title="添加H5链接"
                open={isLinkModalVisible}
                onCancel={() => setIsLinkModalVisible(false)}
                footer={null}
                width={600}
            >
                <div className="space-y-4">
                    <Input
                        placeholder="链接标题"
                        value={linkForm.title}
                        onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                    />
                    <Input
                        placeholder="H5链接地址 (https://...)"
                        value={linkForm.url}
                        onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                        prefix={<LinkIcon size={16} className="text-slate-400" />}
                    />
                    <TextArea
                        placeholder="链接描述"
                        rows={3}
                        value={linkForm.description}
                        onChange={(e) => setLinkForm({ ...linkForm, description: e.target.value })}
                    />
                    <Select
                        mode="tags"
                        placeholder="添加标签"
                        className="w-full"
                        value={linkForm.tags}
                        onChange={(value) => setLinkForm({ ...linkForm, tags: value })}
                    />
                    <Select
                        placeholder="归属文件夹"
                        className="w-full"
                        value={linkForm.folderId}
                        onChange={(value) => setLinkForm({ ...linkForm, folderId: value })}
                    >
                        <Select.Option value="uncategorized">未分配</Select.Option>
                        {selectableFolders.map(folder => (
                            <Select.Option key={folder.id} value={folder.id}>
                                {folder.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 mb-2">💡 提示：</p>
                        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                            <li>支持各类H5交互页面、在线工具、模拟器等</li>
                            <li>确保链接可以在iframe中正常加载</li>
                            <li>建议使用HTTPS协议的链接</li>
                        </ul>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={() => setIsLinkModalVisible(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleConfirmLink}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            确认添加
                        </button>
                    </div>
                </div>
            </Modal>

            {/* 题目创建弹窗 */}
            <Modal
                title="创建题目"
                open={isQuestionModalVisible}
                onCancel={() => setIsQuestionModalVisible(false)}
                footer={null}
                width={700}
            >
                <div className="space-y-4">
                    <Input
                        placeholder="题目标题"
                        value={questionForm.title}
                        onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                    />

                    <Select
                        placeholder="题目类型"
                        className="w-full"
                        value={questionForm.type}
                        onChange={(value) => setQuestionForm({ ...questionForm, type: value })}
                    >
                        <Select.Option value="choice">单选题</Select.Option>
                        <Select.Option value="multi-choice">多选题</Select.Option>
                        <Select.Option value="true-false">判断题</Select.Option>
                        <Select.Option value="fill">填空题</Select.Option>
                        <Select.Option value="subjective">主观题</Select.Option>
                    </Select>

                    <TextArea
                        placeholder="题目内容"
                        rows={3}
                        value={questionForm.content}
                        onChange={(e) => setQuestionForm({ ...questionForm, content: e.target.value })}
                    />

                    {['choice', 'multi-choice'].includes(questionForm.type) && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-700">选项：</p>
                            {questionForm.options.map((option, idx) => (
                                <Input
                                    key={idx}
                                    placeholder={`选项 ${String.fromCharCode(65 + idx)}`}
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...questionForm.options];
                                        newOptions[idx] = e.target.value;
                                        setQuestionForm({ ...questionForm, options: newOptions });
                                    }}
                                    prefix={<span className="font-medium text-slate-500">{String.fromCharCode(65 + idx)}.</span>}
                                />
                            ))}
                        </div>
                    )}

                    <Input
                        placeholder="参考答案"
                        value={questionForm.answer}
                        onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                    />

                    <TextArea
                        placeholder="答案解析（可选）"
                        rows={2}
                        value={questionForm.analysis}
                        onChange={(e) => setQuestionForm({ ...questionForm, analysis: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            placeholder="难度"
                            value={questionForm.difficulty}
                            onChange={(value) => setQuestionForm({ ...questionForm, difficulty: value })}
                        >
                            <Select.Option value="easy">简单</Select.Option>
                            <Select.Option value="medium">中等</Select.Option>
                            <Select.Option value="hard">困难</Select.Option>
                        </Select>
                        <Input
                            placeholder="关联知识点"
                            value={questionForm.knowledge}
                            onChange={(e) => setQuestionForm({ ...questionForm, knowledge: e.target.value })}
                        />
                    </div>

                    <Select
                        mode="tags"
                        placeholder="添加标签"
                        className="w-full"
                        value={questionForm.tags}
                        onChange={(value) => setQuestionForm({ ...questionForm, tags: value })}
                    />
                    <Select
                        placeholder="归属文件夹"
                        className="w-full"
                        value={questionForm.folderId}
                        onChange={(value) => setQuestionForm({ ...questionForm, folderId: value })}
                    >
                        <Select.Option value="uncategorized">未分配</Select.Option>
                        {selectableFolders.map(folder => (
                            <Select.Option key={folder.id} value={folder.id}>
                                {folder.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={() => setIsQuestionModalVisible(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleConfirmQuestion}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            确认创建
                        </button>
                    </div>
                </div>
            </Modal>

            {/* 新建文件夹 */}
            <Modal
                title="新建文件夹"
                open={isFolderModalVisible}
                onCancel={() => setIsFolderModalVisible(false)}
                onOk={handleCreateFolder}
                okText="创建"
                cancelText="取消"
            >
                <div className="space-y-4">
                    <Input
                        placeholder="文件夹名称"
                        value={folderForm.name}
                        onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                    />
                    <Select
                        placeholder="父级文件夹"
                        className="w-full"
                        value={folderForm.parentId}
                        onChange={(value) => setFolderForm({ ...folderForm, parentId: value })}
                    >
                        <Select.Option value="root">顶级文件夹</Select.Option>
                        {folderOptions.map(folder => (
                            <Select.Option key={folder.id} value={folder.id}>
                                {folder.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>

            {/* 移动资料到文件夹 */}
            <Modal
                title="移动到文件夹"
                open={isMoveModalVisible}
                onCancel={() => {
                    setIsMoveModalVisible(false);
                    setResourceToMove(null);
                }}
                onOk={handleMoveResource}
                okText="移动"
                cancelText="取消"
            >
                <Select
                    className="w-full"
                    value={moveFolderId}
                    onChange={(value) => setMoveFolderId(value)}
                >
                    <Select.Option value="uncategorized">未分配</Select.Option>
                    {selectableFolders.map(folder => (
                        <Select.Option key={folder.id} value={folder.id}>
                            {folder.name}
                        </Select.Option>
                    ))}
                </Select>
            </Modal>

            {/* 预览弹窗 */}
            <Modal
                title={
                    <div className="flex items-center justify-between pr-8">
                        <span>{selectedResource?.title}</span>
                        {selectedResource?.type === 'h5' && (
                            <a
                                href={selectedResource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={14} />
                                新窗口打开
                            </a>
                        )}
                    </div>
                }
                open={isPreviewModalVisible}
                onCancel={() => setIsPreviewModalVisible(false)}
                footer={selectedResource?.type === 'h5' ? (
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsPreviewModalVisible(false)}
                            className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            关闭
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between">
                        <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2">
                            <Download size={16} />
                            下载
                        </button>
                        <button
                            onClick={() => setIsPreviewModalVisible(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            关闭
                        </button>
                    </div>
                )}
                width={selectedResource?.type === 'h5' ? 1200 : 800}
                style={{ top: 20 }}
            >
                {renderPreviewContent()}
            </Modal>
        </div>
    );
};

export default TeacherResourceManager;
