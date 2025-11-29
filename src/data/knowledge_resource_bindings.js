// 知识点与资源的绑定关系
// 键是知识点ID，值是资源ID数组

export const KNOWLEDGE_RESOURCE_BINDINGS = {
    '1.1.1': ['res-001', 'res-002', 'res-003'],  // 集合的含义与表示
    '1.2.1': ['res-004', 'res-005'],              // 函数的概念
    '3.3.1': ['res-006'],                         // 三角函数图像
    // 其他知识点可以根据需要添加
};

// 根据知识点ID获取绑定的资源
export function getResourcesForKnowledge(knowledgeId, resourceLibrary) {
    const resourceIds = KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId] || [];
    return resourceIds.map(rid =>
        resourceLibrary.find(r => r.id === rid)
    ).filter(Boolean);
}

// 为知识点添加资源
export function bindResourceToKnowledge(knowledgeId, resourceId) {
    if (!KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId]) {
        KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId] = [];
    }
    if (!KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId].includes(resourceId)) {
        KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId].push(resourceId);
    }
    // 保存到localStorage
    saveBindings();
}

// 移除知识点的资源
export function unbindResourceFromKnowledge(knowledgeId, resourceId) {
    if (KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId]) {
        KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId] =
            KNOWLEDGE_RESOURCE_BINDINGS[knowledgeId].filter(id => id !== resourceId);
        saveBindings();
    }
}

// 保存到localStorage
function saveBindings() {
    localStorage.setItem('knowledgeResourceBindings', JSON.stringify(KNOWLEDGE_RESOURCE_BINDINGS));
}

// 从localStorage加载
export function loadBindings() {
    const saved = localStorage.getItem('knowledgeResourceBindings');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(KNOWLEDGE_RESOURCE_BINDINGS, loaded);
    }
}

export default {
    KNOWLEDGE_RESOURCE_BINDINGS,
    getResourcesForKnowledge,
    bindResourceToKnowledge,
    unbindResourceFromKnowledge,
    loadBindings
};
