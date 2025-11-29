// 层级化知识点数据 - 模拟高中数学教材目录结构

export const KNOWLEDGE_TREE = {
    id: 'math-hs',
    name: '高中数学',
    level: 0,
    children: [
        {
            id: 'chapter-1',
            name: '第一章 集合与函数',
            level: 1,
            children: [
                {
                    id: '1.1',
                    name: '1.1 集合',
                    level: 2,
                    children: [
                        {
                            id: '1.1.1',
                            name: '1.1.1 集合的含义与表示',
                            level: 3,
                            estimatedHours: 4,
                            difficulty: 'basic',
                            tags: ['集合', '基础概念']
                        },
                        {
                            id: '1.1.2',
                            name: '1.1.2 集合间的基本关系',
                            level: 3,
                            estimatedHours: 3,
                            difficulty: 'basic',
                            tags: ['集合', '关系']
                        },
                        {
                            id: '1.1.3',
                            name: '1.1.3 集合的基本运算',
                            level: 3,
                            estimatedHours: 5,
                            difficulty: 'basic',
                            tags: ['集合', '运算']
                        }
                    ]
                },
                {
                    id: '1.2',
                    name: '1.2 函数及其表示',
                    level: 2,
                    children: [
                        {
                            id: '1.2.1',
                            name: '1.2.1 函数的概念',
                            level: 3,
                            estimatedHours: 6,
                            difficulty: 'basic',
                            tags: ['函数', '概念']
                        },
                        {
                            id: '1.2.2',
                            name: '1.2.2 函数的表示法',
                            level: 3,
                            estimatedHours: 4,
                            difficulty: 'basic',
                            tags: ['函数', '表示']
                        },
                        {
                            id: '1.2.3',
                            name: '1.2.3 函数的基本性质',
                            level: 3,
                            estimatedHours: 8,
                            difficulty: 'intermediate',
                            tags: ['函数', '性质']
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-2',
            name: '第二章 基本初等函数',
            level: 1,
            children: [
                {
                    id: '2.1',
                    name: '2.1 指数函数',
                    level: 2,
                    children: [
                        {
                            id: '2.1.1',
                            name: '2.1.1 指数与指数幂的运算',
                            level: 3,
                            estimatedHours: 6,
                            difficulty: 'intermediate',
                            tags: ['指数', '运算']
                        },
                        {
                            id: '2.1.2',
                            name: '2.1.2 指数函数及其性质',
                            level: 3,
                            estimatedHours: 8,
                            difficulty: 'intermediate',
                            tags: ['指数函数', '性质']
                        }
                    ]
                },
                {
                    id: '2.2',
                    name: '2.2 对数函数',
                    level: 2,
                    children: [
                        {
                            id: '2.2.1',
                            name: '2.2.1 对数与对数运算',
                            level: 3,
                            estimatedHours: 7,
                            difficulty: 'intermediate',
                            tags: ['对数', '运算']
                        },
                        {
                            id: '2.2.2',
                            name: '2.2.2 对数函数及其性质',
                            level: 3,
                            estimatedHours: 9,
                            difficulty: 'intermediate',
                            tags: ['对数函数', '性质']
                        }
                    ]
                },
                {
                    id: '2.3',
                    name: '2.3 幂函数',
                    level: 2,
                    children: [
                        {
                            id: '2.3.1',
                            name: '2.3.1 幂函数的概念',
                            level: 3,
                            estimatedHours: 5,
                            difficulty: 'intermediate',
                            tags: ['幂函数', '概念']
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-3',
            name: '第三章 三角函数',
            level: 1,
            children: [
                {
                    id: '3.1',
                    name: '3.1 任意角和弧度制',
                    level: 2,
                    children: [
                        {
                            id: '3.1.1',
                            name: '3.1.1 任意角',
                            level: 3,
                            estimatedHours: 4,
                            difficulty: 'basic',
                            tags: ['角', '概念']
                        },
                        {
                            id: '3.1.2',
                            name: '3.1.2 弧度制',
                            level: 3,
                            estimatedHours: 5,
                            difficulty: 'intermediate',
                            tags: ['弧度', '换算']
                        }
                    ]
                },
                {
                    id: '3.2',
                    name: '3.2 三角函数',
                    level: 2,
                    children: [
                        {
                            id: '3.2.1',
                            name: '3.2.1 任意角的三角函数',
                            level: 3,
                            estimatedHours: 8,
                            difficulty: 'intermediate',
                            tags: ['三角函数', '定义']
                        },
                        {
                            id: '3.2.2',
                            name: '3.2.2 同角三角函数的关系',
                            level: 3,
                            estimatedHours: 6,
                            difficulty: 'intermediate',
                            tags: ['三角函数', '关系']
                        }
                    ]
                },
                {
                    id: '3.3',
                    name: '3.3 三角函数的图像与性质',
                    level: 2,
                    children: [
                        {
                            id: '3.3.1',
                            name: '3.3.1 正弦函数、余弦函数的图像',
                            level: 3,
                            estimatedHours: 10,
                            difficulty: 'intermediate',
                            tags: ['图像', '性质']
                        },
                        {
                            id: '3.3.2',
                            name: '3.3.2 正弦函数、余弦函数的性质',
                            level: 3,
                            estimatedHours: 12,
                            difficulty: 'advanced',
                            tags: ['函数性质', '周期']
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-4',
            name: '第四章 平面向量',
            level: 1,
            children: [
                {
                    id: '4.1',
                    name: '4.1 平面向量的实际背景及基本概念',
                    level: 2,
                    children: [
                        {
                            id: '4.1.1',
                            name: '4.1.1 向量的物理背景与概念',
                            level: 3,
                            estimatedHours: 5,
                            difficulty: 'basic',
                            tags: ['向量', '概念']
                        },
                        {
                            id: '4.1.2',
                            name: '4.1.2 向量的几何表示',
                            level: 3,
                            estimatedHours: 4,
                            difficulty: 'basic',
                            tags: ['向量', '表示']
                        }
                    ]
                },
                {
                    id: '4.2',
                    name: '4.2 平面向量的线性运算',
                    level: 2,
                    children: [
                        {
                            id: '4.2.1',
                            name: '4.2.1 向量加法运算及其几何意义',
                            level: 3,
                            estimatedHours: 6,
                            difficulty: 'intermediate',
                            tags: ['向量', '加法']
                        },
                        {
                            id: '4.2.2',
                            name: '4.2.2 向量减法运算及其几何意义',
                            level: 3,
                            estimatedHours: 6,
                            difficulty: 'intermediate',
                            tags: ['向量', '减法']
                        },
                        {
                            id: '4.2.3',
                            name: '4.2.3 向量数乘运算及其几何意义',
                            level: 3,
                            estimatedHours: 7,
                            difficulty: 'intermediate',
                            tags: ['向量', '数乘']
                        }
                    ]
                },
                {
                    id: '4.3',
                    name: '4.3 平面向量的数量积',
                    level: 2,
                    children: [
                        {
                            id: '4.3.1',
                            name: '4.3.1 平面向量数量积的物理背景及其含义',
                            level: 3,
                            estimatedHours: 8,
                            difficulty: 'advanced',
                            tags: ['数量积', '物理']
                        },
                        {
                            id: '4.3.2',
                            name: '4.3.2 平面向量数量积的坐标表示、模、夹角',
                            level: 3,
                            estimatedHours: 10,
                            difficulty: 'advanced',
                            tags: ['数量积', '坐标']
                        }
                    ]
                }
            ]
        }
    ]
};

// 辅助函数：扁平化知识点树（用于搜索和选择）
export function flattenKnowledgeTree(tree, result = []) {
    if (tree.level === 3) {
        // 只收集叶子节点（实际的知识点）
        result.push({
            id: tree.id,
            name: tree.name,
            estimatedHours: tree.estimatedHours,
            difficulty: tree.difficulty,
            tags: tree.tags,
            path: getNodePath(tree.id)
        });
    }

    if (tree.children) {
        tree.children.forEach(child => flattenKnowledgeTree(child, result));
    }

    return result;
}

// 获取节点路径（用于显示面包屑）
export function getNodePath(nodeId) {
    const paths = [];

    function findPath(node, targetId, currentPath) {
        currentPath.push(node.name);

        if (node.id === targetId) {
            paths.push(...currentPath);
            return true;
        }

        if (node.children) {
            for (const child of node.children) {
                if (findPath(child, targetId, [...currentPath])) {
                    return true;
                }
            }
        }

        return false;
    }

    findPath(KNOWLEDGE_TREE, nodeId, []);
    return paths.join(' > ');
}

// 根据ID查找节点
export function findNodeById(tree, targetId) {
    if (tree.id === targetId) {
        return tree;
    }

    if (tree.children) {
        for (const child of tree.children) {
            const found = findNodeById(child, targetId);
            if (found) return found;
        }
    }

    return null;
}

export default {
    KNOWLEDGE_TREE,
    flattenKnowledgeTree,
    getNodePath,
    findNodeById
};
