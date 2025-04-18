import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { AnimatePresence } from "framer-motion"
import PageTransition from "./components/PageTransition"

import ProtectedRoute from "./security/ProtectedRouter"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgetPassword from "./pages/ForgetPassword"
// @ts-ignore
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
import Frame from "./pages/Frame"
import Ai from "./pages/Ai"

// Create a wrapper component for AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem('theme') || "caramellatte");
  }, []);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* iframe */}
        <Route path="/frame" element={
          <PageTransition>
            <Frame />
          </PageTransition>
        } />

        {/* Public routes */}
        <Route path="/login" element={
          <PageTransition>
            <Login />
          </PageTransition>
        } />
        <Route path="/signup" element={
          <PageTransition>
            <Signup />
          </PageTransition>
        } />
        <Route path="/forget-password" element={
          <PageTransition>
            <ForgetPassword />
          </PageTransition>
        } />

        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <PageTransition>
              <Home />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/sos" element={
          <ProtectedRoute>
            <PageTransition>
              <Sos />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/sos/new" element={
          <ProtectedRoute>
            <PageTransition>
              <NewSos />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/sos/new/:emergency" element={
          <ProtectedRoute>
            <PageTransition>
              <NewSos />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/sos/reports" element={
          <ProtectedRoute>
            <PageTransition>
              <Report />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/sos/reports/track/:id" element={
          <ProtectedRoute>
            <PageTransition>
              <Scan />
            </PageTransition>
          </ProtectedRoute>
        } />

        <Route path="/map" element={
          <ProtectedRoute>
            <PageTransition>
              <Map />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <PageTransition>
              <Notifications />
            </PageTransition>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <PageTransition>
              <Profile />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/profile/personal" element={
          <ProtectedRoute>
            <PageTransition>
              <PersonalSettings />
            </PageTransition>
          </ProtectedRoute>
        } />
        {/* contacts */}
        <Route path="/profile/contacts" element={
          <ProtectedRoute>
            <PageTransition>
              <EmergencyContacts />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/profile/contacts/new" element={
          <ProtectedRoute>
            <PageTransition>
              <NewEmergencyContact />
            </PageTransition>
          </ProtectedRoute>
        } />
        {/* password */}
        <Route path="/profile/security" element={
          <ProtectedRoute>
            <PageTransition>
              <SecurityPage />
            </PageTransition>
          </ProtectedRoute>
        } />
        {/* theme */}
        <Route path="/profile/theme" element={
          <ProtectedRoute>
            <PageTransition>
              <ThemePage />
            </PageTransition>
          </ProtectedRoute>
        } />

        {/* AI */}
        <Route path="/AI" element={
          <ProtectedRoute>
            <PageTransition>
              <Ai />
            </PageTransition>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem('theme') || "caramellatte");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" expand={true} richColors />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App
