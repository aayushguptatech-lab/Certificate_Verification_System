import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context'
import { Navbar, Footer } from './components/common'
import { ROUTES } from './constants'

// Page Components
import Home from './pages/Home'
import VerifyCertificate from './pages/VerifyCertificate'
import TrackStatus from './pages/TrackStatus'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLogin from './pages/auth/AdminLogin'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.VERIFY} element={<VerifyCertificate />} />
              <Route path={ROUTES.TRACK_STATUS} element={<TrackStatus />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
