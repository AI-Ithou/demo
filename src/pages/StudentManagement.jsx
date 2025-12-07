import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Users, Search, Plus, Edit, Trash2,
    Download, Upload, Mail, Phone, BookOpen
} from 'lucide-react';
import { message } from 'antd';

const StudentManagement = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        class: '',
        email: '',
        phone: '',
        grade: ''
    });

    useEffect(() => {
        loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadStudents = () => {
        const stored = localStorage.getItem('students');
        if (stored) {
            setStudents(JSON.parse(stored));
        } else {
            // 初始化一些mock数据
            const mockStudents = [
                { id: '1', name: '张三', studentId: '2021001', class: '高一(1)班', grade: '高一', email: 'zhangsan@example.com', phone: '138****1234' },
                { id: '2', name: '李四', studentId: '2021002', class: '高一(1)班', grade: '高一', email: 'lisi@example.com', phone: '139****5678' },
                { id: '3', name: '王五', studentId: '2021003', class: '高一(2)班', grade: '高一', email: 'wangwu@example.com', phone: '137****9012' },
            ];
            setStudents(mockStudents);
            localStorage.setItem('students', JSON.stringify(mockStudents));
        }
    };

    const saveStudents = (updatedStudents) => {
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudents(updatedStudents);
    };

    const handleAdd = () => {
        setEditingStudent(null);
        setFormData({ name: '', studentId: '', class: '', email: '', phone: '', grade: '' });
        setShowAddDialog(true);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData(student);
        setShowAddDialog(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('确定要删除该学生吗？');
        if (confirmed) {
            const updated = students.filter(s => s.id !== id);
            saveStudents(updated);
            message.success('删除成功');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.studentId) {
            message.error('请填写必填项');
            return;
        }

        let updated;
        if (editingStudent) {
            updated = students.map(s => s.id === editingStudent.id ? { ...formData, id: s.id } : s);
            message.success('修改成功');
        } else {
            const newStudent = { ...formData, id: Date.now().toString() };
            updated = [...students, newStudent];
            message.success('添加成功');
        }

        saveStudents(updated);
        setShowAddDialog(false);
        setFormData({ name: '', studentId: '', class: '', email: '', phone: '', grade: '' });
    };

    const filteredStudents = students.filter(s =>
        s.name.includes(searchText) ||
        s.studentId.includes(searchText) ||
        s.class.includes(searchText)
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
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                                    <Users className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">学生管理</h1>
                                    <p className="text-sm text-slate-500">管理所有学生信息</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Plus size={20} />
                            添加学生
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-100 text-sm font-medium">总学生数</span>
                            <Users size={20} className="text-blue-100" />
                        </div>
                        <div className="text-3xl font-bold">{students.length}</div>
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
                                placeholder="搜索学生姓名、学号或班级..."
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 学生列表 */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">姓名</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">学号</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">班级</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">年级</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">联系方式</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">{student.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{student.studentId}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.class}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.grade}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Mail size={14} />
                                                {student.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} />
                                                {student.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            暂无学生数据
                        </div>
                    )}
                </div>
            </main>

            {/* 添加/编辑对话框 */}
            {showAddDialog && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">
                                {editingStudent ? '编辑学生' : '添加学生'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        姓名 *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        学号 *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        班级
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        年级
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        邮箱
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        电话
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                                >
                                    {editingStudent ? '保存' : '添加'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagement;
