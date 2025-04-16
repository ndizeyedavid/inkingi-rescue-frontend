import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import ProtectedRoute from "./security/ProtectedRouter"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgetPassword from "./pages/ForgetPassword"
import Home from "./pages/Home"
import Sos from "./pages/Sos"
import Report from "./pages/Report"
import Scan from "./pages/Scan"
import Map from "./pages/Map"
// @ts-ignore
import Profile from "./pages/Profile"
import Notifications from "./components/Notifications"
// @ts-ignore
import NewSos from "./pages/NewSos"
import PersonalSettings from "./pages/PersonalSettings"
// @ts-ignore
import EmergencyContacts from "./pages/EmergencyContacts"
// @ts-ignore
import NewEmergencyContact from "./pages/NewEmergencyContact"
// @ts-ignore
import SecurityPage from "./pages/SecurityPage"
// @ts-ignore
import ThemePage from "./pages/ThemePage"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem('theme') || "caramellatte");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" expand={true} richColors />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/sos" element={
            <ProtectedRoute>
              <Sos />
            </ProtectedRoute>
          } />
          <Route path="/sos/new" element={
            <ProtectedRoute>
              <NewSos />
            </ProtectedRoute>
          } />
          <Route path="/sos/new/:emergency" element={
            <ProtectedRoute>
              <NewSos />
            </ProtectedRoute>
          } />
          <Route path="/sos/reports" element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } />
          <Route path="/sos/scan/:id" element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          } />

          <Route path="/map" element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/personal" element={
            <ProtectedRoute>
              <PersonalSettings />
            </ProtectedRoute>
          } />
          {/* contacts */}
          <Route path="/profile/contacts" element={
            <ProtectedRoute>
              <EmergencyContacts />
            </ProtectedRoute>
          } />
          <Route path="/profile/contacts/new" element={
            <ProtectedRoute>
              <NewEmergencyContact />
            </ProtectedRoute>
          } />
          {/* password */}
          <Route path="/profile/security" element={
            <ProtectedRoute>
              <SecurityPage />
            </ProtectedRoute>
          } />
          {/* theme */}
          <Route path="/profile/theme" element={
            <ProtectedRoute>
              <ThemePage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
