import { Alert, Button, FileInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import CustomInputWithToolbar from "./forum/textinputs/CustomInputWithToolbar";

export default function UpdatePost() {
   const { t } = useTranslation();
   const [file, setFile] = useState(null);
   const [imageUploadProgress, setImageUploadProgress] = useState(null);
   const [imageUploadError, setImageUploadError] = useState(null); 
   const [formData, setFormData] = useState({ title: '', category: 'uncategorized', content: '' });
   const [publishError, setPublishError] = useState(null);
   const navigate = useNavigate();
   const { postId } = useParams();
   const { currentUser } = useSelector((state) => state.user);
   const imageRef = useRef(formData.image);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchPost = async () => {
         try {
            console.log("Fetching post with ID:", postId);
            const res = await fetch(`${SERVER_URL}/api/post/getposts?postId=${postId}`, { signal });
            if (!res.ok) {
                  const errorData = await res.json();
                  console.log(errorData.message);
                  setPublishError(errorData.message);
                  return;
            }

            const data = await res.json();
            console.log("Fetched post data:", data);

            if (data.posts && data.posts.length > 0) {
                  const post = data.posts[0];
                  console.log("Fetched post object:", post);
                  setFormData({
                     ...post,
                     _id: post._id,
                     image: post.image || imageRef.current
                  });
            } else {
                  setPublishError("No post found.");
            }
         } catch (error) {
            if (error.name === "AbortError") {
                  console.log("Fetch aborted");
            } else {
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

   const handleUploadImage = async () => {
      try {
         if (!file) {
            setImageUploadError(t("posts:please_select_image"));
            return;
         }
         setImageUploadError(null);
         const storage = getStorage(app);
         const fileName = new Date().getTime() + "-" + file.name;
         const storageRef = ref(storage, fileName);
         const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on(
            'state_changed',
            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
               setImageUploadError(`Image upload failed: ${error.message}`);
               setImageUploadProgress(null);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setImageUploadProgress(null);
                  setImageUploadError(null);
                  setFormData({ ...formData, image: downloadURL });
               });
            }
         );
      } catch (error) {
         setImageUploadError(`Image upload failed: ${error.message}`);
         setImageUploadProgress(null);
         console.log(error);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form Data: ", formData);
      if (!formData._id) {
         setPublishError("Post ID is missing");
         return;
      }
      try {
         const token = localStorage.getItem('token');
         const res = await fetch(`${SERVER_URL}/api/post/updatepost/${formData._id}/${currentUser._id}`, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (!res.ok) {
            console.log("Update error:", data.message);
            setPublishError(data.message);
            return;
         }
         setPublishError(null);
         navigate(`/post/${data.slug}`);
      } catch (error) {
         setPublishError("Something went wrong: " + error.message);
         console.error("Submission error:", error);
      }
   };

   const handlePreviewClick = () => {
      navigate(`${languagePrefix}/preview-post`);
   };

   return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen mt-[60px] mb-20">
         <Helmet>
            <title>{t("posts:title_post")}</title>
         </Helmet>
         <h1 className="text-center text-3xl my-7 font-semibold">{t("posts:update_post")}</h1>
         <div className="text-center text-lg mx-12 mb-8">
            <p>{t("posts:update_instructions")}</p>
         </div>
         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
               <input
                  type="text"
                  placeholder={t("posts:title")}
                  required id="title"
                  className="border border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500"
                  onChange={(e) =>
                     setFormData({ ...formData, title: e.target.value })
                  }
                  value={formData.title}
               />
               <select
                  onChange={(e) => 
                     setFormData({ ...formData, category: e.target.value })
                  }
                  value={formData.category}
                  className="rounded-md border border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500"
               >
                  <option value="uncategorized">{t("posts:select_category")}</option>
                  <option value="android">AI</option>
                  <option value="android">Android</option>
                  <option value="database">Database</option>
                  <option value="javascript">JavaScript</option>
                  <option value="reactjs">React.js</option>
                  <option value="nextjs">Next.js</option>
                  <option value="unrealengine">Unreal Engine</option>
               </select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
               <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadImage}
                  disabled={imageUploadProgress}
               >
                  {imageUploadProgress ? (
                     <div className="w-16 h-16">
                        <CircularProgressbar
                           value={imageUploadProgress}
                           text={`${imageUploadProgress || 0}%`}
                        />
                     </div>
                  ) : (
                     t("posts:upload_image")
                  )}
               </Button>
            </div>
            <div>
               <label htmlFor="tags" className="text-sm font-medium">{t("posts:add_tags")}</label>
               <input
                  type="text"
                  id="tags"
                  className="mt-2 p-2 border border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500 "
                  placeholder={t("posts:tags_placeholder")}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  value={formData.tags}
               />
            </div>
            {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
            {formData.image && (
               <img
                  src={formData.image}
                  alt="upload"
                  className="w-full h-72 object-cover"
               />
            )}
            <div>
               <CustomInputWithToolbar
                  value={formData.content}
                  className="h-72 mb-12"
                  onChange={(value) => {
                     setFormData({ ...formData, content: value });
                  }} 
               />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
               {t("posts:update_post")}
            </Button>
            <Button 
               type="submit"
               gradientDuoTone="purpleToPink"
               className="text-xl px-6"
               onClick={handlePreviewClick}
            >
               {t("posts:create_post")}
            </Button>
            {publishError && (
               <Alert className="mt-5" color="failure">
                  {publishError}
               </Alert>
            )}
         </form>
      </div>
   );
}
