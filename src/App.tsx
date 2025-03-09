import { Route, Routes } from "react-router";
import { AuthPage } from "./features/auth/pages/AuthPage";
import { ExcusePage as HomePage } from "./features/excuse-generator/pages/ExcusePage";
import { NotFoundPage } from "./features/not-found/pages/NotFound";
import Layout from "./components/common/Layout";
import { Toaster } from "./components/ui/sonner";
import ProfilePage from "./features/user/pages/ProfilePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="perfil" element={<ProfilePage />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </>
  );
}
