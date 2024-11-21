import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartComponent = () => {
   const { t } = useTranslation();
   const [totalUsers, setTotalUsers] = useState([]);
   const [totalPosts, setTotalPosts] = useState([]);
   const [totalComments, setTotalComments] = useState([]);
   const [chartData, setChartData] = useState(null);
   const { currentUser } = useSelector((state) => state.user);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

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
            console.log("Fetched Users Data:", data);
            if (res.ok) {
               setTotalUsers(data.totalUsers || []);
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
            console.log("Fetched Posts Data:", data);
            if (res.ok) {
               setTotalPosts(data.totalPosts || []);
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
            console.log("Fetched Comments Data:", data);
            if (res.ok) {
               setTotalComments(data.totalComments || []);
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
   

   useEffect(() => {
      const fetchData = async () => {
         if (currentUser.isAdmin) {
            console.log("Total Users:", totalUsers);
            console.log("Total Posts:", totalPosts);
            console.log("Total Comments:", totalComments);
   
            const usersData = Array(12).fill(0).map((_, i) => (i < totalUsers ? totalUsers : 0));
            const postsData = Array(12).fill(0).map((_, i) => (i < totalPosts ? totalPosts : 0));
            const commentsData = Array(12).fill(0).map((_, i) => (i < totalComments ? totalComments : 0));
   
            console.log("Processed Users Data:", usersData);
            console.log("Processed Posts Data:", postsData);
            console.log("Processed Comments Data:", commentsData);
   
            setChartData({
               labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
               datasets: [
                  {
                     label: t("profile:total_user"),
                     data: usersData,
                     borderColor: 'rgba(75, 192, 192, 1)',
                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
                     fill: true,
                  },
                  {
                     label: t("profile:total_posts"),
                     data: postsData,
                     borderColor: 'rgba(192, 75, 75, 1)',
                     backgroundColor: 'rgba(192, 75, 75, 0.2)',
                     fill: true,
                  },
                  {
                     label: t("profile:total_comments"),
                     data: commentsData,
                     borderColor: 'rgba(75, 75, 192, 1)',
                     backgroundColor: 'rgba(75, 75, 192, 0.2)',
                     fill: true,
                  },
               ],
            });
         }
      };
   
      fetchData();
   }, [currentUser, t, totalUsers, totalPosts, totalComments]);   

   const chartOptions = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         tooltip: {
            mode: 'index',
            intersect: false,
         },
      },
   };

   return (
      <div className="w-full h-64">
         {chartData ? (
            <Line data={chartData} options={chartOptions} />
         ) : (
            <p>{t("loading")}</p>
         )}
      </div>
   );
};
