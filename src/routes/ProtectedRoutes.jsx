import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';

export default function ProtectedRoutes() {
   return (
      <Routes>
         <Route element={<PrivateRoute />}>
         <Route path="/dashboard" element={<Dashboard />} />
         </Route>
      </Routes>
   );
}
