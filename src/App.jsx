import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/headers/Header';
import CommunityHeader from './components/headers/CommunityHeader';
import SupportHeader from './components/headers/SupportHeader';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Footer from './components/footers/Footer';
import CustomHeader from './components/headers/CustomHeader';
import Home from './pages/Home';
import ProfileHeader from './components/headers/ProfileHeader';
import FeedbackButton from './components/buttons/FeedbackButton';
import ProfileFooter from './components/footers/ProfileFooter';
import PrivacyHeader from './components/headers/PrivacyHeader';
import { useEffect, useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Tooltip from './components/tooltips/Tooltip';
import { useSelector } from 'react-redux';

function getQueryParams(search) {
   return new URLSearchParams(search);
}

const languages = ['ru-ru', 'en-us'];

function Layout() {
   const location = useLocation();
   const [isLoading, setIsLoading] = useState(true);
   const queryParams = getQueryParams(location.search);
   const tooltip = useSelector((state) => state.ui.tooltip);

   useEffect(() => {
      console.log("Current Tooltip state:", tooltip);
      setIsLoading(false);
   }, [tooltip]);

   function getLanguagePrefixedPages(pages) {
      return languages.flatMap(lang => pages.map(page => `/${lang}/dashboard?tab=${page}`));
   }

   const isProfileHeader = languages.some(lang =>
      location.pathname.startsWith(`/${lang}/dashboard`) && queryParams.get('tab') !== null ||
      location.pathname === (`/${lang}/password/change`) ||
      location.pathname === (`/${lang}/names/manage`)
   );

   const customHeaderPages = getLanguagePrefixedPages(['/forum']);
   const showCommunityHeader = customHeaderPages.includes(location.pathname);

   const headerPages = getLanguagePrefixedPages(['/wave', '/wave/download', '/quantum-engine', '/chatify', '/workspace']);
   const showHeader = headerPages.includes(location.pathname);

   const isPrivacyPage = location.pathname.includes('/privacystatement');
   const isForumPage = languages.some(lang => 
      location.pathname.startsWith(`/${lang}/forum`) ||
      (location.pathname === `/${lang}/newthreads` && queryParams.get('threadtype') === 'Questions')
   );

   const isSupportPage = languages.some(lang => location.pathname.startsWith(`/${lang}/contactus`));

   const profileFooterPaths = languages.flatMap(lang => [
      `/${lang}/dashboard`,
      `/${lang}/profile`,
      `/${lang}/settings`,
      `/${lang}/privacy/privacystatement`,
      `/${lang}/names/manage`
   ]);

   const shouldShowProfileFooter = profileFooterPaths.some(path => {
      const matchesPath = location.pathname.startsWith(path);
      
      const isDashboardWithTab = languages.some(lang =>
         location.pathname.startsWith(`/${lang}/dashboard`)
      );
      
      const hasTab = queryParams.has('tab');
      
      return matchesPath || (isDashboardWithTab || hasTab);
   });

   const isSignInPage = languages.some(lang =>
      location.pathname === `/${lang}/sign-in` ||
      location.pathname === `/${lang}/sign-up`
   );

   return (
      <div>
         <FeedbackButton />
         <ScrollToTop />
         {isLoading ? null : (
         <>
            <Tooltip showTooltip={tooltip.show} text={tooltip.text} />
            {isPrivacyPage ? (
               <PrivacyHeader />
            ) : isProfileHeader ? (
               <ProfileHeader />
            ) : isForumPage ? (
               <CommunityHeader />
            ) : isSupportPage ? ( 
               <SupportHeader />
            ) : showCommunityHeader ? (
               <CommunityHeader />
            ) : showHeader ? (
               <CustomHeader />
            ) : (
               <Header languages={languages} />
            )}
            <PublicRoutes />
            <ProtectedRoutes />
            <AdminRoutes />
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>
            {!isSignInPage && (shouldShowProfileFooter ? <ProfileFooter /> : <Footer />)}
         </>
         )}
      </div>
   );
}

export default function App() {
   const languages = [
      { code: 'en', name: 'English' },
      { code: 'ru', name: 'Russian' },
   ];

   return (
      <BrowserRouter>
         <Layout languages={languages} />
      </BrowserRouter>
   );
}
