import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText } from "react-icons/hi";
import { Button, Table  } from "flowbite-react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ChartComponent } from "./ChartComponent";

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
   
            const res = await fetch(`${SERVER_URL}/api/comment/getcomments?limit=6`, {
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
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)]">
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-8 mb-20 mx-auto px-4">
            <h1 className="font-semibold text-3xl text-left mb-8">
               {t("dashboard")}
            </h1>
            <div className="space-y-4">
               <div className="flex flex-wrap justify-between gap-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 w-full">
                     <div className="flex flex-col shadow-md rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 col-span-2">
                        <div className="flex flex-col p-3 gap-4">
                           <div className="flex justify-between items-center">
                           <h3 className="text-gray-500 text-md uppercase">{t("profile:total_stats")}</h3>
                           </div>
                           <div className="w-full h-64">
                              <ChartComponent />
                           </div>
                           <div className="flex gap-4 text-sm">
                           <div className="flex items-center gap-2">
                              <span className="text-green-500 flex items-center">
                                 <HiArrowNarrowUp />
                                 {lastMonthUsers} {t("profile:users")}
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-lime-500 flex items-center">
                                 <HiArrowNarrowUp />
                                 {lastMonthPosts} {t("profile:posts")}
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-indigo-500 flex items-center">
                                 <HiArrowNarrowUp />
                                 {lastMonthComments} {t("profile:comments")}
                              </span>
                           </div>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="mb-2">
                           <Link to={`${languagePrefix}/dashboard?tab=users`} className="flex-1 min-w-[200px]">
                              <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 rounded-md shadow-md border border-gray-300 dark:border-gray-700 hover:bg-teal-100 dark:hover:bg-teal-700/30 transition-all">
                              <div className="flex justify-between">
                                 <div className="text-left">
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
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={`${languagePrefix}/dashboard?tab=posts`} className="flex-1 min-w-[200px]">
                              <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 rounded-md shadow-md border border-gray-300 dark:border-gray-700 hover:bg-green-200 dark:hover:bg-green-700/30 transition-all">
                              <div className="flex justify-between">
                                 <div className="text-left">
                                    <h3 className="text-gray-500 text-md uppercase">{t("profile:total_posts")}</h3>
                                    <p className="text-2xl">{totalPosts}</p>
                                 </div>
                                 <HiDocumentText className="bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                              </div>
                              <div className="flex gap-2 text-sm">
                                 <span className="text-green-500 flex items-center">
                                    <HiArrowNarrowUp />
                                    {lastMonthPosts}
                                 </span>
                                 <div className="text-gray-500">{t("profile:last_month")}</div>
                              </div>
                              </div>
                           </Link>
                        </div>
                        <div className="mb-2">
                           <Link to={`${languagePrefix}/dashboard?tab=comments`} className="flex-1 min-w-[200px]">
                              <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 rounded-md shadow-md border border-gray-300 dark:border-gray-700 hover:bg-purple-200 dark:hover:bg-purple-700/30 transition-all">
                              <div className="flex justify-between">
                                 <div className="text-left">
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
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full md:w-auto shadow-md rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                     <div className="overflow-x-auto w-full">
                        <Table hoverable>
                           <Table.Head>
                              <Table.HeadCell>{t("profile:user_image")}</Table.HeadCell>
                              <Table.HeadCell>{t("profile:username")}</Table.HeadCell>
                           </Table.Head>
                           <Table.Body className="divide-y divide-gray-300 dark:divide-gray-700">
                              {users && users.map((user) => (
                                 <Table.Row key={user._id} className="bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-300/60 dark:hover:bg-gray-700/60">
                                    <Table.Cell
                                       className="cursor-pointer"
                                       onClick={(e) => {
                                          if (!e.target.closest(".non-clickable")) {
                                             window.location.href = `${languagePrefix}/user/${user.username}`;
                                          }
                                       }}
                                    >
                                       <img
                                          src={user.profilePicture}
                                          alt="user"
                                          className="w-10 h-10 rounded-full bg-gray-500"
                                       />
                                    </Table.Cell>
                                    <Table.Cell
                                       className="cursor-pointer"
                                       onClick={(e) => {
                                          if (!e.target.closest(".non-clickable")) {
                                             window.location.href = `${languagePrefix}/user/${user.username}`;
                                          }
                                       }}
                                    >
                                       {user.username}
                                    </Table.Cell>
                                 </Table.Row>
                              ))}
                           </Table.Body>
                        </Table>
                     </div>
                     <hr className="mb-2 border-t border-gray-300 dark:border-gray-600" />
                     <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">{t("profile:recent_users")}</h1>
                        <Button
                           outline
                           gradientDuoTone="purpleToPink"
                        >
                           <Link to={`${languagePrefix}/dashboard?tab=users`}>{t("profile:see_all")}</Link>
                        </Button>
                     </div>
                  </div>
                  <div className="flex flex-col w-full md:w-auto shadow-md rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                     <div className="overflow-x-auto w-full">
                        <Table hoverable>
                           <Table.Head>
                              <Table.HeadCell>{t("profile:comment_content")}</Table.HeadCell>
                              <Table.HeadCell>{t("profile:likes")}</Table.HeadCell>
                           </Table.Head>
                           <Table.Body className="divide-y divide-gray-300 dark:divide-gray-700">
                              {comments && comments.map((comment) => (
                                 <Table.Row key={comment._id} className="bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-300/60 dark:hover:bg-gray-700/60">
                                    <Table.Cell className="w-9 py-[18px]">
                                       <p className="line-clamp-2">{comment.content}</p>
                                    </Table.Cell>
                                    <Table.Cell className="w-9">{comment.numberOfLikes}</Table.Cell>
                                 </Table.Row>
                              
                              ))}
                           </Table.Body>
                        </Table>
                        <hr className="mb-2 border-t border-gray-300 dark:border-gray-600" />
                        <div className="flex justify-between p-3 text-sm font-semibold">
                           <h1 className="text-center p-2">{t("profile:recent_comments")}</h1>
                           <Button outline gradientDuoTone="purpleToPink">
                              <Link to={`${languagePrefix}/dashboard?tab=comments`}>{t("profile:see_all")}</Link>
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col w-full md:w-auto shadow-md rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <div className="overflow-x-auto w-full">
                     <Table hoverable>
                        <Table.Head>
                           <Table.HeadCell>{t("profile:post_image")}</Table.HeadCell>
                           <Table.HeadCell>{t("profile:post_title")}</Table.HeadCell>
                           <Table.HeadCell>{t("profile:category")}</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y divide-gray-300 dark:divide-gray-700">
                           {posts && posts.map((post) => (
                              <Table.Row 
                                 key={post._id}
                                 className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-300/60 dark:hover:bg-gray-700/60"
                                 onClick={() => window.location.href = `${languagePrefix}/post/${post.slug}`}
                              >
                                 <Table.Cell>
                                    <img
                                       src={post.image}
                                       alt="user"
                                       className="w-20 h-10 rounded-md bg-gray-500"
                                    />
                                 </Table.Cell>
                                 <Table.Cell className="w-96">{post.title}</Table.Cell>
                                 <Table.Cell className="w-5">{post.category}</Table.Cell>
                              </Table.Row>
                           ))}
                        </Table.Body>
                     </Table>
                     <hr className="mb-2 border-t border-gray-300 dark:border-gray-600" />
                     <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className="text-center p-2">{t("profile:recent_posts")}</h1>
                        <Button
                           outline
                           gradientDuoTone="purpleToPink"
                        >
                           <Link to={`${languagePrefix}/dashboard?tab=posts`}>{t("profile:see_all")}</Link>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
