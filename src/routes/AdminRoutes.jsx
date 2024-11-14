import { Routes, Route } from 'react-router-dom';
import OnlyAdminPrivateRoute from '../components/OnlyAdminPrivateRoute';
import CreatePost from '../pages/CreatePost';
import UpdatePost from '../pages/UpdatePost';
import React from 'react';
import PreviewPost from '../pages/PreviewPost';

const languages = ['ru-ru', 'en-us'];

export default function AdminRoutes() {
   return (
      <Routes>
         {languages.map(lang => (
            <React.Fragment key={lang}>
               <Route element={<OnlyAdminPrivateRoute />}>
                  <Route path={`/${lang}/create-post`} element={<CreatePost />} />
                  <Route path={`/${lang}/update-post/:postId`} element={<UpdatePost />} />
                  <Route path={`/${lang}/preview-post`} element={<PreviewPost />} />
               </Route>
            </React.Fragment>
         ))}
      </Routes>
   );
}
