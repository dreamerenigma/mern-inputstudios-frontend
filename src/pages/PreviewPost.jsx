import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function PreviewPost() {
   const { t } = useTranslation();
   const { postId } = useParams();
   const [formData, setFormData] = useState({ title: '', category: 'uncategorized', content: '', image: '' });
   const [publishError, setPublishError] = useState(null);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchPost = async () => {
         try {
            const res = await fetch(`${SERVER_URL}/api/post/getposts?postId=${postId}`, { signal });
            if (!res.ok) {
               const errorData = await res.json();
               setPublishError(errorData.message);
               return;
            }
            const data = await res.json();
            if (data.posts && data.posts.length > 0) {
               const post = data.posts[0];
               setFormData({
                  title: post.title || '',
                  content: post.content || '',
                  image: post.image || '',
                  category: post.category || 'uncategorized'
               });
            } else {
               setPublishError("No post found.");
            }
         } catch (error) {
            if (error.name !== "AbortError") {
               console.error("Error fetching post:", error.message);
            }
         }
      };

      if (postId) {
         fetchPost();
      }

      return () => {
         controller.abort();
      };
   }, [SERVER_URL, postId]);

   return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen mt-[60px]">
         <Helmet>
            <title>{t("posts:title_post")}</title>
         </Helmet>
         <div className="my-6 p-4">
            <h2 className="text-3xl text-center font-semibold">Превью поста</h2>
            {publishError ? (
               <p className="text-red-500">{publishError}</p>
            ) : (
               <>
                  <h3 className="text-xl font-semibold mt-3">{formData.title}</h3>
                  <p className="text-gray-700 mt-2">{formData.content}</p>
                  {formData.image && <img src={formData.image} alt="Preview" className="w-full h-40 object-cover mt-4" />}
               </>
            )}
         </div>
      </div>
   );
}
