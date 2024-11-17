import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Conversations from '../pages/Conversations';
import React from 'react';

export default function ProtectedRoutes() {
   const languages = ['ru-ru', 'en-us'];

   return (
      <Routes>
         {languages.map(lang => (
            <React.Fragment key={lang}>
               <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path={`/${lang}/conversations/:userId`} element={<Conversations />} />
               </Route>
            </React.Fragment>
         ))}
      </Routes>
   );
}
