// 班级数据管理

export const TEACHER_CLASSES = [
    {
        id: 'class-001',
        name: '高一(3)班',
        grade: '高一',
        subject: '数学',
        studentCount: 45,
        description: '理科实验班',
        classTeacher: '张老师',
        schedule: '周一至周五 8:00-9:30'
    },
    {
        id: 'class-002',
        name: '高一(5)班',
        grade: '高一',
        subject: '数学',
        studentCount: 42,
        description: '普通班',
        classTeacher: '李老师',
        schedule: '周一至周五 10:00-11:30'
    },
    {
        id: 'class-003',
        name: '高二(1)班',
        grade: '高二',
        subject: '数学',
        studentCount: 38,
        description: '竞赛班',
        classTeacher: '王老师',
        schedule: '周一至周五 14:00-15:30'
    }
];

// 班级管理器
export class ClassManager {
    // 获取所有班级
    static getAllClasses() {
        return TEACHER_CLASSES;
    }

    // 获取当前选中的班级
    static getCurrentClass() {
        const classId = localStorage.getItem('currentClassId');
        return this.getAllClasses().find(c => c.id === classId) || TEACHER_CLASSES[0];
    }

    // 设置当前班级
    static setCurrentClass(classId) {
        localStorage.setItem('currentClassId', classId);
    }

    // 获取班级学生（根据班级ID筛选）
    static getClassStudents(classId) {
        // TODO: 实际应该根据classId从数据库获取
        // 这里先返回模拟数据
        return require('./student_path_data').MOCK_STUDENTS;
    }
}

export default {
    TEACHER_CLASSES,
    ClassManager
};
