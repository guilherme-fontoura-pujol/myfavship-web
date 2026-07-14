import { Navigate, Route, Routes } from "react-router-dom";
import { WorkDetailsPage } from "./pages/WorkDetailsPage";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RankingsPage } from "./pages/RankingsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WorksPage } from "./pages/WorksPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SearchPage } from "./pages/SearchPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
  path="/works/:slug"
  element={<WorkDetailsPage />}
/>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}