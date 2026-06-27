import AboutUs from './components/AboutUs.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './components/FirstPage.jsx';
import MapPage from './components/MapPage.jsx';
import PharmacyAdmin from './components/PharmacyAdmin.jsx';
import PharmacyPage from './components/PharmacyPage.jsx';
import PharmacyDashboard from './components/PharmacyDashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/mappage" element={<MapPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/pharmacy/admin" element={<PharmacyAdmin />} />
        <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
       
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
