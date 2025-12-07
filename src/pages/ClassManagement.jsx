import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Users, Search, Plus, Edit, Trash2,
    BookOpen, Eye
} from 'lucide-react';
import { message } from 'antd';

const ClassManagement = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        teacher: '',
        studentCount: 0,
        description: ''
    });

    useEffect(() => {
        loadClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadClasses = () => {
        const stored = localStorage.getItem('classes');
        if (stored) {
            setClasses(JSON.parse(stored));
        } else {
            // 初始化mock数据
            const mockClasses = [
                { id: '1', name: '高一(1)班', grade: '高一', teacher: '张老师', studentCount: 45, description: '理科实验班' },
                { id: '2', name: '高一(2)班', grade: '高一', teacher: '李老师', studentCount: 42, description: '文科重点班' },
                { id: '3', name: '高一(3)班', grade: '高一', teacher: '王老师', studentCount: 40, description: '普通班' },
            ];
            setClasses(mockClasses);
            localStorage.setItem('classes', JSON.stringify(mockClasses));
        }
    };

    const saveClasses = (updatedClasses) => {
        localStorage.setItem('classes', JSON.stringify(updatedClasses));
        setClasses(updatedClasses);
    };

    const handleAdd = () => {
        setEditingClass(null);
        setFormData({ name: '', grade: '', teacher: '', studentCount: 0, description: '' });
        setShowAddDialog(true);
    };

    const handleEdit = (cls) => {
        setEditingClass(cls);
        setFormData(cls);
        setShowAddDialog(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('确定要删除该班级吗？');
        if (confirmed) {
            const updated = classes.filter(c => c.id !== id);
            saveClasses(updated);
            message.success('删除成功');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.grade) {
            message.error('请填写必填项');
            return;
        }

        let updated;
        if (editingClass) {
            updated = classes.map(c => c.id === editingClass.id ? { ...formData, id: c.id } : c);
            message.success('修改成功');
        } else {
            const newClass = { ...formData, id: Date.now().toString() };
            updated = [...classes, newClass];
            message.success('添加成功');
        }

        saveClasses(updated);
        setShowAddDialog(false);
        setFormData({ name: '', grade: '', teacher: '', studentCount: 0, description: '' });
    };

    const filteredClasses = classes.filter(c =>
        c.name.includes(searchText) ||
        c.grade.includes(searchText) ||
        c.teacher.includes(searchText)
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">班级管理</h1>
                                    <p className="text-sm text-slate-500">管理所有班级信息</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                        >
                            <Plus size={20} />
                            添加班级
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-100 text-sm font-medium">总班级数</span>
                            <BookOpen size={20} className="text-emerald-100" />
                        </div>
                        <div className="text-3xl font-bold">{classes.length}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-100 text-sm font-medium">总学生数</span>
                            <Users size={20} className="text-blue-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {classes.reduce((sum, c) => sum + (c.studentCount || 0), 0)}
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-100 text-sm font-medium">平均班级人数</span>
                            <Users size={20} className="text-purple-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {classes.length > 0 ? Math.round(classes.reduce((sum, c) => sum + (c.studentCount || 0), 0) / classes.length) : 0}
                        </div>
                    </div>
                </div>

                {/* 搜索和筛选 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="搜索班级名称、年级或班主任..."
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 班级列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClasses.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">{cls.name}</h3>
                                    <p className="text-sm text-slate-500">{cls.grade}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(cls)}
                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cls.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-t border-slate-100">
                                    <span className="text-sm text-slate-600">班主任</span>
                                    <span className="text-sm font-medium text-slate-800">{cls.teacher || '未设置'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-t border-slate-100">
                                    <span className="text-sm text-slate-600">学生人数</span>
                                    <span className="text-sm font-bold text-blue-600">{cls.studentCount}人</span>
                                </div>
                                {cls.description && (
                                    <div className="py-2 border-t border-slate-100">
                                        <p className="text-sm text-slate-600">{cls.description}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => navigate(`/teacher/class/${cls.id}/students`)}
                                className="mt-4 w-full px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <Eye size={16} />
                                查看学生
                            </button>
                        </div>
                    ))}
                </div>

                {filteredClasses.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        暂无班级数据
                    </div>
                )}
            </main>

            {/* 添加/编辑对话框 */}
            {showAddDialog && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">
                                {editingClass ? '编辑班级' : '添加班级'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        班级名称 *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="例如：高一(1)班"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        年级 *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        placeholder="例如：高一"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        班主任
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.teacher}
                                        onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                        placeholder="班主任姓名"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        学生人数
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.studentCount}
                                        onChange={(e) => setFormData({ ...formData, studentCount: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        班级描述
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="例如：理科实验班"
                                        rows={3}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddDialog(false)}
                                    className="flex-1 px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                                >
                                    {editingClass ? '保存' : '添加'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassManagement;
