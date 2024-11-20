import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes }  from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";
import { deleteUser } from "../api/userApi";

export default function DashUsers() {
   const { t } = useTranslation();
   const { currentUser } = useSelector((state) => state.user);
   const [users, setUsers] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [userIdToDelete, setUserIdToDelete] = useState("");
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/user/getusers`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            
            const data = await res.json();
            if (res.ok) {
               setUsers(data.users);
               if (data.users.length < 9) {
                  setShowMore(false);
               }
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      if (currentUser.isAdmin) {
         fetchUsers();
      }
   }, [SERVER_URL, currentUser._id, currentUser.isAdmin]);

   const handleShowMore = async () => {
      const startIndex = users.length;
      try {
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/user/getusers?startIndex=${startIndex}`, {
            method: 'GET',
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
         
         const data = await res.json();
         if (res.ok) {
            setUsers((prev) => [...prev, ...data.users]);
            if (data.users.length < 9) {
               setShowMore(false);
            }
         } else {
            console.log(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleDeleteUser = async () => {
      const { success, data, error } = await deleteUser(userIdToDelete);
      if (success) {
         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
         setShowModal(false);
      } else {
         console.log(data?.message || error);
      }
   };

   return (
      <div
         className={`table-auto md:mx-auto pt-3 px-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 overflow-x-auto ${
            !showMore ? 'mb-5' : ''
         }`}
      >
         {currentUser.isAdmin && users.length > 0 ? (
            <>
               <div className="border border-gray-700 rounded-lg overflow-x-auto">
                  <Table hoverable className="shadow-md">
                     <Table.Head>
                        <Table.HeadCell>{t("user_id")}</Table.HeadCell>
                        <Table.HeadCell>{t("date_created")}</Table.HeadCell>
                        <Table.HeadCell>{t("user_image")}</Table.HeadCell>
                        <Table.HeadCell>{t("username")}</Table.HeadCell>
                        <Table.HeadCell>{t("email")}</Table.HeadCell>
                        <Table.HeadCell>{t("admin")}</Table.HeadCell>
                        <Table.HeadCell>{t("delete")}</Table.HeadCell>
                     </Table.Head>
                     {users.map((user) => (
                        <Table.Body className="divide-y" key={user._id}>
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/80">
                              <Table.Cell>{user._id}</Table.Cell>
                              <Table.Cell>
                                 {new Date(user.createdAt).toLocaleDateString()}
                              </Table.Cell>
                              <Table.Cell>
                                 <img
                                    src={user.profilePicture}
                                    alt={user.username}
                                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                                 />
                              </Table.Cell>
                              <Table.Cell>{user.username}</Table.Cell>
                              <Table.Cell>{user.email}</Table.Cell>
                              <Table.Cell>
                                 {user.isAdmin ? (
                                    <FaCheck className="text-green-500" />
                                 ) : (
                                    <FaTimes className="text-red-500" />
                                 )}
                              </Table.Cell>
                              <Table.Cell>
                                 <span
                                    onClick={() => {
                                    setShowModal(true);
                                    setUserIdToDelete(user._id);
                                    }}
                                    className="font-medium text-red-500 hover:underline cursor-pointer"
                                 >
                                    {t("delete")}
                                 </span>
                              </Table.Cell>
                           </Table.Row>
                        </Table.Body>
                     ))}
                  </Table>
               </div>
               {showMore && (
                  <div className="flex justify-center my-6">
                     <button
                        onClick={handleShowMore}
                        className="text-teal-500 text-sm py-2 px-4 border border-teal-500 rounded hover:bg-teal-100 dark:hover:bg-teal-800"
                     >
                        {t("show_more")}
                     </button>
                  </div>
               )}
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-screen">
               <img
                  src="/images/profile/no_users.png"
                  alt="No users"
                  className="mb-4 w-56 h-52"
               />
               <p>{t("you_have_no_users")}</p>
            </div>
         )}
         {showModal && (
            <div
               className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
               onClick={() => setShowModal(false)}
            >
               <div
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     className="absolute top-3 right-3 text-3xl hover:bg-gray-500 rounded text-gray-500 dark:text-gray-300 transition-transform transform hover:translate-y-[-4px]"
                     onClick={() => setShowModal(false)}
                  >
                     <RiCloseLine className="h-6 w-6" />
                  </button>
                  <div className="text-center">
                     <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                     <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                        {t("sure_you_delete_user")}
                     </h3>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <button
                           className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded-lg flex-grow"
                           onClick={handleDeleteUser}
                        >
                           {t("yes_sure")}
                        </button>
                        <button
                           className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex-grow"
                           onClick={() => setShowModal(false)}
                        >
                           {t("no_cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
