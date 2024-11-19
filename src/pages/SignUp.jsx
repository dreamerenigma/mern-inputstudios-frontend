import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";
import PasswordTextInput from "./../components/textinputs/PasswordTextInput";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function SignUp() {
   const { t } = useTranslation();
   const [formData, setFormData] = useState({});
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.username || !formData.email || !formData.password) {
         return setErrorMessage("Please fill out all fields.");
      }

      const token = localStorage.getItem('token');
      console.log("Token being sent:", token);

      try {
         setLoading(true);
         setErrorMessage(null);
         const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
            method: "POST",
            headers: { 
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (data.success === false) {
            return setErrorMessage(data.message);
         }
         setLoading(false);
         if (res.ok) {
            navigate(`${languagePrefix}/sign-in`);
         }
      } catch (error) {
         setErrorMessage(error.message);
         setLoading(false);
      }
   };
   
   return (
      <div className="min-h-screen flex flex-col justify-between">
         <Helmet>
            <title>{t("sign_up_title")}</title>
         </Helmet>
         <div className="flex-grow flex justify-center items-center">
            <div className="w-full p-6 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center gap-5 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-dialog border-gray-700">
               <div className="flex-1 text-center md:text-left mt-6">
                  <Link to="/" className="font-bold dark:text-white text-4xl">
                     <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
                        Input Studios
                     </span>
                  </Link>
                  <p className="text-sm mt-5">
                     {t("sign_up_account")}
                  </p>
               </div>
               <div className="flex-1">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                     <div>
                        <Label value={t("your_username")} />
                        <TextInput
                           type="text"
                           placeholder={t("username")}
                           id="username"
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <Label value={t("your_email")} />
                        <TextInput
                           type="email"
                           placeholder="name@company.ru"
                           id="email"
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <Label value={t("your_password")} />
                        <PasswordTextInput
                           isPassword={true}
                           type="password"
                           placeholder="**********"
                           id="password"
                           value={formData.password || ""}
                           onChange={handleChange}
                        />
                     </div>
                     <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                        {loading ? (
                           <>
                              <Spinner size="sm" />
                              <span className="pl-3">{t("loading")}</span>
                           </>
                        ) : (
                           t("sign_up")
                        )}
                     </Button>
                     <OAuth />
                  </form>
                  <div className="flex gap-2 text-sm mt-5">
                     <span>{t("have_an_account")}</span>
                     <Link to={`${languagePrefix}/sign-in`} className="text-teal-500">
                        {t("sign_up_sign_in")}
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
         <div className="mt-4 w-full flex justify-end px-4 text-sm">
            <div className="flex space-x-4">
               <Link to={`${languagePrefix}/terms-of-use`} className="underline text-teal-500 hover:text-teal-700">Условия использования</Link>
               <Link to={`${languagePrefix}/privacy`} className="underline text-teal-500 hover:text-teal-700">Конфиденциальность и cookie</Link>
               <Link to={`${languagePrefix}/help`} className="underline text-teal-500 hover:text-teal-700">Справка</Link>
            </div>
         </div>
      </div>
   );
}
