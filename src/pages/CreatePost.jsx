import { Alert, Button, FileInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useSelector } from 'react-redux'; 
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import CustomInputWithToolbar from "./forum/textinputs/CustomInputWithToolbar";
import { FaRegCheckSquare } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { MdOutlineImageNotSupported } from "react-icons/md";
import CustomSelect from "../components/selects/CustomSelect";

export default function CreatePost() {
   const { t } = useTranslation();
   const [file, setFile] = useState(null);
   const [fileUploadProgress, setFileUploadProgress] = useState(null);
   const [fileUploadError, setFileUploadError] = useState(null); 
   const [formData, setFormData] = useState({
      title: '',
      category: t("posts:uncategorized"),
      content: '',
      tags: '',
      image: null,
      video: null,
   });
   const [publishError, setPublishError] = useState(null);
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [isFormValid, setIsFormValid] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const validateForm = (formData) => {
      const { title, category, content } = formData;
      return (
         title.trim().length > 0 || (category?.toString().trim().length > 0) || content.trim().length > 0
      );
   };

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

   useEffect(() => {
      setIsFormValid(validateForm(formData));
   }, [formData]);

   const handleCategoryChange = (category) => {
      const selectedCategory = category || t("posts:uncategorized");
      setFormData((prevData) => ({ ...prevData, category: selectedCategory }));
   };

   const handleContentChange = (value) => {
      setFormData((prevData) => ({ ...prevData, content: value }));
   };
   
   return (
      <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen mt-[60px]">
         <Helmet>
            <title>{t("posts:title_create_post")}</title>
         </Helmet>
         <div className="flex gap-4 justify-center">
            {/* Левая колонка */}
            <div className="w-[1200px] flex flex-col max-w-[780px] responsive-container">
               <div className="flex border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 py-5 rounded-lg shadow-md mb-3">
                  <h1 className="text-center mx-4 text-2xl font-semibold">{t("posts:create_post")}</h1>
               </div>
               <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 sm:flex-row justify-between">
                     <input
                        type="text"
                        placeholder={t("posts:title")}
                        required id="title"
                        className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 rounded-md focus:outline-teal-500 focus:ring-0 focus:border-transparent dark:focus:border-transparent"
                        onChange={(e) =>
                           setFormData({ ...formData, title: e.target.value })
                        }
                     />
                     <CustomSelect setFormData={handleCategoryChange} formData={formData} t={t} />
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
                        className="mt-2 p-2 border border-gray-700 rounded-md w-full bg-white dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-teal-500 "
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
                        onChange={handleContentChange}
                     />
                  </div>
                  <Button 
                     type="submit" 
                     gradientDuoTone="purpleToPink"
                     disabled={!isFormValid}
                     className={` ${!isFormValid ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                     {t("posts:publish")}
                  </Button>
                  {publishError && (
                     <Alert className="mt-5" color="failure">
                        {publishError}
                     </Alert>
                  )}
               </form>
               {/* Нижний контент */}
            </div>
            {/* Правая колонка */}
            <div className="custom-hide flex flex-col w-[350px]">
               <div className="border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 rounded-md shadow-lg">
                  <p className="mb-3 px-4 pt-2">ПАМЯТКА АВТОРУ</p>
                  <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
                  <div className="px-4 py-2">
                     <div className="flex items-center">
                        <FaRegCheckSquare size={32}/>
                        <p className="mx-4">Соблюдайте{" "}
                           <Link to={`${languagePrefix}/docs/help/rules`} className="text-teal-500">правила сайта</Link>
                        </p>
                     </div>
                     <div className="flex items-center my-4">
                        <BsFillPostcardFill size={46}/>
                        <p className="mx-4">Следуйте{" "}
                           <Link to={`${languagePrefix}/docs/companies/design`} className="text-teal-500">советам{" "}</Link>
                           и заботливо оформляйте публикации
                        </p>
                     </div>
                     <div className="flex items-center my-4">
                        <MdOutlineImageNotSupported className="text-8xl"/>
                        <p className="mx-4">
                           Загружайте картинки меньше 8МБ для тела публикации и меньше 1МБ для обложки публикации
                        </p>
                     </div>
                  </div>
               </div>
               <div className="border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 rounded-md shadow-lg mt-4">
                  <h2 className="mb-4 px-4 pt-2">О МОДЕРАЦИИ</h2>
                  <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />
                  <div className="px-4 py-2 mb-6">
                     <div>
                        <p>Точно не пройдут модерацию:</p>
                        <ul className="mt-4 pl-2">
                           <li>— новости, анонсы и пресс-релизы;</li>
                           <li>— материалы рекламного характера;</li>
                           <li>
                              — вопросы (используйте <a href="https://example.com" className="text-teal-500 hover:underline">Input Studios Q&A</a>);
                           </li>
                           <li>— просьбы о помощи в решении задач (используйте форум);</li>
                           <li>— жалобы на компании и предоставляемые услуги;</li>
                           <li>— куски программного кода без подробных пояснений;</li>
                           <li>— публикации, ранее опубликованные на других сайтах;</li>
                           <li>— односложные материалы (пара абзацев или видеоролик);</li>
                           <li>— статьи, слабо относящиеся к IT-тематике или не относящиеся к ней вовсе;</li>
                           <li>
                              — публикации, нарушающие <a href="https://example.com" className="text-teal-500 hover:underline">правила сайта</a>.
                           </li>
                        </ul>
                        <p className="py-5">С большой вероятностью не пройдут модерацию (или будут отправлены на доработку):</p>
                        <ul className="pl-2">
                           <li>— материалы с низким (менее 75%) показателем уникального текста;</li>
                           <li>— публикации без правильно расставленных знаков препинания, со смайликами, с обилием восклицательных знаков, неоправданным выделением слов и предложений;</li>
                           <li>
                              — плохо оформленные публикации (<a href="https://example.com" className="text-teal-500 hover:underline">подробнее</a>).
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
