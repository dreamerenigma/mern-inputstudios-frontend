import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PrivacyReport from './pages/PrivacyReport';
import Contacts from './pages/Contacts';
import TermsOfUse from './pages/TermsOfUse';

export default function App() {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
  ];
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header languages={languages} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-report" element={<PrivacyReport />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
