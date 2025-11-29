// 我的学习路径规划数据 - AI能力模型 + 流程图

export const myLearningPathData = {
    // AI能力模型评估
    abilityModel: {
        studentName: "张三",
        currentGoal: "预备 & 实践班",
        targetScore: "120分",
        studyDuration: "预计一次通过",
        estimatedHours: "预计学习时长: 120小时",

        // 雷达图数据
        dimensions: [
            { name: "预备", value: 85, max: 100, color: "#3b82f6" },
            { name: "视觉", value: 70, max: 100, color: "#10b981" },
            { name: "分析", value: 85, max: 100, color: "#f59e0b" },
            { name: "记忆", value: 75, max: 100, color: "#8b5cf6" },
            { name: "逻辑", value: 95, max: 100, color: "#ec4899" }
        ],

        // AI建议
        recommendation: {
            title: "AI个性化学习建议",
            content: "推荐选课模式并开启对应练习P10",
            suggestions: [
                "逻辑能力突出,适合深入学习证明类题目",
                "视觉能力需加强,建议多做几何图形题",
                "记忆能力中等,需要定期复习巩固"
            ]
        }
    },

    // 流程图节点
    flowNodes: [
        // 第一阶段
        {
            id: "stage-1",
            type: "stage",
            title: "一元一次方程",
            stage: 1,
            status: "completed",
            position: { x: 150, y: 300 },
            color: "#10b981"
        },

        // 第二阶段
        {
            id: "stage-2",
            type: "stage",
            title: "一次函数",
            stage: 2,
            status: "completed",
            position: { x: 350, y: 300 },
            color: "#10b981"
        },

        // 第三阶段 - 分支开始
        {
            id: "stage-3-main",
            type: "stage",
            title: "二元一次方程组",
            stage: 3,
            status: "current",
            position: { x: 550, y: 300 },
            color: "#f59e0b"
        },

        // 第四阶段 - 多分支
        {
            id: "branch-4-1",
            type: "branch",
            title: "因式分解",
            stage: 4,
            status: "locked",
            position: { x: 750, y: 200 },
            color: "#9ca3af"
        },
        {
            id: "branch-4-2",
            type: "branch",
            title: "分式",
            stage: 4,
            status: "locked",
            position: { x: 750, y: 300 },
            color: "#9ca3af"
        },
        {
            id: "branch-4-3",
            type: "branch",
            title: "三角形",
            stage: 4,
            status: "locked",
            position: { x: 750, y: 400 },
            color: "#9ca3af"
        },

        // 第五阶段
        {
            id: "stage-5-1",
            type: "stage",
            title: "二次函数",
            stage: 5,
            status: "locked",
            position: { x: 950, y: 250 },
            color: "#9ca3af"
        },
        {
            id: "stage-5-2",
            type: "stage",
            title: "圆",
            stage: 5,
            status: "locked",
            position: { x: 950, y: 350 },
            color: "#9ca3af"
        },

        // 第六阶段 - 汇总
        {
            id: "stage-6",
            type: "stage",
            title: "综合应用",
            stage: 6,
            status: "locked",
            position: { x: 1150, y: 300 },
            color: "#9ca3af"
        }
    ],

    // 连接关系
    connections: [
        { from: "stage-1", to: "stage-2", type: "main" },
        { from: "stage-2", to: "stage-3-main", type: "main" },

        { from: "stage-3-main", to: "branch-4-1", type: "branch" },
        { from: "stage-3-main", to: "branch-4-2", type: "branch" },
        { from: "stage-3-main", to: "branch-4-3", type: "branch" },

        { from: "branch-4-1", to: "stage-5-1", type: "merge" },
        { from: "branch-4-2", to: "stage-5-1", type: "merge" },
        { from: "branch-4-3", to: "stage-5-2", type: "merge" },

        { from: "stage-5-1", to: "stage-6", type: "main" },
        { from: "stage-5-2", to: "stage-6", type: "main" }
    ]
};

export default myLearningPathData;
