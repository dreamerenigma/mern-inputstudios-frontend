import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import FeedbackButton from './components/FeedbackButton';
import Header from './components/Header';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Footer from './components/Footer';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
import Home from './pages/Home';

function Layout({ languages }) {
  const location = useLocation();
  const headerPages = ['/wave', '/wave/download', '/quantum-engine', '/dialog-chat', '/workspace'];
  const showHeader = headerPages.includes(location.pathname);
  const footerPages = ['/', '/wave', '/wave/download', '/quantum-engine', '/dialog-chat', '/workspace'];
  const showFooter = footerPages.includes(location.pathname);

  return (
    <div>
      <FeedbackButton />
      <ScrollToTop />
      {showHeader ? <CustomHeader /> : <Header languages={languages} />}
      <PublicRoutes />
      <ProtectedRoutes />
      <AdminRoutes />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {showFooter ? <Footer /> : <CustomFooter />}
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
