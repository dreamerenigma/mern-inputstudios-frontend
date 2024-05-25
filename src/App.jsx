import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminRoutes from './routes/AdminRoutes';

export default function App() {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
  ];
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header languages={languages} />
      <PublicRoutes />
      <ProtectedRoutes />
      <AdminRoutes />
      <Footer />
    </BrowserRouter>
  );
}
