import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import FeedbackButton from './components/FeedbackButton';
import Header from './components/Header';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Footer from './components/Footer';
import CustomFooter from './components/CustomFooter';
import Home from './pages/Home';

function Layout({ languages }) {
  const location = useLocation();

  return (
    <div>
      <FeedbackButton />
      <ScrollToTop />
      <Header languages={languages} />
      <PublicRoutes />
      <ProtectedRoutes />
      <AdminRoutes />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {location.pathname === '/' ? <Footer /> : <CustomFooter />}
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
