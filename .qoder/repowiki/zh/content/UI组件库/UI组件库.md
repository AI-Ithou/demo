# UI组件库

<cite>
**本文档中引用的文件**  
- [AssessmentCard.jsx](file://src/components/chat-widgets/AssessmentCard.jsx)
- [LearningQACard.jsx](file://src/components/chat-widgets/LearningQACard.jsx)
- [PracticeCard.jsx](file://src/components/chat-widgets/PracticeCard.jsx)
- [QuizCard.jsx](file://src/components/chat-widgets/QuizCard.jsx)
- [VideoCard.jsx](file://src/components/chat-widgets/VideoCard.jsx)
- [LogicGameCard.jsx](file://src/components/chat-widgets/LogicGameCard.jsx)
- [UiverseCard.jsx](file://src/components/uiverse/UiverseCard.jsx)
- [UiverseButton.jsx](file://src/components/uiverse/UiverseButton.jsx)
- [UiverseInput.jsx](file://src/components/uiverse/UiverseInput.jsx)
- [GlassCard.jsx](file://src/components/uiverse/GlassCard.jsx)
- [StatCard.jsx](file://src/components/uiverse/StatCard.jsx)
- [ActionButton.jsx](file://src/components/uiverse/ActionButton.jsx)
- [ChatInterface.jsx](file://src/components/ChatInterface.jsx)
- [DigitalTeacherAvatar.jsx](file://src/components/DigitalTeacherAvatar.jsx)
- [uiverse-card.css](file://src/components/uiverse/uiverse-card.css)
- [uiverse-button.css](file://src/components/uiverse/uiverse-button.css)
- [uiverse-input.css](file://src/components/uiverse/uiverse-input.css)
</cite>

## 目录
1. [简介](#简介)
2. [聊天小部件组件](#聊天小部件组件)
   - [评测卡片 (AssessmentCard)](#评测卡片-assessmentcard)
   - [学习答疑卡片 (LearningQACard)](#学习答疑卡片-learningqacard)
   - [随堂练习卡片 (PracticeCard)](#随堂练习卡片-practicecard)
   - [测验卡片 (QuizCard)](#测验卡片-quizcard)
   - [视频卡片 (VideoCard)](#视频卡片-videocard)
   - [逻辑游戏卡片 (LogicGameCard)](#逻辑游戏卡片-logicgamecard)
3. [Uiverse组件库](#uiverse组件库)
   - [UiverseCard](#uiversecard)
   - [UiverseButton](#uiversebutton)
   - [UiverseInput](#uiverseinput)
   - [GlassCard](#glasscard)
   - [StatCard](#statcard)
   - [ActionButton](#actionbutton)
4. [核心界面组件](#核心界面组件)
   - [对话界面 (ChatInterface)](#对话界面-chatinterface)
   - [虚拟教师形象 (DigitalTeacherAvatar)](#虚拟教师形象-digitalteacheravatar)
5. [总结](#总结)

## 简介
本文档详细记录了项目中的关键UI组件，包括chat-widgets中的各类卡片、uiverse组件库中的基础UI元素、ChatInterface的对话界面以及DigitalTeacherAvatar的虚拟教师形象。文档描述了每个组件的视觉设计、交互行为、可配置属性（props）和事件回调，提供了代码使用示例，并强调了组件的可定制性和响应式设计原则，以确保前端开发的一致性和效率。

## 聊天小部件组件

### 评测卡片 (AssessmentCard)

**评测卡片组件**是一个综合性的评测和能力分析组件，用于展示学习者在特定知识点上的掌握情况。该组件采用三步式交互流程：介绍、测试和结果展示。

#### 视觉设计
- **整体风格**：深色主题，采用玻璃态设计，背景为从`slate-800`到`slate-900`的渐变，带有`backdrop-blur-2xl`模糊效果
- **顶部装饰**：1px高的渐变条，从`emerald-500`到`teal-500`，作为视觉引导
- **内容区域**：圆角`rounded-2xl`，边框`border-white/10`，阴影`shadow-2xl`
- **介绍页面**：包含图标、标题、描述和三个信息卡片（题目数量、时长、及格分数）
- **测试页面**：显示当前题目、选项和进度条，进度条为`emerald-500`到`teal-500`的渐变
- **结果页面**：根据是否通过评测，顶部装饰条变为绿色（通过）或橙色（未通过），显示最终得分和建议

#### 交互行为
- **三步流程**：组件通过`currentStep`状态管理三个阶段：`intro`（介绍）、`testing`（测试）和`result`（结果）
- **计时功能**：开始评测后启动倒计时，时间到自动提交
- **自动跳转**：回答问题后自动进入下一题
- **动画效果**：使用`framer-motion`实现页面切换和元素出现的动画

#### 可配置属性 (Props)
- `assessment` (object): 评测数据对象，包含标题、描述、题目列表、时间限制和及格分数
- `onComplete` (function): 评测完成后的回调函数
- `onSkip` (function): 跳过评测的回调函数

#### 事件回调
- `onComplete(result)`: 评测完成后调用，返回包含总分、最大分、百分比、是否通过和维度得分的对象
- `onSkip()`: 用户点击"稍后再测"时调用

#### 使用示例
```jsx
<AssessmentCard 
  assessment={assessmentData} 
  onComplete={handleAssessmentComplete}
  onSkip={handleAssessmentSkip}
/>
```

**组件源码**
- [AssessmentCard.jsx](file://src/components/chat-widgets/AssessmentCard.jsx)

### 学习答疑卡片 (LearningQACard)

**学习答疑卡片组件**用于展示AI导师对知识点的详细解答，支持多种解释方式，帮助学习者从不同角度理解概念。

#### 视觉设计
- **整体风格**：深色主题，背景为从`slate-800`到`slate-900`的渐变，带有发光背景效果
- **顶部装饰**：1px高的渐变条，从`blue-500`经`purple-500`到`pink-500`
- **问题标题**：左侧有`Sparkles`图标，右侧显示问题和难度标签
- **解释方式切换**：水平滚动的按钮组，当前选中的按钮有蓝色到紫色的渐变背景
- **答案内容**：卡片式布局，左侧有图标，右侧有标题和详细内容
- **操作按钮**：包含"换个方式讲解"和"明白了"两个按钮

#### 交互行为
- **方式切换**：点击不同的解释方式按钮，可以切换不同的解答视角
- **动画切换**：使用`AnimatePresence`实现答案内容的平滑切换动画
- **循环切换**：点击"换个方式讲解"按钮，自动切换到下一个解释方式

#### 可配置属性 (Props)
- `qaData` (object): 问答数据对象，包含问题、难度、相关概念和多个答案
- `onChangeExplanation` (function): 切换解释方式时的回调函数

#### 事件回调
- `onChangeExplanation(type)`: 切换解释方式时调用，返回当前解释方式的类型

#### 使用示例
```jsx
<LearningQACard 
  qaData={qaData} 
  onChangeExplanation={handleExplanationChange}
/>
```

**组件源码**
- [LearningQACard.jsx](file://src/components/chat-widgets/LearningQACard.jsx)

### 随堂练习卡片 (PracticeCard)

**随堂练习卡片组件**提供交互式练习题展示，支持多种题型，帮助学习者巩固所学知识。

#### 视觉设计
- **整体风格**：深色主题，背景为从`slate-800`到`slate-900`的渐变
- **顶部装饰**：1px高的渐变条，从`amber-500`经`orange-500`到`red-500`
- **头部信息**：左侧有`Trophy`图标，显示练习标题和当前进度
- **进度条**：从`amber-500`到`orange-600`的渐变，显示完成进度
- **题目内容**：卡片式布局，包含问题、难度标签、分值和时间限制
- **选项**：根据题型显示选择题或判断题选项
- **解析**：提交答案后显示正确/错误图标和解析内容
- **提交按钮**：根据是否为最后一题显示不同文本

#### 交互行为
- **答题流程**：选择答案 -> 提交 -> 显示结果 -> 2秒后自动进入下一题
- **结果反馈**：提交后立即显示正确/错误状态，正确选项高亮为绿色，错误选项高亮为红色
- **自动跳转**：2秒后自动进入下一题，最后一题完成后调用`onComplete`回调
- **动画效果**：使用`framer-motion`实现题目切换和结果展示的动画

#### 可配置属性 (Props)
- `practiceSet` (object): 练习集数据对象，包含标题、预估时间和练习题列表
- `onComplete` (function): 完成所有练习后的回调函数
- `onSkip` (function): 跳过练习的回调函数

#### 事件回调
- `onComplete(result)`: 完成所有练习后调用，返回包含得分、总分和答案的对象
- `onSkip()`: 用户点击"跳过"时调用

#### 使用示例
```jsx
<PracticeCard 
  practiceSet={practiceSet} 
  onComplete={handlePracticeComplete}
  onSkip={handlePracticeSkip}
/>
```

**组件源码**
- [PracticeCard.jsx](file://src/components/chat-widgets/PracticeCard.jsx)

### 测验卡片 (QuizCard)

**测验卡片组件**是一个简洁的测验组件，用于展示单个问题和多个选项，支持即时反馈。

#### 视觉设计
- **整体风格**：浅色主题，背景为从`white`到`slate-50`的渐变
- **布局**：包含问题标题、选项列表和提交按钮
- **选项样式**：默认为白色背景，选中时变为`indigo-50`背景，提交后正确选项为`emerald-50`背景，错误选项为`rose-50`背景
- **提交按钮**：使用`UiverseButton`组件，渐变样式

#### 交互行为
- **选择答案**：点击选项进行选择，选中选项有视觉反馈
- **提交答案**：点击提交按钮后锁定选择，显示正确/错误反馈
- **跳过功能**：右上角有"跳过"按钮，允许用户跳过当前问题

#### 可配置属性 (Props)
- `question` (string): 问题文本
- `options` (array): 选项数组
- `correctAnswer` (number): 正确答案的索引
- `onAnswer` (function): 提交答案后的回调函数
- `onSkip` (function): 跳过问题的回调函数

#### 事件回调
- `onAnswer(isCorrect)`: 提交答案后调用，返回布尔值表示是否正确
- `onSkip()`: 用户点击"跳过"时调用

#### 使用示例
```jsx
<QuizCard 
  question="什么是React?" 
  options={["JavaScript库", "CSS框架", "HTML编辑器"]}
  correctAnswer={0}
  onAnswer={handleAnswer}
  onSkip={handleSkip}
/>
```

**组件源码**
- [QuizCard.jsx](file://src/components/chat-widgets/QuizCard.jsx)

### 视频卡片 (VideoCard)

**视频卡片组件**用于展示教学视频，包含播放控制和进度条。

#### 视觉设计
- **整体风格**：深色主题，背景为`slate-900`
- **视频区域**：`aspect-video`比例，背景为`slate-800`
- **播放按钮**：居中的圆形按钮，播放时显示`Play`图标，暂停时显示`Pause`图标
- **控制区域**：底部包含标题、跳过按钮和进度条
- **进度条**：从`slate-700`到`indigo-500`的渐变

#### 交互行为
- **播放/暂停**：点击视频区域切换播放状态
- **进度模拟**：播放时进度条自动前进，模拟视频播放
- **完成回调**：进度条达到100%时调用`onComplete`回调
- **跳过功能**：右上角有"跳过"按钮

#### 可配置属性 (Props)
- `title` (string): 视频标题
- `duration` (string): 视频时长
- `onComplete` (function): 视频播放完成后的回调函数
- `onSkip` (function): 跳过视频的回调函数

#### 事件回调
- `onComplete()`: 视频播放完成时调用
- `onSkip()`: 用户点击"跳过"时调用

#### 使用示例
```jsx
<VideoCard 
  title="React基础教程" 
  duration="5:30"
  onComplete={handleVideoComplete}
  onSkip={handleVideoSkip}
/>
```

**组件源码**
- [VideoCard.jsx](file://src/components/chat-widgets/VideoCard.jsx)

### 逻辑游戏卡片 (LogicGameCard)

**逻辑游戏卡片组件**是一个记忆力挑战游戏，用于锻炼学习者的记忆能力。

#### 视觉设计
- **整体风格**：浅色主题，背景为`white`
- **游戏区域**：2x2网格布局，四个不同颜色的方块（红、蓝、绿、黄）
- **控制区域**：顶部包含标题、跳过按钮和重置按钮
- **状态提示**：底部显示当前游戏状态（记住顺序、轮到你了、挑战成功、错了）

#### 交互行为
- **游戏流程**：生成随机序列 -> 依次高亮显示 -> 用户按相同顺序点击 -> 判断是否正确
- **高亮效果**：显示序列时，每个方块会短暂高亮，有放大和发光效果
- **用户交互**：用户点击方块进行输入，点击后有视觉反馈
- **结果判断**：用户输入与正确序列比较，全部正确则成功，否则失败
- **重置功能**：点击重置按钮或失败后可以重新开始游戏

#### 可配置属性 (Props)
- `onComplete` (function): 游戏完成后的回调函数
- `onSkip` (function): 跳过游戏的回调函数

#### 事件回调
- `onComplete(success)`: 游戏完成后调用，返回布尔值表示是否成功
- `onSkip()`: 用户点击"跳过"时调用

#### 使用示例
```jsx
<LogicGameCard 
  onComplete={handleGameComplete}
  onSkip={handleGameSkip}
/>
```

**组件源码**
- [LogicGameCard.jsx](file://src/components/chat-widgets/LogicGameCard.jsx)

## Uiverse组件库

### UiverseCard

**UiverseCard**是uiverse组件库中的基础卡片组件，提供多种视觉变体和交互效果。

#### 视觉设计
- **基础样式**：圆角`rounded-xl`，过渡效果`transition-all`
- **变体**：支持`basic`、`glass`、`gradient`、`neon`、`3d`、`interactive`、`shine`和`border-gradient`等多种样式
- **悬停效果**：可配置`hoverable`属性，启用悬停时的动画效果
- **内容区域**：`.card-content`类用于包裹卡片内容

#### 可配置属性 (Props)
- `children` (node): 卡片内容
- `variant` (string): 卡片变体，可选值：`basic`、`glass`、`gradient`、`neon`、`3d`、`interactive`、`shine`、`border-gradient`
- `hoverable` (boolean): 是否启用悬停效果
- `onClick` (function): 点击事件回调
- `className` (string): 自定义CSS类名

#### 使用示例
```jsx
<UiverseCard variant="glass" hoverable onClick={handleClick}>
  <div>卡片内容</div>
</UiverseCard>
```

**组件源码**
- [UiverseCard.jsx](file://src/components/uiverse/UiverseCard.jsx)
- [uiverse-card.css](file://src/components/uiverse/uiverse-card.css)

### UiverseButton

**UiverseButton**是uiverse组件库中的基础按钮组件，提供多种视觉样式和交互效果。

#### 视觉设计
- **基础样式**：无边框，溢出隐藏，过渡效果
- **变体**：支持`primary`、`secondary`、`animated`、`gradient`、`neon`、`glass`、`3d`等多种样式
- **尺寸**：支持`small`、`medium`、`large`三种尺寸
- **禁用状态**：透明度降低，光标变为`not-allowed`

#### 可配置属性 (Props)
- `children` (node): 按钮文本或内容
- `variant` (string): 按钮变体，可选值：`primary`、`secondary`、`animated`、`gradient`、`neon`、`glass`、`3d`
- `size` (string): 按钮尺寸，可选值：`small`、`medium`、`large`
- `onClick` (function): 点击事件回调
- `disabled` (boolean): 是否禁用
- `className` (string): 自定义CSS类名

#### 使用示例
```jsx
<UiverseButton variant="gradient" size="large" onClick={handleClick}>
  点击我
</UiverseButton>
```

**组件源码**
- [UiverseButton.jsx](file://src/components/uiverse/UiverseButton.jsx)
- [uiverse-button.css](file://src/components/uiverse/uiverse-button.css)

### UiverseInput

**UiverseInput**是uiverse组件库中的基础输入组件，提供多种视觉样式和交互效果。

#### 视觉设计
- **基础样式**：相对定位，包含标签、输入框和错误信息
- **变体**：支持`animated`、`glass`、`neon`、`gradient`、`minimal`、`search`、`3d`等多种样式
- **标签**：可配置`label`属性，支持浮动标签效果
- **图标**：可配置`icon`属性，在输入框左侧显示图标
- **错误状态**：可配置`error`属性，显示错误信息和红色边框

#### 可配置属性 (Props)
- `type` (string): 输入框类型，默认为`text`
- `placeholder` (string): 占位符文本
- `value` (string): 输入值
- `onChange` (function): 值变化时的回调函数
- `variant` (string): 输入框变体，可选值：`animated`、`glass`、`neon`、`gradient`、`minimal`、`search`、`3d`
- `label` (string): 标签文本
- `icon` (node): 图标元素
- `error` (string): 错误信息
- `className` (string): 自定义CSS类名

#### 使用示例
```jsx
<UiverseInput 
  label="用户名" 
  placeholder="请输入用户名"
  variant="animated"
  value={username}
  onChange={handleUsernameChange}
/>
```

**组件源码**
- [UiverseInput.jsx](file://src/components/uiverse/UiverseInput.jsx)
- [uiverse-input.css](file://src/components/uiverse/uiverse-input.css)

### GlassCard

**GlassCard**是uiverse组件库中的玻璃态卡片组件，专为深色主题设计。

#### 视觉设计
- **整体风格**：玻璃态效果，背景为`rgba(255, 255, 255, 0.1)`，`backdrop-filter: blur(20px)`
- **边框**：`rgba(255, 255, 255, 0.2)`的细边框
- **阴影**：深色阴影，增强立体感
- **悬停效果**：悬停时背景更透明，边框更明显，阴影更大，轻微上移

#### 可配置属性 (Props)
- `children` (node): 卡片内容
- `className` (string): 自定义CSS类名
- `hover` (boolean): 是否启用悬停效果
- `gradient` (boolean): 是否显示渐变背景
- `onClick` (function): 点击事件回调

#### 使用示例
```jsx
<GlassCard hover gradient onClick={handleClick}>
  <div>玻璃态卡片内容</div>
</GlassCard>
```

**组件源码**
- [GlassCard.jsx](file://src/components/uiverse/GlassCard.jsx)

### StatCard

**StatCard**是uiverse组件库中的统计数据卡片组件，带数字动画效果。

#### 视觉设计
- **整体风格**：浅色主题，白色背景，`shadow-lg`
- **背景装饰**：右上角有微弱的渐变圆形背景
- **图标区域**：左侧有彩色图标，背景为浅色
- **数据区域**：大号字体显示数值，使用渐变颜色
- **趋势指示器**：可选的趋势箭头和数值

#### 可配置属性 (Props)
- `icon` (component): 图标组件
- `label` (string): 数据标签
- `value` (number/string): 数据值
- `trend` (string): 趋势方向，可选值：`up`、`down`
- `trendValue` (string): 趋势数值
- `color` (string): 颜色主题，可选值：`blue`、`orange`、`green`、`purple`、`red`
- `delay` (number): 动画延迟时间

#### 使用示例
```jsx
<StatCard 
  icon={TrendingUp} 
  label="学习时长" 
  value={120} 
  trend="up" 
  trendValue="+15%"
  color="blue"
/>
```

**组件源码**
- [StatCard.jsx](file://src/components/uiverse/StatCard.jsx)

### ActionButton

**ActionButton**是uiverse组件库中的行动按钮组件，具有霓虹发光效果。

#### 视觉设计
- **整体风格**：多种变体，包括`primary`、`success`、`danger`、`secondary`
- **波纹效果**：点击时产生波纹动画
- **霓虹发光**：悬停时有霓虹光扫过效果
- **图标**：支持前置图标，加载状态显示旋转图标，完成状态显示对勾图标

#### 可配置属性 (Props)
- `children` (node): 按钮文本
- `onClick` (function): 点击事件回调
- `variant` (string): 按钮变体，可选值：`primary`、`success`、`danger`、`secondary`
- `loading` (boolean): 是否显示加载状态
- `completed` (boolean): 是否显示完成状态
- `disabled` (boolean): 是否禁用
- `icon` (component): 图标组件
- `className` (string): 自定义CSS类名

#### 使用示例
```jsx
<ActionButton 
  variant="primary" 
  onClick={handleClick}
  loading={isLoading}
  completed={isCompleted}
  icon={Check}
>
  提交
</ActionButton>
```

**组件源码**
- [ActionButton.jsx](file://src/components/uiverse/ActionButton.jsx)

## 核心界面组件

### 对话界面 (ChatInterface)

**对话界面组件**是整个应用的核心交互界面，负责展示消息流和用户输入。

#### 视觉设计
- **整体布局**：弹性布局，分为消息区域和输入区域
- **消息区域**：白色半透明背景，`backdrop-blur-sm`，`rounded-2xl`，`border-slate-200`
- **消息气泡**：用户消息在右侧，蓝色背景；教师消息在左侧，白色背景
- **虚拟教师头像**：使用`DigitalTeacherAvatar`组件
- **输入区域**：浅灰色背景，`rounded-xl`，包含输入框和发送按钮
- **滚动条**：自定义滚动条样式

#### 交互行为
- **消息流**：支持多种消息类型，包括文本、测验、视频、游戏和风格选择器
- **自动滚动**：新消息出现时自动滚动到底部
- **输入提交**：回车键提交，Shift+回车换行
- **打字指示器**：显示教师正在输入的状态

#### 可配置属性 (Props)
- `messages` (array): 消息数组
- `onSendMessage` (function): 发送消息的回调函数
- `isTyping` (boolean): 是否显示打字指示器
- `placeholder` (string): 输入框占位符
- `onInteract` (function): 交互事件回调

#### 事件回调
- `onSendMessage(text)`: 发送消息时调用
- `onInteract(messageId, action, data)`: 用户与交互组件交互时调用

#### 使用示例
```jsx
<ChatInterface 
  messages={messages} 
  onSendMessage={handleSendMessage}
  isTyping={isTyping}
  onInteract={handleInteraction}
/>
```

**组件源码**
- [ChatInterface.jsx](file://src/components/ChatInterface.jsx)

### 虚拟教师形象 (DigitalTeacherAvatar)

**虚拟教师形象组件**是AI导师的视觉代表，具有动态效果和状态指示。

#### 视觉设计
- **整体布局**：相对定位，包含外层发光环、内层圆形和状态指示器
- **外层发光环**：使用`framer-motion`实现脉动动画，`blur-xl`模糊效果
- **内层圆形**：白色到浅灰色渐变，`border-slate-200`，`shadow-xl`
- **抽象面部**：紫色圆形，根据状态有缩放动画
- **火花图标**：覆盖在中心的`Sparkles`图标
- **状态指示器**：右下角的小圆点，根据状态显示不同颜色

#### 可配置属性 (Props)
- `state` (string): 状态，可选值：`idle`、`speaking`
- `size` (string): 大小，可选值：`sm`、`md`、`lg`

#### 使用示例
```jsx
<DigitalTeacherAvatar state="speaking" size="md" />
```

**组件源码**
- [DigitalTeacherAvatar.jsx](file://src/components/DigitalTeacherAvatar.jsx)

## 总结
本UI组件库提供了丰富的可复用组件，涵盖了从基础UI元素到复杂交互组件的各个方面。所有组件都遵循一致的设计原则：

1. **可定制性**：通过props提供丰富的配置选项，满足不同场景的需求
2. **响应式设计**：组件在不同屏幕尺寸下都能良好显示
3. **交互反馈**：提供清晰的视觉反馈和动画效果，增强用户体验
4. **一致性**：遵循统一的设计语言和交互模式
5. **可访问性**：考虑键盘导航和屏幕阅读器支持

通过合理使用这些组件，开发者可以快速构建出功能丰富、视觉统一的教育应用界面，提高开发效率和用户体验。