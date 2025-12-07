// 知识点与目录节点的绑定关系
// 这个文件定义了目录节点与知识点的映射关系

import { KNOWLEDGE_TREE } from './knowledge_tree';
import { KNOWLEDGE_POINTS_LIBRARY } from './knowledge_points_library';

/**
 * 目录节点与知识点的绑定关系
 * key: 目录节点ID (对应KNOWLEDGE_TREE中的节点ID)
 * value: 知识点ID数组 (对应KNOWLEDGE_POINTS_LIBRARY中的知识点ID)
 */
export const CATALOG_KNOWLEDGE_BINDINGS = {
    // 第一章 集合与函数
    '1.1.1': ['kp-001', 'kp-002'],  // 集合的含义与表示 -> 集合基础、集合表示
    '1.1.2': ['kp-003'],             // 集合间的基本关系 -> 集合关系
    '1.1.3': ['kp-004'],             // 集合的基本运算 -> 集合运算
    '1.2.1': ['kp-005', 'kp-006'],  // 函数的概念 -> 函数定义、定义域
    '1.2.2': ['kp-007'],             // 函数的表示法 -> 函数表示
    '1.2.3': ['kp-008', 'kp-009'],  // 函数的基本性质 -> 单调性、奇偶性

    // 第二章 基本初等函数
    '2.1.1': ['kp-010'],             // 指数与指数幂的运算 -> 指数运算
    '2.1.2': ['kp-011'],             // 指数函数及其性质 -> 指数函数
    '2.2.1': ['kp-012'],             // 对数与对数运算 -> 对数运算
    '2.2.2': ['kp-013'],             // 对数函数及其性质 -> 对数函数
    '2.3.1': ['kp-014'],             // 幂函数的概念 -> 幂函数

    // 第三章 三角函数
    '3.1.1': ['kp-015'],             // 任意角 -> 任意角定义
    '3.1.2': ['kp-016'],             // 弧度制 -> 弧度制
    '3.2.1': ['kp-017'],             // 任意角的三角函数 -> 三角函数定义
    '3.2.2': ['kp-018'],             // 同角三角函数的关系 -> 三角恒等式
    '3.3.1': ['kp-019'],             // 正弦函数、余弦函数的图像 -> 三角函数图像
    '3.3.2': ['kp-020'],             // 正弦函数、余弦函数的性质 -> 三角函数性质

    // 第四章 平面向量
    '4.1.1': ['kp-021'],             // 向量的物理背景与概念 -> 向量概念
    '4.1.2': ['kp-022'],             // 向量的几何表示 -> 向量表示
    '4.2.1': ['kp-023'],             // 向量加法运算及其几何意义 -> 向量加法
    '4.2.2': ['kp-024'],             // 向量减法运算及其几何意义 -> 向量减法
    '4.2.3': ['kp-025'],             // 向量数乘运算及其几何意义 -> 向量数乘
    '4.3.1': ['kp-026'],             // 平面向量数量积的物理背景及其含义 -> 数量积
    '4.3.2': ['kp-027'],             // 平面向量数量积的坐标表示、模、夹角 -> 数量积应用
};

/**
 * 获取目录节点下的所有知识点ID（包括子节点）
 * @param {string} catalogId - 目录节点ID
 * @param {object} tree - 知识树对象（默认为KNOWLEDGE_TREE）
 * @returns {string[]} 知识点ID数组
 */
export function getKnowledgePointsByCatalog(catalogId, tree = KNOWLEDGE_TREE) {
    const knowledgePoints = new Set();
    
    // 递归查找节点及其所有子节点
    function collectFromNode(node) {
        if (node.id === catalogId || isDescendantOf(catalogId, node.id)) {
            // 如果是叶子节点（level 3），添加绑定的知识点
            if (node.level === 3 && CATALOG_KNOWLEDGE_BINDINGS[node.id]) {
                CATALOG_KNOWLEDGE_BINDINGS[node.id].forEach(kpId => knowledgePoints.add(kpId));
            }
            
            // 递归处理子节点
            if (node.children) {
                node.children.forEach(child => collectFromNode(child));
            }
        } else if (node.children) {
            // 继续在子节点中查找
            node.children.forEach(child => collectFromNode(child));
        }
    }
    
    collectFromNode(tree);
    return Array.from(knowledgePoints);
}

