import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OAuth() {
   const { t } = useTranslation();
   const auth = getAuth(app)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: "select_account" })
      try {
         const resultsFromGoogle = await signInWithPopup(auth, provider)
         const res = await fetch(`${SERVER_URL}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               name: resultsFromGoogle.user.displayName,
               email: resultsFromGoogle.user.email,
               googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
         })
         const data = await res.json()
         console.log("Response data:", data);
         if (res.ok) {
            localStorage.setItem('token', data.token);
            console.log("Token stored in localStorage:", localStorage.getItem('token'));
            dispatch(signInSuccess(data))
            navigate("/")
         }
      } catch (error) {
         console.log(error);
      }
   } 
   return (
      <Button type="button" className="bg-gradient-to-r from-teal-500  to-blue-500" outline onClick={handleGoogleClick}>
         <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
         {t("auth:continue_with_google")}
      </Button>
   );
}
