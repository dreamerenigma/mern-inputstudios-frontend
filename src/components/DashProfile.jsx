import { Alert } from "flowbite-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,  updateSuccess, updateFailure } from "../redux/user/userSlice";
import { Link } from 'react-router-dom';
import { IoCameraOutline } from 'react-icons/io5';
import ReCAPTCHA from 'react-google-recaptcha';
import ProfileInfo from './ProfileInfo'
import AccountInfo from './AccountInfo'
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";
import ProfileServices from "./ProfileServices";
import ReactDOM from 'react-dom';
import Tooltip from "./tooltips/Tooltip";

export default function DashProfile() {
   const { t } = useTranslation();
   const { currentUser, error } = useSelector((state) => state.user);
   const [imageFile, setImageFile] = useState(null);
   const [imageFileUrl, setImageFileUrl] = useState(null);
   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
   const [imageFileUploadError, setImageFileUploadError] = useState(null);
   const [imageFileUploading, setImageFileUploading] = useState(false);
   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
   const [updateUserError, setUpdateUserError] = useState(null);
   const [showModalEditName, setShowModalEditName] = useState(false);
   const [formData, setFormData] = useState({});
   const filePickerRef = useRef();
   const dispatch = useDispatch();
   const [showTooltip, setShowTooltip] = useState(false);
   const [tooltipText, setTooltipText] = useState('');
   const [hasChanges, setHasChanges] = useState(false);
   const [captchaValue, setCaptchaValue] = useState(null);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleSubmitWithImage = useCallback(async (imageUrl) => {
      const token = localStorage.getItem('token');
      console.log("Token being sent:", token);

      try {
         dispatch(updateStart());
         const res = await fetch(`${SERVER_URL}/api/user/update/${currentUser._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...formData, profilePicture: imageUrl }),
         });
         const data = await res.json();
         if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
         } else {
            dispatch(updateSuccess(data));
            setTooltipText("Изображение профиля обновлено");
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 5000);
         }
      } catch (error) {
         dispatch(updateFailure(error.message));
         setUpdateUserError(error.message);
      }
   }, [dispatch, SERVER_URL, currentUser._id, formData]);

   const uploadImage = useCallback(async () => {
      if (!imageFile) return;
   
      setImageFileUploading(true);
      setImageFileUploadError(null);
   
      const storage = getStorage(app);
      const fileName = `profile_image/${new Date().getTime()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
         },
         (error) => {
            setImageFileUploadError("Could not upload image (File must be less than 2MB),", error);
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUploading(false);
         },
         async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setImageFileUrl(downloadUrl);
            setFormData({ ...formData, profilePicture: downloadUrl });
            setImageFile(null);
            setImageFileUploadProgress(null);
            setImageFileUploading(false);
            await handleSubmitWithImage(downloadUrl);
         }
      );
   }, [formData, handleSubmitWithImage, imageFile]);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         setImageFileUrl(URL.createObjectURL(file));
      }
   };

   useEffect(() => {
      if (imageFile) {
         uploadImage();
      }
   }, [imageFile, uploadImage]);

   useEffect(() => {
      const savedModalState = localStorage.getItem('showModalEditName');
      if (savedModalState === 'true') {
         setShowModalEditName(true);
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
         setUpdateUserError("No changes made");
         return;
      }
      if (imageFileUploading) {
         setUpdateUserError("Please wait for image to upload");
         return;
      }
      try {
         dispatch(updateStart());
         const res = await fetch(`${SERVER_URL}/api/user/update/${currentUser._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
         } else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully");
         }
      } catch (error) {
         dispatch(updateFailure(error.message));
         setUpdateUserError(error.message);
      }
   };

   const handleShowModal = (state) => {
      setShowModalEditName(state);
      localStorage.setItem('showModalEditName', state);
   
      if (!state) {
         setHasChanges(false);
      }
   };

   const handleEditNameClick = () => {
      setShowModalEditName(true);
   };

   const handleCaptchaChange = (value) => {
      console.log("Captcha value:", value);
      setCaptchaValue(value);
   };

   const handleFirstNameChange = (e) => {
      const newFirstName = e.target.value;
      setFormData({
         ...formData,
         firstName: newFirstName
      });
      setHasChanges(newFirstName !== "" || formData.lastName !== "");
   };
   
   const handleLastNameChange = (e) => {
      const newLastName = e.target.value;
      setFormData({
         ...formData,
         lastName: newLastName
      });
      setHasChanges(formData.firstName !== "" || newLastName !== "");
   };

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)]">
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto px-4">
            <div className="flex justify-between items-center mb-7">
               <h1 className="font-semibold text-3xl">{t("profile:profile")}</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  hidden
               />
               <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center"> 
                  <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-700">
                     <div className="flex custom-flex-500 items-start">
                        <div
                           className="p-4 relative w-40 h-50 cursor-pointer overflow-hidden rounded-full"
                           onClick={() => filePickerRef.current.click()}
                        >
                           {imageFileUploadProgress > 0 && imageFileUploadProgress < 100 && (
                              <CircularProgressbar
                                 value={imageFileUploadProgress || 0}
                                 text={`${imageFileUploadProgress}%`}
                                 strokeWidth={5}
                                 styles={{
                                    root: {
                                       width: "100%",
                                       height: "100%",
                                       position: "absolute",
                                       top: 0,
                                       left: 0,
                                    },
                                    path: {
                                       stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                    },
                                 }}
                              />
                           )}
                           <div className="relative avatar-image w-32 h-32">
                              <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                                 <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full">
                                    <IoCameraOutline className="text-white text-[50px]" />
                                 </div>
                              </Link>
                              <img
                                 src={imageFileUrl || currentUser.profilePicture}
                                 alt="user"
                                 className={`rounded-full w-full h-full avatar-image object-cover border-4 border-[lightgray] ${
                                    imageFileUploadProgress &&
                                    imageFileUploadProgress < 100 &&
                                    "opacity-60"
                                 }`}
                              />
                           </div>
                        </div>
                        <div className="ml-5 flex flex-col p-4 max-w-[300px]">
                           <span className="text-base">
                              {t("profile:your_account_with_photo")}
                           </span>
                           <button
                              className="mt-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 max-w-[150px]"
                              onClick={() => filePickerRef.current.click()}
                           >
                              {t("profile:change_photo")}
                           </button>
                        </div>
                     </div>
                     <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                     <div className="flex flex-row items-center justify-between">
                        <p className="text-left px-4 mb-4 mr-4">{t("profile:full_name")}</p>
                        <p className="text-left mb-4 mr-64">{currentUser.username}</p>
                           <>
                           <p
                              className="text-right mb-4 mr-4 text-teal-500 hover:text-teal-700 cursor-pointer"
                              onClick={handleEditNameClick}
                           >
                              {t("profile:edit_name")}
                           </p>
                           {showModalEditName && (
                              <div 
                                 className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                 onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                       handleShowModal(false);
                                    }
                                 }}
                              >
                                 <div className="bg-white dark:bg-gray-800 border border-gray-700 rounded-lg w-full md:w-[450px] p-6 relative">
                                    <button
                                       className="absolute text-3xl top-4 right-4 text-gray-600 dark:text-gray-200 hover:translate-y-[-4px] transition-all"
                                       onClick={() => handleShowModal(false)}
                                    >
                                       <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600"/>
                                    </button>
                                    <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-bold text-gray-700 dark:text-gray-200">
                                       {t("profile:edit_name")}
                                    </p>
                                    <div className="text-left mb-5 mt-12">
                                       <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
                                          {t("profile:first_name")}
                                       </p>
                                       <input
                                          type="text"
                                          placeholder={t("profile:first_name")}
                                          className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
                                          autoComplete="off"
                                          value={formData.firstName || ''}
                                          onChange={handleFirstNameChange}
                                       />
                                    </div>
                                    <div className="text-left mb-5 mt-8">
                                       <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
                                          {t("profile:last_name")}
                                       </p>
                                       <input
                                          type="text"
                                          placeholder={t("profile:last_name")}
                                          className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
                                          autoComplete="off"
                                          value={formData.lastName || ''}
                                          onChange={handleLastNameChange}
                                       />
                                    </div>
                                    <div className="text-left mb-5 mt-6">
                                       <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
                                          {t("profile:captcha")}
                                       </p>
                                       <div className="mt-4">
                                          <ReCAPTCHA
                                             sitekey="6Lcn5uYpAAAAAM2rTG-jWtWRMeDoh6GT4xFcY0cS"
                                             onChange={handleCaptchaChange}
                                          />
                                       </div>
                                       {captchaValue && <p>{t("profile:captcha")}</p>}
                                       <input
                                          type="text"
                                          placeholder={t("profile:enter_characters_you_see")}
                                          className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
                                          autoComplete="off"
                                       />
                                    </div>
                                    <div className="text-center">
                                       <div className="flex justify-end gap-4">
                                          <button
                                             className={`px-4 py-2 rounded-md border ${
                                                hasChanges
                                                   ? 'bg-transparent text-white hover:bg-gray-700 cursor-pointer border-gray-600'
                                                   : 'bg-transparent text-gray-600 border-gray-600'
                                             }`}
                                             onClick={() => handleShowModal(false)}
                                             disabled={!hasChanges}
                                          >
                                             {t("profile:save")}
                                          </button>
                                          <button
                                             onClick={() => handleShowModal(false)}
                                             className="border border-gray-600 bg-transparent text-white py-2 px-4 rounded-md hover:bg-gray-700"
                                          >
                                             {t("profile:cancel")}
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )}
                        </>
                     </div>
                  </div>
               </div>
               {showTooltip && ReactDOM.createPortal(<Tooltip showTooltip={showTooltip} text={tooltipText} />, document.body)}
               {imageFileUploadError && (
                  <Alert color="failure">{imageFileUploadError}</Alert>
               )}
               <ProfileInfo />
               <AccountInfo />
               <ProfileServices />
            </form>
            {updateUserSuccess && (
               <Alert color="success" className="mt-5">
                  {updateUserSuccess}
               </Alert>
            )}
            {updateUserError && (
               <Alert color="failure" className="mt-5">
                  {updateUserError}
               </Alert>
            )}
            {error && (
               <Alert color="failure" className="mt-5">
                  {error}
               </Alert>
            )}
         </div>
      </div>
   );
}
