import { Routes, Route, Navigate } from "react-router-dom";
import About from "../pages/about/About";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/Search";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PrivacyReport from "../pages/PrivacyReport";
import TermsOfUse from "../pages/TermsOfUse";
import BrowserWave from "../pages/browser/BrowserWave";
import QuantumEngine from "../pages/QuantumEngine";
import ChatSam from "../pages/ChatSam";
import Chatify from "../pages/Chatify";
import Workspace from "../pages/Workspace";
import Projects from "../pages/Projects";
import Cloud from "../pages/Cloud";
import WeatherAPI from "../pages/WeatherAPI";
import ECommerceApps from "../pages/ECommerceApps";
import Business from "../pages/Business";
import SmallBusiness from "../pages/business/SmallBusiness";
import PostPage from "../pages/PostPage";
import Contacts from "../pages/Contacts";
import ChangePassword from "../pages/ChangePassword";
import ResetPassword from "../pages/ResetPassword";
import ConcernPrivacy from "../pages/ConcernPrivacy";
import PrivacyAdSettings from "../pages/PrivacyAdSettings";
import PrivacyStatement from "../pages/PrivacyStatement";
import ConcentManage from "../pages/ConcentManage";
import Blogs from "../pages/Blogs";
import WaveFeatures from "../pages/browser/WaveFeatures";
import DownloadBrowserWave from "../pages/browser/DownloadBrowserWave";
import Trademarks from "../pages/Trademarks";
import SupportBusiness from "../pages/business/SupportBusiness";
import Forum from "../pages/Forum";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import React from "react";
import { useSelector } from "react-redux";
import AboutCompany from "../pages/about/AboutCompany";
import OurHistory from "../pages/about/OurHistory";
import SupportRoutes from "./SupportRoutes";

const languages = ['ru-ru', 'en-us'];

export default function PublicRoutes() {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en-us' ? 'en-us' : 'ru-ru';
   
   return (
      <Routes>
         <Route path="/" element={<Navigate to={`/${languagePrefix}`} />} />
         <Route path={`/${languagePrefix}/`} element={<Home />} />
         <Route path={`/${languagePrefix}/support/*`} element={<SupportRoutes />} />
         {languages.map(lang => (
            <React.Fragment key={lang}>
               <Route path={`/${lang}/`} element={<Home />} />
               <Route path={`/${lang}/dashboard`} element={<Dashboard />} />
               <Route path={`/${lang}/about`} element={<About />} />
               <Route path={`/${lang}/about-company`} element={<AboutCompany />} />
               <Route path={`/${lang}/our-history`} element={<OurHistory />} />
               <Route path={`/${lang}/sign-in`} element={<SignIn />} />
               <Route path={`/${lang}/sign-up`} element={<SignUp />} />
               <Route path={`/${lang}/search`} element={<Search />} />
               <Route path={`/${lang}/privacy`} element={<PrivacyPolicy />} />
               <Route path={`/${lang}/privacy-report`} element={<PrivacyReport />} />
               <Route path={`/${lang}/privacy/ad-settings`} element={<PrivacyAdSettings />} />
               <Route path={`/${lang}/privacy-statement`} element={<PrivacyStatement />} />
               <Route path={`/${lang}/concern/privacy`} element={<ConcernPrivacy />} />
               <Route path={`/${lang}/consent/manage`} element={<ConcentManage />} />
               <Route path={`/${lang}/terms-of-use`} element={<TermsOfUse />} />
               <Route path={`/${lang}/wave`} element={<BrowserWave />} />
               <Route path={`/${lang}/wave/download`} element={<DownloadBrowserWave />} />
               <Route path={`/${lang}/quantum-engine`} element={<QuantumEngine />} />
               <Route path={`/${lang}/chatify`} element={<Chatify />} />
               <Route path={`/${lang}/workspace`} element={<Workspace />} />
               <Route path={`/${lang}/chat-sam`} element={<ChatSam />} />
               <Route path={`/${lang}/projects`} element={<Projects />} />
               <Route path={`/${lang}/forum`} element={<Forum />} />
               <Route path={`/${lang}/cloud`} element={<Cloud />} />
               <Route path={`/${lang}/weather-api`} element={<WeatherAPI />} />
               <Route path={`/${lang}/e-commerce-apps`} element={<ECommerceApps />} />
               <Route path={`/${lang}/business`} element={<Business />} />
               <Route path={`/${lang}/small-business`} element={<SmallBusiness />} />
               <Route path={`/${lang}/blogs`} element={<Blogs />} />
               <Route path={`/${lang}/post/:postSlug`} element={<PostPage />} />
               <Route path={`/${lang}/contactus`} element={<Contacts />} />
               <Route path={`/${lang}/password/change`} element={<ChangePassword />} />
               <Route path={`/${lang}/password/reset`} element={<ResetPassword />} />
               <Route path={`/${lang}/wave/features`} element={<WaveFeatures />} />
               <Route path={`/${lang}/trademarks`} element={<Trademarks />} />
               <Route path={`/${lang}/support-for-business`} element={<SupportBusiness />} />
            </React.Fragment>
         ))}
      </Routes>
   );
}
