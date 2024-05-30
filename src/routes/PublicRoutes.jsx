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
import ChatSam from '../pages/ChatSam';
import DownloadApps from '../pages/DownloadApps';
import Workspace from '../pages/Workspace';
import Projects from '../pages/Projects';
import Cloud from '../pages/Cloud';
import WeatherAPI from '../pages/WeatherAPI';
import ECommerceApps from '../pages/ECommerceApps';
import Business from '../pages/Business';
import SmallBusiness from '../pages/SmallBusiness';
import PostPage from '../pages/PostPage';
import Contacts from '../pages/Contacts';
import ChangePassword from '../pages/ChangePassword';
import ResetPassword from '../pages/ResetPassword';
import ConcernPrivacy from '../pages/ConcernPrivacy';
import PrivacyAdSettings from '../pages/PrivacyAdSettings';
import PrivacyStatement from '../pages/PrivacyStatement';
import ConcentManage from '../pages/ConcentManage';
import Blogs from '../pages/Blogs';
import DownloadBrowserWave from '../pages/DownloadBrowserWave';

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
         <Route path="/privacy/ad-settings" element={<PrivacyAdSettings />} />
         <Route path="/privacystatement" element={<PrivacyStatement />} />
         <Route path="/concern/privacy" element={<ConcernPrivacy />} />
         <Route path="/consent/manage" element={<ConcentManage />} />
         <Route path="/terms-of-use" element={<TermsOfUse />} />
         <Route path="/wave" element={<BrowserWave />} />
         <Route path="/wave/download" element={<DownloadBrowserWave />} />
         <Route path="/quantum-engine" element={<QuantumEngine />} />
         <Route path="/dialog-chat" element={<DialogChat />} />
         <Route path="/chat-sam" element={<ChatSam />} />
         <Route path="/download-apps" element={<DownloadApps />} />
         <Route path="/workspace" element={<Workspace />} />
         <Route path="/projects" element={<Projects />} />
         <Route path="/cloud" element={<Cloud />} />
         <Route path="/weather-api" element={<WeatherAPI />} />
         <Route path="/e-commerce-apps" element={<ECommerceApps />} />
         <Route path="/business" element={<Business />} />
         <Route path="/small-business" element={<SmallBusiness />} />
         <Route path="/blogs" element={<Blogs />} />
         <Route path="/post/:postSlug" element={<PostPage />} />
         <Route path="/contacts" element={<Contacts />} />
         <Route path="/password/change" element={<ChangePassword />} />
         <Route path="/password/reset" element={<ResetPassword />} />
      </Routes>
   );
}
