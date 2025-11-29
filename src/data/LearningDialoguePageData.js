
import { Play, FileText, MessageSquare, BookOpen, Video, HelpCircle } from 'lucide-react';

const learningDialogueData = {
    // Scenario: Wave-particle duality (Quantum Physics)
    "node-3": { // Assuming node-3 is the ID for the relevant node
        title: "第三章：波粒二象性",
        subtitle: "量子物理 101",
        initialMessages: [
            {
                id: 1,
                sender: 'teacher',
                type: 'text',
                content: "你好！今天我们将学习一个最核心的概念：**“波粒二象性”**。在微观世界中，光既有波的特性也有粒子的特性。这听起来可能有点反直觉，但我们可以从一个经典的实验开始。准备好了吗？",
                timestamp: '10:00 AM'
            }
        ],
        // Mock responses for simulation
        responses: {
            "default": {
                type: 'text',
                content: "这是一个非常好的问题！波粒二象性确实比较抽象。简单来说，就像硬币的两面，光在不同实验条件下表现出不同的性质。"
            },
            "video": {
                type: 'video',
                title: "核心概念视频：波粒二象性解释",
                description: "本短视频解释了核心概念。请重点关注它与我们之前所学内容的联系。看完后，尝试用自己的话总结要点。",
                thumbnail: "/assets/video-thumbnail-wave.jpg", // Placeholder
                duration: "05:20",
                actionText: "立即观看"
            },
            "exercise": {
                type: 'exercise',
                title: "巩固练习",
                description: "这里有几个中等难度的练习题，来巩固一下你的理解吧！完成 后可以解锁更深入的讲解。",
                progress: "3个问题中的第1个: 选择题",
                actionText: "开始练习"
            },
            "assessment": {
                type: 'assessment',
                title: "阶段性评测：波粒二象性",
                description: "让我们通过一个小测验来检验你的掌握程度。共3题，预计用时2分钟。",
                questions: [
                    {
                        id: 1,
                        text: "在双缝干涉实验中，如果我们在狭缝处放置探测器来观察电子通过哪个缝，干涉条纹会发生什么变化？",
                        options: [
                            "A. 干涉条纹变得更清晰",
                            "B. 干涉条纹消失，变成两条亮纹",
                            "C. 干涉条纹位置发生移动",
                            "D. 没有任何变化"
                        ],
                        correctAnswer: "B"
                    }
                ],
                actionText: "提交评测"
            }
        },
        rightPanel: {
            relatedResources: [
                {
                    id: 1,
                    type: 'video',
                    title: "核心概念视频：波粒二象性解释",
                    thumbnail: "https://images.unsplash.com/photo-1614730341194-75c6074065db?q=80&w=2874&auto=format&fit=crop", // Abstract wave image
                    tag: "核心概念视频"
                },
                {
                    id: 2,
                    type: 'image',
                    title: "关键图表：双缝实验",
                    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop", // Scientific diagram style
                    tag: "关键图表"
                }
            ],
            advancedResources: [
                {
                    id: 3,
                    type: 'article',
                    title: "深度剖析：核心概念的演进与应用",
                    description: "探索该知识点从理论到实践的完整路径。",
                    icon: FileText,
                    color: "bg-blue-100 text-blue-600"
                },
                {
                    id: 4,
                    type: 'video',
                    title: "换个角度看问题：可视化讲解",
                    description: "通过动画和实例，直观理解复杂概念。",
                    icon: Play,
                    color: "bg-purple-100 text-purple-600"
                },
                {
                    id: 5,
                    type: 'exercise',
                    title: "综合应用题分析与解构",
                    description: "挑战一个更复杂的场景，看如何综合运用所学知识。",
                    icon: HelpCircle,
                    color: "bg-orange-100 text-orange-600"
                }
            ]
        },
        // Mastery Scenarios Logic
        masteryScenarios: {
            "level_1": {
                label: "完全不会",
                summary: "基础薄弱，建议回退",
                description: "根据你的反馈，看来我们需要先打好基础。建议暂时放下当前内容，回退到入门知识点。",
                recommendation: "退回到入门知识点：量子力学历史背景",
                action: "back_to_intro",
                nextStep: "Review Basics"
            },
            "level_2": {
                label: "本知识点不会",
                summary: "理解困难，重新讲解",
                description: "没关系，这个概念确实比较抽象。让我们换一种方式，通过更直观的例子来重新讲解一遍。",
                recommendation: "查看可视化讲解视频",
                action: "explain_again",
                nextStep: "Watch Video"
            },
            "level_3_low": {
                label: "本知识点会一些",
                summary: "初步理解，加强练习",
                description: "你已经掌握了基本概念，但在细节上还有提升空间。通过一些针对性的练习来巩固一下吧。",
                recommendation: "完成巩固练习题",
                action: "practice",
                nextStep: "Start Practice"
            },
            "level_3_high": {
                label: "本知识点会很多",
                summary: "掌握良好，进阶选择",
                description: "你的理解已经很不错了！现在你有两个选择：挑战更高难度的内容，或者继续下一个话题。",
                options: [
                    {
                        label: "突破自我 (加强难度)",
                        action: "challenge",
                        description: "挑战综合应用题，深入理解核心概念的演进。"
                    },
                    {
                        label: "得过且过 (下一章)",
                        action: "next_topic",
                        description: "直接进入下一个知识点的学习。"
                    }
                ]
            },
            "level_4": {
                label: "本知识点完全掌握了",
                summary: "完美掌握，继续前进",
                description: "太棒了！你已经完全吃透了这个知识点。让我们保持势头，直接进入下一个激动人心的话题！",
                recommendation: "进入下一章：不确定性原理",
                action: "next_topic",
                nextStep: "Next Chapter"
            }
        }
    }
};

export default learningDialogueData;
