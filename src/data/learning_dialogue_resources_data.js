// 资源推荐数据 - 视频、文章、图表等学习资源

const learningResourcesData = {
    // 波粒二象性相关资源
    'wave-particle-duality': {
        nodeId: 'node-3',
        topic: '波粒二象性',
        videos: [
            {
                id: 'video-1',
                title: '5分钟理解波粒二象性',
                description: '通过动画演示,直观理解光的波粒二象性。适合初学者快速入门。',
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
                duration: '05:23',
                difficulty: 'beginner',
                tags: ['动画', '入门', '核心概念'],
                views: '125k',
                rating: 4.8
            },
            {
                id: 'video-2',
                title: '双缝实验完整解析',
                description: '深入讲解经典的双缝干涉实验,包括实验设计、现象观察和理论解释。',
                thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800',
                duration: '12:45',
                difficulty: 'intermediate',
                tags: ['实验', '深度讲解', '干涉'],
                views: '89k',
                rating: 4.9
            },
            {
                id: 'video-3',
                title: '量子力学的哲学思考',
                description: '从波粒二象性出发,探讨量子力学背后的哲学含义和科学家的争论。',
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
                duration: '18:30',
                difficulty: 'advanced',
                tags: ['哲学', '进阶', '思维拓展'],
                views: '56k',
                rating: 4.7
            }
        ],
        articles: [
            {
                id: 'article-1',
                title: '波粒二象性的历史演进',
                description: '从牛顿的粒子说到麦克斯韦的波动说,再到爱因斯坦的光量子假说,了解这一概念的发展历程。',
                type: 'history',
                readTime: '8分钟',
                difficulty: 'intermediate',
                tags: ['历史', '科学家', '理论发展'],
                icon: '📚'
            },
            {
                id: 'article-2',
                title: '双缝实验的变体与应用',
                description: '探索双缝实验的各种变体,以及在现代量子技术中的应用。',
                type: 'application',
                readTime: '10分钟',
                difficulty: 'advanced',
                tags: ['应用', '量子技术', '实验'],
                icon: '🔬'
            },
            {
                id: 'article-3',
                title: '波粒二象性的数学描述',
                description: '用数学语言精确描述波粒二象性,包括波函数、概率幅等核心概念。',
                type: 'mathematics',
                readTime: '15分钟',
                difficulty: 'advanced',
                tags: ['数学', '波函数', '公式推导'],
                icon: '📐'
            }
        ],
        diagrams: [
            {
                id: 'diagram-1',
                title: '双缝干涉示意图',
                description: '清晰展示双缝实验的装置、光路和干涉条纹形成过程。',
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
                type: 'schematic',
                tags: ['实验装置', '光路图']
            },
            {
                id: 'diagram-2',
                title: '波函数演化图解',
                description: '可视化展示粒子波函数随时间的演化和坍缩过程。',
                thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600',
                type: 'animation',
                tags: ['波函数', '动态演示']
            }
        ],
        interactiveTools: [
            {
                id: 'tool-1',
                title: '双缝实验模拟器',
                description: '交互式模拟双缝实验,可调节缝宽、缝距、波长等参数,实时观察干涉图样变化。',
                type: 'simulator',
                difficulty: 'intermediate',
                icon: '🎮'
            }
        ]
    },

    // 不确定性原理相关资源
    'uncertainty-principle': {
        nodeId: 'node-4',
        topic: '不确定性原理',
        videos: [
            {
                id: 'video-4',
                title: '海森堡不确定性原理入门',
                description: '用简单的例子解释为什么我们无法同时精确测量位置和动量。',
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
                duration: '07:15',
                difficulty: 'beginner',
                tags: ['入门', '核心概念', '测量'],
                views: '98k',
                rating: 4.7
            }
        ],
        articles: [
            {
                id: 'article-4',
                title: '不确定性原理的数学推导',
                description: '从傅里叶变换出发,严格推导海森堡不确定性关系。',
                type: 'mathematics',
                readTime: '20分钟',
                difficulty: 'advanced',
                tags: ['数学', '推导', '傅里叶变换'],
                icon: '🔢'
            }
        ],
        diagrams: [],
        interactiveTools: []
    }
};

// 辅助函数:根据知识点获取所有资源
export const getResourcesByTopic = (topicKey) => {
    return learningResourcesData[topicKey] || null;
};

// 辅助函数:根据难度筛选资源
export const filterResourcesByDifficulty = (topicKey, difficulty) => {
    const resources = learningResourcesData[topicKey];
    if (!resources) return null;

    return {
        videos: resources.videos.filter(v => v.difficulty === difficulty),
        articles: resources.articles.filter(a => a.difficulty === difficulty)
    };
};

// 辅助函数:根据用户掌握程度推荐资源
export const recommendResources = (topicKey, masteryLevel) => {
    const resources = learningResourcesData[topicKey];
    if (!resources) return [];

    const recommendations = [];

    switch (masteryLevel) {
        case 'level_1': // 完全不会
        case 'level_2': // 本知识点不会
            // 推荐入门视频和简单文章
            recommendations.push(...resources.videos.filter(v => v.difficulty === 'beginner'));
            recommendations.push(...resources.articles.filter(a => a.difficulty === 'beginner' || a.difficulty === 'intermediate'));
            break;
        case 'level_3_low': // 会一些
            // 推荐中级资源
            recommendations.push(...resources.videos.filter(v => v.difficulty === 'intermediate'));
            recommendations.push(...resources.articles.filter(a => a.difficulty === 'intermediate'));
            break;
        case 'level_3_high': // 会很多
        case 'level_4': // 完全掌握
            // 推荐进阶资源
            recommendations.push(...resources.videos.filter(v => v.difficulty === 'advanced'));
            recommendations.push(...resources.articles.filter(a => a.difficulty === 'advanced'));
            break;
        default:
            recommendations.push(...resources.videos.slice(0, 2));
    }

    return recommendations.slice(0, 3); // 最多返回3个推荐
};

export default learningResourcesData;
