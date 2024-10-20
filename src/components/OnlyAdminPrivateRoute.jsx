import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
   const { currentUser } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   
   return currentUser && currentUser.isAdmin ? (
      <Outlet />
   ) : (
      <Navigate to={`${languagePrefix}/sign-in`} />
   );
}
