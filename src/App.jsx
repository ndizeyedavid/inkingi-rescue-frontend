import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

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
import NewSos from "./pages/NewSos"
import PersonalSettings from "./pages/PersonalSettings"
import EmergencyContacts from "./pages/EmergencyContacts"
import NewEmergencyContact from "./pages/NewEmergencyContact"
import SecurityPage from "./pages/SecurityPage"
import ThemePage from "./pages/ThemePage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" expand={true} richColors />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/" element={<Home />} />
          <Route path="/sos" element={<Sos />} />
          <Route path="/sos/new" element={<NewSos />} />
          <Route path="/sos/new/:emergency" element={<NewSos />} />
          <Route path="/sos/reports" element={<Report />} />
          <Route path="/sos/scan/:id" element={<Scan />} />

          <Route path="/map" element={<Map />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal" element={<PersonalSettings />} />
          {/* contacts */}
          <Route path="/profile/contacts" element={<EmergencyContacts />} />
          <Route path="/profile/contacts/new" element={<NewEmergencyContact />} />
          {/* password */}
          <Route path="/profile/security" element={<SecurityPage />} />
          {/* theme */}
          <Route path="/profile/theme" element={<ThemePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
