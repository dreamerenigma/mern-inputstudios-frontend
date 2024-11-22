import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useSelector } from 'react-redux'; 
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import CustomInputWithToolbar from "./forum/textinputs/CustomInputWithToolbar";

export default function CreatePost() {
   const { t } = useTranslation();
   const [file, setFile] = useState(null);
   const [fileUploadProgress, setFileUploadProgress] = useState(null);
   const [fileUploadError, setFileUploadError] = useState(null); 
   const [formData, setFormData] = useState({ content: "" });
   const [publishError, setPublishError] = useState(null);
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleUploadFile = async () => {
      try {
         if (!file) {
            setFileUploadError('Please select a file');
            return;
         }
         setFileUploadError(null);
         const storage = getStorage(app);
         const fileName = `post-images/${new Date().getTime()}-${file.name}`;
         const storageRef = ref(storage, fileName);
         const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on(
            'state_changed',
            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               setFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
               setFileUploadError(`File upload failed: ${error.message || error.code}`);
               setFileUploadProgress(null);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setFileUploadProgress(null);
                  setFileUploadError(null);
                  if (file.type.includes('video')) {
                     setFormData({ ...formData, video: downloadURL, previewImage: downloadURL });
                  } else {
                     setFormData({ ...formData, image: downloadURL });
                  }
               });
            }
         );

      } catch (error) {
         setFileUploadError("File upload failed");
         setFileUploadProgress(null);
         console.log(error);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token');
      console.log("Token being sent:", token);

      try {
         const res = await fetch(`${SERVER_URL}/api/post/create`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (!res.ok) {
            setPublishError(data.message);
            return;
         }
         if (res.ok) {
            setPublishError(null);
            navigate(`${languagePrefix}/post/${data.slug}`);
         }
      } catch {
         setPublishError("Something went wrong");
      }
   };

   const getFileName = (url) => {
      const lastSlashIndex = url.lastIndexOf('/');
      return url.substring(lastSlashIndex + 1);
   };

   const handlePreviewClick = () => {
      navigate(`${languagePrefix}/preview-post`);
   };

   return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen mt-[60px] mb-20">
         <Helmet>
            <title>{t("posts:title_create_post")}</title>
         </Helmet>
         <h1 className="text-center text-3xl my-7 font-semibold">{t("posts:create_post")}</h1>
         <div className="text-center text-lg mx-12 mb-8">
            <p>{t("posts:update_instructions")}</p>
         </div>
         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
               <TextInput
                  type="text"
                  placeholder={t("posts:title")}
                  required id="title"
                  className="flex-1"
                  onChange={(e) =>
                     setFormData({ ...formData, title: e.target.value })
                  }
               />
               <Select
                  onChange={(e) => 
                     setFormData({ ...formData, category: e.target.value })
                  }
               >
                  <option value="uncategorized">{t("posts:select_category")}</option>
                  <option value="ai">AI</option>
                  <option value="android">Android</option>
                  <option value="cosmos">Cosmos</option>
                  <option value="database">Database</option>
                  <option value="gamedev">Game Development</option>
                  <option value="javascript">JavaScript</option>
                  <option value="nextjs">Next.js</option>
                  <option value="reactjs">React.js</option>
                  <option value="science">Science</option>
                  <option value="unrealengine">Unreal Engine</option>
               </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
               <FileInput
                  type="file"
                  accept="image/*, video/*"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadFile}
                  disabled={fileUploadProgress}
               >
                  {fileUploadProgress ? (
                     <div className="w-16 h-16">
                        <CircularProgressbar
                           value={fileUploadProgress}
                           text={`${fileUploadProgress || 0}%`}
                        />
                     </div>
                  ) : (
                     t("posts:upload_image")
                  )}
               </Button>
            </div>
            {fileUploadError && <Alert color="failure">{fileUploadError}</Alert>}
            {formData.image && (
               <div className="w-full h-72 mb-4">
                  <img
                     src={formData.image}
                     alt="upload"
                     className="w-full h-full object-cover"
                  />
               </div>
            )}
            <div>
               <label htmlFor="tags" className="text-sm font-medium">{t("posts:add_tags")}</label>
               <input
                  type="text"
                  id="tags"
                  className="mt-2 p-2 border border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500 "
                  placeholder={t("posts:tags_placeholder")}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  value={formData.tags}
                  autoComplete="off"
               />
            </div>
            {formData.video && (
               <div className="w-full h-72 mb-4">
                  <VideoPlayer
                     src={formData.video}
                     alt={getFileName(formData.video)}
                     previewImage={formData.previewImage}
                  />
               </div>
            )}
            <div>
               <CustomInputWithToolbar
                  value={formData.content || ''}
                  className="h-72 mb-12"
                  onChange={(value) => {
                     setFormData({ ...formData, content: value });
                  }} 
               />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
               {t("posts:publish")}
            </Button>
            <Button 
               type="submit"
               gradientDuoTone="purpleToPink"
               className="rounded-tl-xl rounded-lg bg-gradient-to-l border-none from-teal-500 via-green-500 to-blue-500 hover:bg-gradient-to-l hover:from-blue-500 hover:via-green-500 hover:to-teal-700 transition-colors duration-300"
               onClick={handlePreviewClick}
            >
               {t("posts:show_post_preview")}
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
