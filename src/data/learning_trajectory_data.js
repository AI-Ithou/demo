// 学习轨迹回放数据 - 历史学习记录

export const learningTrajectoryData = {
    // 学习轨迹节点 - 按时间顺序
    trajectoryNodes: [
        {
            id: "traj-1",
            title: "有理数运算",
            subtitle: "基础概念",
            date: "2024-11-01",
            stats: { resources: 3, exercises: 12, questions: 1 },
            position: { x: 200, y: 200 },
            status: "completed",
            score: 92
        },
        {
            id: "traj-2",
            title: "整式加减",
            subtitle: "代数基础",
            date: "2024-11-05",
            stats: { resources: 4, exercises: 18, questions: 2 },
            position: { x: 400, y: 250 },
            status: "completed",
            score: 88
        },
        {
            id: "traj-3",
            title: "一元一次方程",
            subtitle: "方程求解",
            date: "2024-11-08",
            stats: { resources: 5, exercises: 25, questions: 4 },
            position: { x: 600, y: 200 },
            status: "completed",
            score: 95
        },
        {
            id: "traj-4",
            title: "几何初步",
            subtitle: "点线面体",
            date: "2024-11-12",
            stats: { resources: 6, exercises: 20, questions: 3 },
            position: { x: 800, y: 300 },
            status: "completed",
            score: 85
        },
        {
            id: "traj-5",
            title: "相交线与平行线",
            subtitle: "几何证明",
            date: "2024-11-15",
            stats: { resources: 7, exercises: 22, questions: 5 },
            position: { x: 1000, y: 250 },
            status: "completed",
            score: 90
        },
        {
            id: "traj-6",
            title: "实数运算",
            subtitle: "数系扩充",
            date: "2024-11-18",
            stats: { resources: 4, exercises: 15, questions: 2 },
            position: { x: 1200, y: 200 },
            status: "completed",
            score: 87
        },
        {
            id: "traj-7",
            title: "平面直角坐标系",
            subtitle: "坐标几何",
            date: "2024-11-20",
            stats: { resources: 5, exercises: 18, questions: 3 },
            position: { x: 1400, y: 300 },
            status: "completed",
            score: 93
        },
        {
            id: "traj-8",
            title: "二元一次方程组",
            subtitle: "方程组求解",
            date: "2024-11-22",
            stats: { resources: 6, exercises: 28, questions: 6 },
            position: { x: 1600, y: 250 },
            status: "completed",
            score: 91
        },
        {
            id: "traj-9",
            title: "不等式与不等式组",
            subtitle: "不等关系",
            date: "2024-11-24",
            stats: { resources: 5, exercises: 20, questions: 4 },
            position: { x: 1800, y: 200 },
            status: "completed",
            score: 89
        },
        {
            id: "traj-10",
            title: "概念修正",
            subtitle: "知识巩固",
            date: "2024-11-26",
            stats: { resources: 2, exercises: 15, questions: 3 },
            position: { x: 2000, y: 300 },
            status: "current",
            score: null
        }
    ],

    // 学习统计总览
    summary: {
        totalDays: 25,
        totalTopics: 10,
        completedTopics: 9,
        totalResources: 47,
        totalExercises: 193,
        totalQuestions: 33,
        averageScore: 90
    }
};

export default learningTrajectoryData;
