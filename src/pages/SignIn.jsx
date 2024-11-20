import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import PasswordTextInput from "./../components/textinputs/PasswordTextInput";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaSquareGithub } from "react-icons/fa6";
import { IMVk } from '@icongo/im';
import { FaYandex } from "react-icons/fa";

export default function SignIn() {
   const { t } = useTranslation();
   const [formData, setFormData] = useState({});
   const { loading, error: errorMessage } = useSelector(state => state.user);
   const dispatch = useDispatch();
   const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
         return dispatch(signInFailure(t("auth:please_fill_all_fields")));
      }
      try {
         dispatch(signInStart());
         const res = await fetch(`${SERVER_URL}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (data.success === false) {
            dispatch(signInFailure(data.message));
         }
         if (res.ok) {
            dispatch(signInSuccess(data));
            navigate("/");
         }
      } catch (error) {
         dispatch(signInFailure(error.message));
      }
   };
   
   return (
      <div className="min-h-screen flex flex-col justify-between">
         <Helmet>
            <title>{t("auth:sign_in_title")}</title>
         </Helmet>
         <div className="flex-grow flex justify-center items-center">
            <div className="mx-4 w-full p-6 max-w-full md:max-w-3xl flex flex-col md:flex-row items-center gap-5 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-dialog border-gray-700">
               <div className="flex-1 text-center text-center-md text-left-lg mt-4">
                  <Link to="/" className="font-bold dark:text-white text-4xl">
                     <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
                        Input Studios
                     </span>
                  </Link>
                  <p className="text-sm mt-5">
                     {t("auth:sign_in_account")}
                  </p>
               </div>
               <div className="flex-1 w-full">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                     <div>
                        <Label value={t("auth:your_email")} />
                        <TextInput
                           type="email"
                           placeholder="name@company.ru"
                           id="email"
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <Label value={t("auth:your_password")} />
                        <PasswordTextInput
                           isPassword={true}
                           type="password"
                           placeholder="**********"
                           id="password"
                           value={formData.password || ""}
                           onChange={handleChange}
                        />
                     </div>
                     <Button
                        gradientDuoTone="purpleToPink"
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-300"
                     >
                        {loading ? (
                           <>
                              <Spinner size="sm" />
                              <span className="pl-3">{t("auth:loading")}</span>
                           </>
                        ) : (
                           t("auth:sign_in")
                        )}
                     </Button>
                     <OAuth />
                     <div>
                        <p className="text-base">{t("auth:or_sign_in_other_services")}</p>
                        <div className="flex gap-2 mt-2">
                           <FaSquareGithub 
                              className="text-5xl text-gray-600 hover:text-black transition-colors duration-300 ease-in-out" 
                           />
                           <IMVk
                              style={{
                                 borderRadius: '6px',
                                 fill: isHovered ? '#3b82f6' : '#4b5563',
                                 fontSize: '42px',
                                 marginTop: '3px',
                                 transition: 'fill 0.3s ease',
                              }}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                           />
                           <div 
                              className="bg-gray-600 hover:bg-red-600 w-[42px] h-[42px] mt-[3px] rounded-md inline-flex items-center justify-center  transition-colors duration-300 ease-in-out"
                           >
                              <FaYandex className="text-2xl text-gray-800" />
                           </div>
                        </div>
                     </div>
                  </form>
                  <div className="flex gap-2 text-sm mt-5">
                     <span>{t("auth:dont_have_an_account")}</span>
                     <Link to={`${languagePrefix}/sign-up`} className="text-teal-500">
                        {t("auth:sign_in_sign_up")}
                     </Link>
                  </div>
                  {errorMessage && (
                     <Alert className="mt-5" color="failure">
                        {errorMessage}
                     </Alert>
                  )}
               </div>
            </div>
         </div>
         <div className="mt-4 w-full flex justify-end px-4 pb-2 text-sm">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
               <Link to={`${languagePrefix}/terms-of-use`} className="underline text-teal-500 hover:text-teal-700">{t("auth:terms_of_use")}</Link>
               <Link to={`${languagePrefix}/privacy`} className="underline text-teal-500 hover:text-teal-70">{t("auth:privacy_and_cookies")}</Link>
               <Link to={`${languagePrefix}/help`} className="underline text-teal-500 hover:text-teal-700">{t("auth:help")}</Link>
            </div>
         </div>
      </div>
   );
}