/**
 * 判断一个节点是否是另一个节点的祖先
 * @param {string} ancestorId - 祖先节点ID
 * @param {string} nodeId - 待检查节点ID
 * @returns {boolean}
 */
function isDescendantOf(ancestorId, nodeId) {
    // 简单的前缀匹配判断（基于ID命名规则）
    return nodeId.startsWith(ancestorId + '.');
}

/**
 * 获取知识点所属的所有目录节点ID
 * @param {string} knowledgePointId - 知识点ID
 * @returns {string[]} 目录节点ID数组
 */
export function getCatalogsForKnowledgePoint(knowledgePointId) {
    const catalogs = [];
    
    for (const [catalogId, kpIds] of Object.entries(CATALOG_KNOWLEDGE_BINDINGS)) {
        if (kpIds.includes(knowledgePointId)) {
            catalogs.push(catalogId);
        }
    }
    
    return catalogs;
}

/**
 * 为目录节点添加知识点绑定
 * @param {string} catalogId - 目录节点ID
 * @param {string} knowledgePointId - 知识点ID
 */
export function bindKnowledgePointToCatalog(catalogId, knowledgePointId) {
    if (!CATALOG_KNOWLEDGE_BINDINGS[catalogId]) {
        CATALOG_KNOWLEDGE_BINDINGS[catalogId] = [];
    }
    if (!CATALOG_KNOWLEDGE_BINDINGS[catalogId].includes(knowledgePointId)) {
        CATALOG_KNOWLEDGE_BINDINGS[catalogId].push(knowledgePointId);
        saveBindings();
    }
}

/**
 * 移除目录节点的知识点绑定
 * @param {string} catalogId - 目录节点ID
 * @param {string} knowledgePointId - 知识点ID
 */
export function unbindKnowledgePointFromCatalog(catalogId, knowledgePointId) {
    if (CATALOG_KNOWLEDGE_BINDINGS[catalogId]) {
        CATALOG_KNOWLEDGE_BINDINGS[catalogId] = CATALOG_KNOWLEDGE_BINDINGS[catalogId]
            .filter(id => id !== knowledgePointId);
        saveBindings();
    }
}

/**
 * 保存绑定关系到localStorage
 */
function saveBindings() {
    try {
        localStorage.setItem('catalogKnowledgeBindings', JSON.stringify(CATALOG_KNOWLEDGE_BINDINGS));
    } catch (error) {
        console.error('保存目录知识点绑定失败:', error);
    }
}

/**
 * 从localStorage加载绑定关系
 */
export function loadBindings() {
    try {
        const saved = localStorage.getItem('catalogKnowledgeBindings');
        if (saved) {
            const loaded = JSON.parse(saved);
            Object.assign(CATALOG_KNOWLEDGE_BINDINGS, loaded);
        }
    } catch (error) {
        console.error('加载目录知识点绑定失败:', error);
    }
}

/**
 * 获取目录树的完整展开列表（用于UI展示）
 * @param {object} tree - 知识树对象
 * @param {number} maxLevel - 最大展开层级（默认3）
 * @returns {array} 展开的节点列表
 */
export function flattenCatalogTree(tree = KNOWLEDGE_TREE, maxLevel = 3) {
    const result = [];
    
    function traverse(node, depth = 0) {
        if (node.level > 0 && node.level <= maxLevel) {
            result.push({
                ...node,
                depth,
                hasChildren: node.children && node.children.length > 0,
                knowledgePointCount: CATALOG_KNOWLEDGE_BINDINGS[node.id]?.length || 0
            });
        }
        
        if (node.children && node.level < maxLevel) {
            node.children.forEach(child => traverse(child, depth + 1));
        }
    }
    
    traverse(tree);
    return result;
}

export default {
    CATALOG_KNOWLEDGE_BINDINGS,
    getKnowledgePointsByCatalog,
    getCatalogsForKnowledgePoint,
    bindKnowledgePointToCatalog,
    unbindKnowledgePointFromCatalog,
    loadBindings,
    flattenCatalogTree
};
