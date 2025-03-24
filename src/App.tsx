import { Route, Routes } from 'react-router'

import Layout from './components/common/Layout'
import { AuthPage } from './features/auth/pages/AuthPage'
import { ExcusePage as HomePage } from './features/excuse-generator/pages/ExcusePage'
import { HowItWorksPage } from './features/how-it-works/pages/HowItWorksPage'
import ProfilePage from './features/user/pages/ProfilePage'
import { NotFoundPage } from './features/not-found/pages/NotFound'

import { Toaster } from './components/ui/sonner'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="como-funciona" element={<HowItWorksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </>
  )
}
