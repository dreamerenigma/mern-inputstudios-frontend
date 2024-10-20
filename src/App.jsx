import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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

const languages = ['ru-ru', 'en-us'];

function Layout() {
  const location = useLocation();

  function getLanguagePrefixedPages(pages) {
    return languages.flatMap(lang => pages.map(page => `/${lang}/dashboard?tab=${page}`));
  }

  const isProfileHeader = languages.some(lang =>
    location.pathname.startsWith(`/${lang}/dashboard`) && location.search.includes('tab=')
  );

  const customHeaderPages = getLanguagePrefixedPages(['/forum']);
  const showCommunityHeader = customHeaderPages.includes(location.pathname);

  const headerPages = getLanguagePrefixedPages(['/wave', '/wave/download', '/quantum-engine', '/chatify', '/workspace']);
  const showHeader = headerPages.includes(location.pathname);

  const isDashboardPage = location.pathname === '/dashboard';
  const isPrivacyPage = location.pathname.includes('/privacy-statement');
  const isForumPage = languages.some(lang => location.pathname.startsWith(`/${lang}/forum`));
  const isSupportPage = languages.some(lang => location.pathname.startsWith(`/${lang}/contactus`));

  return (
    <div>
      <FeedbackButton />
      <ScrollToTop />
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
      {isDashboardPage ? <ProfileFooter /> : <Footer />}
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
