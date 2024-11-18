import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
   const { currentUser } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   const location = useLocation();

   const adminOnlyRoutes = ['/dashboard'];
   const isAdminRoute = adminOnlyRoutes.includes(location.pathname);

   if (!currentUser) {
      console.warn("User is not authenticated. Redirecting to sign-in.");
      return <Navigate to={`${languagePrefix}/sign-in`} />;
   }

   if (isAdminRoute && !currentUser.isAdmin) {
      console.warn("User is not an admin. Redirecting to sign-in.");
      return <Navigate to={`${languagePrefix}/sign-in`} />;
   }

   return <Outlet />;
}
