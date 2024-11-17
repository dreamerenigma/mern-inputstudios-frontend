import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
   const { currentUser } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   const location = useLocation();

   const adminOnlyRoutes = ['/dashboard'];
   
   const isAdminRoute = adminOnlyRoutes.includes(location.pathname);

   if (currentUser) {
      if (!isAdminRoute || currentUser.isAdmin) {
         return <Outlet />;
      } else {
         return <Navigate to={`${languagePrefix}/sign-in`} />;
      }
   }

   return <Navigate to={`${languagePrefix}/sign-in`} />;
}
