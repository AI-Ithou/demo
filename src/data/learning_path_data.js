// 学习路径数据 - 我的学习路径页面

export const learningPathData = {
    // AI能力模型评估数据
    abilityModel: {
        studentName: "张三",
        currentGoal: "预备 & 实践班",
        categories: [
            { name: "预备", value: 85, max: 100 },
            { name: "视觉", value: 70, max: 100 },
            { name: "分析", value: 85, max: 100 },
            { name: "记忆", value: 75, max: 100 },
            { name: "逻辑", value: 95, max: 100 }
        ],
        learningGoal: "当前学习目标",
        targetTime: "预计一次通过",
        studyDuration: "预计学习时长: 120小时"
    },

    // AI个性化学习建议
    aiRecommendation: {
        title: "AI个性化学习建议",
        suggestion: "推荐选课模式并开启对应练习P10"
    },

    // 学习路径流程节点
    pathNodes: [
        // 第一阶段 - 初步
        {
            id: "initial-cut",
            label: "几何初步",
            stage: 1,
            status: "completed",
            progress: 100,
            description: "掌握点、线、面、体的基本概念，理解几何图形的性质。",
            stats: { resources: 5, exercises: 20, questions: 2 },
            position: { x: 100, y: 300 },
            color: "#10b981" // emerald
        },

        // 第二阶段 - 一次函数
        {
            id: "linear-function",
            label: "一次函数",
            stage: 2,
            status: "completed",
            progress: 100,
            description: "理解一次函数的定义、图像和性质，掌握待定系数法求解析式。",
            stats: { resources: 8, exercises: 35, questions: 5 },
            position: { x: 300, y: 300 },
            color: "#3b82f6" // blue
        },

        // 第三阶段 - 分支开始
        {
            id: "equation-group",
            label: "一元一次方程组",
            stage: 3,
            status: "current",
            progress: 45,
            description: "掌握代入消元法和加减消元法，解决实际问题。",
            stats: { resources: 12, exercises: 40, questions: 8 },
            position: { x: 500, y: 300 },
            color: "#fbbf24" // amber
        },

        // 第四阶段 - 多个分支 (丰富路径)
        {
            id: "quadratic-function-1",
            label: "二次函数基础",
            stage: 4,
            status: "locked",
            progress: 0,
            description: "二次函数的定义与图像性质。",
            stats: { resources: 6, exercises: 15, questions: 0 },
            position: { x: 700, y: 150 },
            color: "#94a3b8" // slate
        },
        {
            id: "fraction",
            label: "分式运算",
            stage: 4,
            status: "locked",
            progress: 0,
            description: "分式的乘除、加减及混合运算。",
            stats: { resources: 4, exercises: 10, questions: 0 },
            position: { x: 700, y: 300 },
            color: "#94a3b8"
        },
        {
            id: "triangle",
            label: "全等三角形",
            stage: 4,
            status: "locked",
            progress: 0,
            description: "全等三角形的判定与性质。",
            stats: { resources: 7, exercises: 25, questions: 0 },
            position: { x: 700, y: 450 },
            color: "#10b981"
        },

        // 第五阶段 - 进阶分支
        {
            id: "statistics",
            label: "统计与概率",
            stage: 5,
            status: "locked",
            progress: 0,
            description: "数据的收集、整理与描述，概率初步。",
            stats: { resources: 5, exercises: 12, questions: 0 },
            position: { x: 900, y: 300 },
            color: "#94a3b8"
        },
        {
            id: "circle",
            label: "圆的性质",
            stage: 5,
            status: "locked",
            progress: 0,
            description: "圆的对称性、垂径定理、圆周角定理。",
            stats: { resources: 9, exercises: 30, questions: 0 },
            position: { x: 900, y: 450 },
            color: "#8b5cf6" // violet
        },
        {
            id: "inequality",
            label: "一元一次不等式",
            stage: 5,
            status: "locked",
            progress: 0,
            description: "不等式的性质与解法。",
            stats: { resources: 3, exercises: 8, questions: 0 },
            position: { x: 900, y: 150 },
            color: "#ec4899" // pink
        },

        // 第六阶段 - 综合应用
        {
            id: "secondary-function-adv",
            label: "二次函数综合",
            stage: 6,
            status: "locked",
            progress: 0,
            description: "二次函数与几何图形的综合问题。",
            stats: { resources: 10, exercises: 50, questions: 0 },
            position: { x: 1100, y: 300 },
            color: "#f43f5e" // rose
        },
        {
            id: "solid-geometry",
            label: "立体几何初步",
            stage: 6,
            status: "locked",
            progress: 0,
            description: "空间几何体的结构、三视图和直观图。",
            stats: { resources: 6, exercises: 18, questions: 0 },
            position: { x: 1100, y: 450 },
            color: "#06b6d4" // cyan
        }
    ],

    // 连接线定义
    connections: [
        { from: "initial-cut", to: "linear-function" },
        { from: "linear-function", to: "equation-group" },

        { from: "equation-group", to: "quadratic-function-1" },
        { from: "equation-group", to: "fraction" },
        { from: "equation-group", to: "triangle" },

        { from: "fraction", to: "statistics" },
        { from: "triangle", to: "circle" },
        { from: "quadratic-function-1", to: "inequality" },

        { from: "statistics", to: "secondary-function-adv" },
        { from: "circle", to: "solid-geometry" },
        { from: "inequality", to: "secondary-function-adv" }
    ]
};

export default learningPathData;
