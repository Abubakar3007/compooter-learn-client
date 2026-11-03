import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import Careers from "./pages/common/Careers";
import HowItWorks from "./pages/common/HowItWork";
import Paths from "./pages/common/Paths";
import Pricing from "./pages/common/Pricing";
import Showcase from "./pages/common/Showcase";

import StudentLayout from "./pages/students/StudentLayout";
import StudentDashboard from "./pages/students/Dashboard";
import StudentLearnIndex from "./pages/students/Learn";
import StudentLearnCourse from "./pages/students/LearnCourse";
import StudentLesson from "./pages/students/Lesson";
import StudentProjectsIndex from "./pages/students/Projects";
import StudentProject from "./pages/students/Project";
import StudentQuiz from "./pages/students/Quiz";
import StudentAchievements from "./pages/students/Achievements";
import StudentCareerExplorer from "./pages/students/CareerExplore";
import StudentSkillAssessment from "./pages/students/SkillAssessment";
import StudentCertificates from "./pages/students/Certificates";
import StudentProfile from "./pages/students/Profile";
import StudentCode from "./pages/students/Code";
import StudentSettings from "./pages/students/Settings";
import StudentChallenges from "./pages/students/Challenges";
import StudentQuizParticipation from "./pages/students/QuizParticipation";
import StudentGetCertificate from "./pages/students/GetCertificate";
import StudentMyProgress from "./pages/students/MyProgress"

import ParentLayout from "./pages/parents/ParentLayout";
import ParentIndex from "./pages/parents/Parent";
import ParentProgress from "./pages/parents/Progress";
import ParentActivities from "./pages/parents/Activities";
import ParentReports from "./pages/parents/Reports";
import ParentStudent from "./pages/parents/Student";
import ParentSettings from "./pages/parents/Settings";

import TeacherLayout from "./pages/teachers/TeacherLayout";
import TeacherIndex from "./pages/teachers/Teacher";
import TeacherClasses from "./pages/teachers/Classes";
import TeacherAssignments from "./pages/teachers/Assignments";
import TeacherReports from "./pages/teachers/Reports";
import TeacherStudents from "./pages/teachers/Students";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminIndex from "./pages/admin/Admin";
import AdminSection from "./pages/admin/Section";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "careers", element: <Careers /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "paths", element: <Paths /> },
      { path: "pricing", element: <Pricing /> },
      { path: "showcase", element: <Showcase /> },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: "dashboard", element: <StudentDashboard /> },

          {
            path: "learn",
            children: [
              {
                index: true,
                element: <StudentLearnIndex />,
              },
              {
                path: ":courseId",
                element: <StudentLearnCourse />,
              },
              {
                path: ":courseId/questions/:questionId",
                element: <StudentLesson />,
              },
            ],
          },

          { path: "projects", element: <StudentProjectsIndex /> },
          { path: "projects/:id", element: <StudentProject /> },
          { path: "quiz", element: <StudentQuiz /> },
          { path: "achievements", element: <StudentAchievements /> },
          { path: "career-explorer", element: <StudentCareerExplorer /> },
          { path: "skill-assessment", element: <StudentSkillAssessment /> },
          { path: "certificates", element: <StudentCertificates /> },
          { path: "profile", element: <StudentProfile /> },
          { path: "code", element: <StudentCode /> },
          { path: "settings", element: <StudentSettings /> },
          { path: "challenges", element: <StudentChallenges /> },
          { path: "quiz-participation", element: <StudentQuizParticipation /> },
          { path: "get-certificate", element: <StudentGetCertificate /> },
          { path: "my-progress", element: <StudentMyProgress /> }
        ],
      },
      {
        path: "parent",
        element: <ParentLayout />,
        children: [
          { index: true, element: <ParentIndex /> },
          { path: "progress", element: <ParentProgress /> },
          { path: "activities", element: <ParentActivities /> },
          { path: "reports", element: <ParentReports /> },
          { path: "student", element: <ParentStudent /> },
          { path: "settings", element: <ParentSettings /> },
        ],
      },
      {
        path: "teacher",
        element: <TeacherLayout />,
        children: [
          { index: true, element: <TeacherIndex /> },
          { path: "classes", element: <TeacherClasses /> },
          { path: "assignments", element: <TeacherAssignments /> },
          { path: "reports", element: <TeacherReports /> },
          { path: "students", element: <TeacherStudents /> },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminIndex /> },
          { path: ":section", element: <AdminSection /> },
        ],
      },
    ],
  },
]);
