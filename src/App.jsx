import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import GoalSelectionPage from './pages/GoalSelectionPage';

import AbilityAssessmentPage from './pages/AbilityAssessmentPage';
import AbilityRadarPage from './pages/AbilityRadarPage';
import KnowledgeNebulaPage from './pages/KnowledgeNebulaPage';
import KnowledgeListPage from './pages/KnowledgeListPage';
import AttitudeAssessmentPage from './pages/AttitudeAssessmentPage';
import SummaryReportPage from './pages/SummaryReportPage';
import UnifiedAssessmentPage from './pages/UnifiedAssessmentPage';
import AssessmentReportPage from './pages/AssessmentReportPage';
import StudentHome from './pages/StudentHome';
import GoalSetting from './pages/GoalSetting';
import Dashboard from './pages/Dashboard';
import LearningPathPage from './pages/LearningPathPage';
import KnowledgeProfilePage from './pages/KnowledgeProfilePage';
import MyLearningPathPage from './pages/MyLearningPathPage';
import MyLearningTrajectoryPage from './pages/MyLearningTrajectoryPage';
import LearningDialoguePage from './pages/LearningDialoguePage';
import ErrorLogPage from './pages/ErrorLogPage';

// Learning Report System
import LearningReportLayout from './components/LearningReportLayout';
import LearningReportOverview from './pages/LearningReportOverview';
import LearningReportDetails from './pages/LearningReportDetails';
import LearningReportRecommendations from './pages/LearningReportRecommendations';

// Teacher System
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCoursePage from './pages/TeacherCoursePage';
import TeacherDifficultySettings from './pages/TeacherDifficultySettings';
import TeacherPathManager from './pages/TeacherPathManager';
import TeacherPathEditor from './pages/TeacherPathEditor';
import ClassPathOverview from './pages/ClassPathOverview';
import AIGroupingRecommendation from './pages/AIGroupingRecommendation';
import StudentPathDetail from './pages/StudentPathDetail';

// Placeholder components for future pages to avoid build errors
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-full text-slate-500 text-xl">
    {title} - 开发中...
  </div>
);

function App() {
  return (
    <Routes>
      {/* Original Routes */}
      <Route path="/" element={<StudentHome />} />
      <Route path="/goal-setting" element={<GoalSetting />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* New Assessment Flow Routes (Wrapped in Layout) */}
      <Route element={<Layout />}>
        <Route path="/goal-selection" element={<UnifiedAssessmentPage />} />
        <Route path="/ability-assessment" element={<AbilityAssessmentPage />} />
        <Route path="/ability-radar" element={<AbilityRadarPage />} />
        <Route path="/knowledge-nebula" element={<KnowledgeNebulaPage />} />
        <Route path="/knowledge-list" element={<KnowledgeListPage />} />
        <Route path="/attitude-assessment" element={<AttitudeAssessmentPage />} />
        <Route path="/summary-report" element={<SummaryReportPage />} />
        <Route path="/report" element={<AssessmentReportPage />} />
        <Route path="/learning-path" element={<LearningPathPage />} />
        <Route path="/learning-dialogue/:nodeId" element={<LearningDialoguePage />} />
        <Route path="/knowledge-profile" element={<KnowledgeProfilePage />} />
      </Route>

      {/* Full Screen Immersive Routes */}
      <Route path="/my-learning-path" element={<MyLearningPathPage />} />
      <Route path="/my-learning-trajectory" element={<MyLearningTrajectoryPage />} />
      <Route path="/error-log" element={<ErrorLogPage />} />

      {/* Learning Report System Routes */}
      <Route path="/learning-report" element={<LearningReportLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<LearningReportOverview />} />
        <Route path="details" element={<LearningReportDetails />} />
        <Route path="recommendations" element={<LearningReportRecommendations />} />
      </Route>

      {/* Teacher System Routes */}
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/course" element={<TeacherCoursePage />} />
      <Route path="/teacher/course/difficulty-settings" element={<TeacherDifficultySettings />} />
      <Route path="/teacher/path" element={<TeacherPathManager />} />
      <Route path="/teacher/path/edit/:pathId" element={<TeacherPathEditor />} />
      <Route path="/teacher/class-overview" element={<ClassPathOverview />} />
      <Route path="/teacher/ai-grouping" element={<AIGroupingRecommendation />} />
      <Route path="/teacher/student/:studentId" element={<StudentPathDetail />} />
    </Routes>
  );
}

export default App;
