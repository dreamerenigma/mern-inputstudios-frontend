import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
   updateStart,
   updateSuccess,
   updateFailure,
} from "../redux/user/userSlice";
import { Link } from 'react-router-dom';
import { IoCameraOutline, IoKeyOutline } from 'react-icons/io5';
import ReCAPTCHA from 'react-google-recaptcha';
import ProfileInfo from './ProfileInfo'
import AccountInfo from './AccountInfo'

export default function DashProfile() {
   const { currentUser, error, loading } = useSelector((state) => state.user);
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
   const [captchaValue, setCaptchaValue] = useState(null);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

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
   }, [imageFile]);

   useEffect(() => {
      const savedModalState = localStorage.getItem('showModalEditName');
      if (savedModalState === 'true') {
         setShowModalEditName(true);
      }
   }, []);

   const uploadImage = async () => {
      // service firebase.storage {
      //    match /b/{bucket}/o {
      //       match /{allPaths=**} {
      //          allow read;
      //          allow write: if
      //          request.resource.size < 2 * 1024 * 1024 &&
      //          request.resource.contentType.matches("image/.*")
      //       }
      //    }
      // }
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
         },
         (error) => {
            setImageFileUploadError(
               "Could not upload image (File must be less than 2MB)"
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
               setImageFileUrl(downloadUrl);
               setFormData({ ...formData, profilePicture: downloadUrl });
               setImageFileUploading(false);
            });
         }
      );
   };

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
   };

   const handleEditNameClick = () => {
      setShowModalEditName(true);
   };

   const handleCaptchaChange = (value) => {
      console.log("Captcha value:", value);
      setCaptchaValue(value);
   };  

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto px-4">
            <div className="flex justify-between items-center my-7">
               <h1 className="font-semibold text-3xl">Profile</h1>
               <Link
                  to="/password/change"
                  className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white group"
               >
                  <div className="flex items-center gap-2">
                     <div className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 w-10 h-10 group-hover:bg-teal-500 transition-colors duration-200">
                        <IoKeyOutline className="text-center font-semibold text-2xl group-hover:text-white dark:group-hover:text-gray-300"/>
                     </div>
                     <span className="text-sm font-semibold group-hover:text-teal-500 transition-colors duration-200">
                        Change password
                     </span>
                  </div>
               </Link>
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
                  <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
                     <div className="flex items-center">
                        <div
                           className="p-4 relative w-40 h-50 cursor-pointer overflow-hidden rounded-full"
                           onClick={() => filePickerRef.current.click()}
                        >
                           {imageFileUploadProgress && (
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
                                       stroke: `rgba(62, 152, 199, ${
                                          imageFileUploadProgress / 100
                                       })`,
                                    },
                                 }}
                              />
                           )}
                           <div className="relative w-32 h-32">
                              <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                                 <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full">
                                    <IoCameraOutline className="text-white text-[50px]" />
                                 </div>
                              </Link>
                              <img
                                 src={imageFileUrl || currentUser.profilePicture}
                                 alt="user"
                                 className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
                                    imageFileUploadProgress &&
                                    imageFileUploadProgress < 100 &&
                                    "opacity-60"
                                 }`}
                              />
                           </div>
                        </div>
                        <div className="ml-5 flex flex-col p-4">
                           <span>
                              Personalize your account with a photo. <br />
                              Your profile photo will appear on apps <br />
                              and devices that use your Input Studios <br />
                              account.
                           </span>
                           <button
                              className="mt-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 max-w-[150px]"
                              onClick={() => filePickerRef.current.click()}
                           >
                              Change photo
                           </button>
                        </div>
                     </div>
                     <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                     <div className="flex flex-row items-center justify-between">
                        <p className="text-left px-4 mb-4 mr-4">Full name</p>
                        <p className="text-left mb-4 mr-20">{currentUser.username}</p>
                        <>
                           <p className="text-right mb-4 mr-4 text-teal-500 hover:text-teal-700 cursor-pointer" onClick={handleEditNameClick}>Edit name</p>
                           <Modal
                              show={showModalEditName}
                              onClose={() => handleShowModal(false)}
                              popup
                              size="md"
                              >
                              <Modal.Header />
                              <Modal.Body>
                                 <div className="text-left mb-5 mt-6">
                                    <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-bold text-gray-700 dark:text-gray-200">Edit name</p>
                                    <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">First name</p>
                                    <input type="text" placeholder="First name" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mt-1" />
                                 </div>
                                 <div className="text-left mb-5 mt-8">
                                    <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">Last name</p>
                                    <input type="text" placeholder="Last name" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mt-1" />
                                 </div>
                                 <div className="text-left mb-5 mt-6">
                                    <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">Captcha</p>
                                    <div className="mt-4">
                                    <ReCAPTCHA
                                       sitekey="6Lcn5uYpAAAAAM2rTG-jWtWRMeDoh6GT4xFcY0cS"
                                       onChange={handleCaptchaChange}
                                    />
                                    </div>
                                    {captchaValue && <p>Captcha verified!</p>}
                                    <input 
                                       type="text" 
                                       placeholder="Enter the characters you see" 
                                       className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mt-1" 
                                    />
                                 </div>
                                 <div className="text-center">
                                    <div className="flex justify-end gap-4">
                                       <Button color="gray" onClick={() => handleShowModal(false)}>
                                          Save
                                       </Button>
                                       <Button color="gray" onClick={() => handleShowModal(false)}>
                                          Cancel
                                       </Button>
                                    </div>
                                 </div>
                              </Modal.Body>
                           </Modal>
                        </>
                     </div>
                  </div>
               </div>
               {imageFileUploadError && (
                  <Alert color="failure">{imageFileUploadError}</Alert>
               )}
               <ProfileInfo />
               <AccountInfo />
               {/* <Button
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  outline
                  disabled={loading || imageFileUploading}
                  className="w-full md:w-1/2 mx-auto max-w-lg"
               >
                  {loading ? "Loading..." : "Update"} 
               </Button>
               {currentUser.isAdmin && (
                  <Link to={"/create-post"}>
                     <Button
                        type="button"
                        gradientDuoTone="purpleToPink"
                        className="w-full md:w-1/2 mx-auto max-w-lg"
                     >
                        Create a post
                     </Button>
                  </Link>
               )} */}
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
