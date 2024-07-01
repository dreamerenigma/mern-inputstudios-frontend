import { Routes, Route } from 'react-router-dom';
import OnlyAdminPrivateRoute from '../components/OnlyAdminPrivateRoute';
import CreatePost from '../pages/CreatePost';
import UpdatePost from '../pages/UpdatePost';

export default function AdminRoutes() {
   return (
      <Routes>
         <Route element={<OnlyAdminPrivateRoute />}>
         <Route path="/create-post" element={<CreatePost />} />
         <Route path="/update-post/:postId" element={<UpdatePost />} />
         </Route>
      </Routes>
   );
}
