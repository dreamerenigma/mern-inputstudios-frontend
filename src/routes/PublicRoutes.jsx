import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Search from '../pages/Search';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import PrivacyReport from '../pages/PrivacyReport';
import TermsOfUse from '../pages/TermsOfUse';
import BrowserWave from '../pages/BrowserWave';
import QuantumEngine from '../pages/QuantumEngine';
import DialogChat from '../pages/DialogChat';
import Workspace from '../pages/Workspace';
import Projects from '../pages/Projects';
import PostPage from '../pages/PostPage';
import Contacts from '../pages/Contacts';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/privacy-report" element={<PrivacyReport />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/wave" element={<BrowserWave />} />
      <Route path="/quantum-engine" element={<QuantumEngine />} />
      <Route path="/dialog-chat" element={<DialogChat />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/post/:postSlug" element={<PostPage />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}
