import type { ComponentType } from "react";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router";
import { AccountShell, AdminShell } from "./components/layout/Shells";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AuthProvider } from "./lib/auth";
import { SiteProvider } from "./lib/site";
import { HomePage } from "./pages/public/Home";
import { NotFoundPage } from "./pages/public/NotFound";

/** Route-level code splitting. */
const page = <M extends Record<string, unknown>>(load: () => Promise<M>, name: keyof M) => async () => ({ Component: (await load())[name] as ComponentType });
const catalog = () => import("./pages/public/Catalog");
const course = () => import("./pages/public/Course");
const explore = () => import("./pages/public/Explore");
const statics = () => import("./pages/public/Static");
const authP = () => import("./pages/auth/Auth");
const account = () => import("./pages/account/Account");
const adminP = () => import("./pages/admin/Admin");
const curriculum = () => import("./pages/admin/Curriculum");
const community = () => import("./pages/admin/Community");

export const routes: RouteObject[] = [
  {
    element: <SiteLayout />,
    HydrateFallback: () => null,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", lazy: page(statics, "AboutPage") },
      { path: "privacy", lazy: page(statics, "PrivacyPage") },
      { path: "terms", lazy: page(statics, "TermsPage") },
      { path: "accessibility", lazy: page(statics, "AccessibilityPage") },
      { path: "subjects", lazy: page(catalog, "SubjectsPage") },
      { path: "subjects/:subject", lazy: page(catalog, "SubjectPage") },
      { path: "courses", lazy: page(catalog, "CatalogPage") },
      { path: "courses/:course", lazy: page(course, "CoursePage") },
      { path: "courses/:course/units/:unit", lazy: page(course, "UnitPage") },
      { path: "courses/:course/units/:unit/lessons/:lesson", lazy: page(() => import("./pages/public/Lesson"), "LessonPage") },
      { path: "labs", lazy: page(explore, "LabsPage") },
      { path: "formulas", lazy: page(explore, "FormulasPage") },
      { path: "search", lazy: page(explore, "SearchPage") },
      { path: "login", lazy: page(authP, "LoginPage") },
      { path: "register", lazy: page(authP, "RegisterPage") },
      { path: "verify-email", lazy: page(authP, "VerifyEmailPage") },
      { path: "forgot-password", lazy: page(authP, "ForgotPasswordPage") },
      { path: "reset-password", lazy: page(authP, "ResetPasswordPage") },
      { path: "password-help", lazy: page(authP, "PasswordHelpPage") },
      {
        element: <AccountShell />,
        children: [
          { path: "dashboard", lazy: page(account, "DashboardPage") },
          { path: "my-courses", lazy: page(account, "MyCoursesPage") },
          { path: "bookmarks", lazy: page(account, "BookmarksPage") },
          { path: "practice-history", lazy: page(account, "PracticeHistoryPage") },
          { path: "notifications", lazy: page(account, "NotificationsPage") },
          { path: "settings", lazy: page(account, "SettingsPage") },
          { path: "support", lazy: page(account, "SupportListPage") },
          { path: "support/new", lazy: page(account, "SupportNewPage") },
          { path: "support/:id", lazy: page(account, "SupportDetailPage") },
        ],
      },
      {
        path: "admin",
        element: <AdminShell />,
        children: [
          { index: true, lazy: page(adminP, "AdminOverviewPage") },
          { path: "users", lazy: page(adminP, "AdminUsersPage") },
          { path: "analytics", lazy: page(adminP, "AdminAnalyticsPage") },
          { path: "settings", lazy: page(adminP, "AdminSettingsPage") },
          { path: "audit", lazy: page(adminP, "AdminAuditPage") },
          { path: "curriculum", lazy: page(curriculum, "AdminCurriculumPage") },
          { path: "curriculum/:id", lazy: page(curriculum, "AdminCourseEditorPage") },
          { path: "lessons/:id", lazy: page(curriculum, "AdminLessonStudioPage") },
          { path: "formulas", lazy: page(curriculum, "AdminFormulasPage") },
          { path: "activities", lazy: page(curriculum, "AdminActivitiesPage") },
          { path: "feedback", lazy: page(community, "AdminFeedbackPage") },
          { path: "feedback/:id", lazy: page(community, "AdminTicketPage") },
          { path: "moderation", lazy: page(community, "AdminModerationPage") },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export function App() {
  return (
      <SiteProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SiteProvider>
  );
}
