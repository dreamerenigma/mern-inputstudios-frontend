import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText } from "react-icons/hi";
import { Button, Table  } from "flowbite-react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function DashboardComponent() {
   const { t } = useTranslation();
   const [users, setUsers] = useState([]);
   const [comments, setComments] = useState([]);
   const [posts, setPosts] = useState([]);
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalPosts, setTotalPosts] = useState(0);
   const [totalComments, setTotalComments] = useState(0);
   const [lastMonthUsers, setLastMonthUsers] = useState(0);
   const [lastMonthPosts, setLastMonthPosts] = useState(0);
   const [lastMonthComments, setLastMonthComments] = useState(0);
   const { currentUser } = useSelector((state) => state.user);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/user/getusers?limit=5`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            const data = await res.json();
            if (res.ok) {
               setUsers(data.users);
               setTotalUsers(data.totalUsers);
               setLastMonthUsers(data.lastMonthUsers);
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      const fetchPosts = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/post/getposts?limit=5`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            const data = await res.json();
            if (res.ok) {
               setPosts(data.posts);
               setTotalPosts(data.totalPosts);
               setLastMonthPosts(data.lastMonthPosts);
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      const fetchComments = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/comment/getcomments?limit=5`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            const data = await res.json();
            if (res.ok) {
               setComments(data.comments);
               setTotalComments(data.totalComments);
               setLastMonthComments(data.lastMonthComments);
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      if (currentUser.isAdmin) {
         fetchUsers();
         fetchPosts();
         fetchComments();
      }
   }, [SERVER_URL, currentUser]);
   
   return (
      <div className="p-3 md:mx-auto">
         <div className="flex-wrap flex gap-4 justify-center">
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
               <div className="flex justify-between">
                  <div className="">
                     <h3 className="text-gray-500 text-md uppercase">{t("profile:total_users")}</h3>
                     <p className="text-2xl">{totalUsers}</p>
                  </div>
                     <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                  </div>
                  <div className="flex gap-2 text-sm">
                     <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMonthUsers}
                     </span>
                  <div className="text-gray-500">{t("profile:last_month")}</div>
               </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
               <div className="flex justify-between">
                  <div className="">
                     <h3 className="text-gray-500 text-md uppercase">{t("profile:total_comments")}</h3>
                     <p className="text-2xl">{totalComments}</p>
                  </div>
                     <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                  </div>
                  <div className="flex gap-2 text-sm">
                     <span className="text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                     </span>
                  <div className="text-gray-500">{t("profile:last_month")}</div>
               </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
               <div className="">
                  <h3 className="text-gray-500 text-md uppercase">{t("profile:total_posts")}</h3>
                  <p className="text-2xl">{totalPosts}</p>
               </div>
                  <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
               </div>
               <div className="flex gap-2 text-sm">
                  <span className="text-green-500 flex items-center">
                     <HiArrowNarrowUp />
                     {lastMonthPosts}
                  </span>
                  <div className="text-gray-500">{t("profile:last_month")}</div>
               </div>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
               <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className="text-center p-2">{t("profile:recent_users")}</h1>
                  <Button
                     outline
                     gradientDuoTone="purpleToPink"
                  >
                     <Link to={`${languagePrefix}/dashboard?tab=users`}>{t("profile:see_all")}</Link>
                  </Button>
               </div>
               <Table hoverable>
                  <Table.Head>
                     <Table.HeadCell>{t("profile:user_image")}</Table.HeadCell>
                     <Table.HeadCell>{t("profile:username")}</Table.HeadCell>
                  </Table.Head>
                  {users && users.map((user) => (
                     <Table.Body key={user._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell>
                              <img
                                 src={user.profilePicture}
                                 alt="user"
                                 className="w-10 h-10 rounded-full bg-gray-500"
                              />
                           </Table.Cell>
                           <Table.Cell>{user.username}</Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))}
               </Table>
            </div>
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
               <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className="text-center p-2">{t("profile:recent_comments")}</h1>
                  <Button outline gradientDuoTone="purpleToPink">
                     <Link to={`${languagePrefix}/dashboard?tab=comments`}>{t("profile:see_all")}</Link>
                  </Button>
               </div>
               <Table hoverable>
                  <Table.Head>
                     <Table.HeadCell>{t("profile:comment_content")}</Table.HeadCell>
                     <Table.HeadCell>{t("profile:likes")}</Table.HeadCell>
                  </Table.Head>
                  {comments && comments.map((comment) => (
                     <Table.Body key={comment._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell className="w-9">
                              <p className="line-clamp-2">{comment.content}</p>
                           </Table.Cell>
                           <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))}
               </Table>
            </div>
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
               <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className="text-center p-2">{t("profile:recent_posts")}</h1>
                  <Button
                     outline
                     gradientDuoTone="purpleToPink"
                  >
                     <Link to={`${languagePrefix}/dashboard?tab=posts`}>{t("profile:see_all")}</Link>
                  </Button>
               </div>
               <Table hoverable>
                  <Table.Head>
                     <Table.HeadCell>{t("profile:post_image")}</Table.HeadCell>
                     <Table.HeadCell>{t("profile:post_title")}</Table.HeadCell>
                     <Table.HeadCell>{t("profile:category")}</Table.HeadCell>
                  </Table.Head>
                  {posts && posts.map((post) => (
                     <Table.Body key={post._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell>
                              <img
                                 src={post.image}
                                 alt="user"
                                 className="w-14 h-10 rounded-md bg-gray-500"
                              />
                           </Table.Cell>
                           <Table.Cell className="w-96">{post.title}</Table.Cell>
                           <Table.Cell className="w-5">{post.category}</Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))}
               </Table>
            </div>
         </div>
      </div>
   );
}
