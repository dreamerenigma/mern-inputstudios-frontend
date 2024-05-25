import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsDribbble, BsYoutube } from "react-icons/bs";
import { SlSocialVkontakte } from 'react-icons/sl';
import { BiLogoFigma } from 'react-icons/bi';
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../redux/language/languageSlice";

export default function FooterCom({ languages }) {
   const dispatch = useDispatch();
   const { currentLanguage } = useSelector((state) => state.language);

   const handleLanguageChange = (newLanguage) => {
      dispatch(changeLanguage(newLanguage));
   };

   return (
      <Footer container className="border border-t-8 border-teal-500" id="footer">
         <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
               <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-4 sm:gap-6">
                  <div>
                     <Footer.Title title="What's new" />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="https://100jsprojects.ru"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Input Studios Sam
                        </Footer.Link>
                        <Footer.Link
                           href="/about"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Input Studios Workspace
                        </Footer.Link>
                        <Footer.Link
                           href="/about"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Input Studios apps
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title="Projects" />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="https://github.com/inputstudios"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Input Studios Cloud
                        </Footer.Link>
                        <Footer.Link
                           href="https://discord.gg/eX8vTpbv34"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Weather API
                        </Footer.Link>
                        <Footer.Link
                           href="https://discord.gg/eX8vTpbv34"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           E-commerce apps
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title="Business" />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="https://100jsprojects.ru"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Input Studios Security
                        </Footer.Link>
                        <Footer.Link
                           href="/about"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Dialog Chat
                        </Footer.Link>
                        <Footer.Link
                           href="/about"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           Small Business
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title="Company" />
                     <Footer.LinkGroup col>
                        <Footer.Link href="/privacy" >
                           Company news
                        </Footer.Link>
                        <Footer.Link href="/terms-of-use">
                           Privacy at Input Studios
                        </Footer.Link>
                        <Footer.Link href="/terms-of-use">
                           Investors
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
               </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
               <div className="flex items-center">
                  <div className="relative">
                     <Switch
                        className="relative"
                        checked={currentLanguage === 'en'}
                        onChange={(event) => handleLanguageChange(event.target.checked ? 'en' : 'ru')}
                        sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                           '& .flag-image': {
                              backgroundImage: 'url(https://i.ibb.co/LtPNm0n/US.png)',
                           },
                        },
                        '& .MuiSwitch-switchBase': {
                           '& .flag-image': {
                              backgroundImage: 'url(https://i.ibb.co/489wXn1/RU.png)',
                           },
                        },
                        }}
                     />
                  </div>
                  <span className="flag-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full overflow-hidden"></span>
                  <span className="w-16 text-center">
                     {currentLanguage === 'en' ? 'English' : 'Русский'}
                  </span>
               </div>
               <div className="flex flex-wrap gap-6 sm:mt-0 mt-4 sm:justify-center text-xs">
                  <Link to="/contacts" className="dark:text-gray-400 hover:underline">Contact us Input Studios</Link>
                  <Link to="/privacy" className="dark:text-gray-400 hover:underline">Privacy</Link>
                  <Link to="/terms-of-use" className="dark:text-gray-400 hover:underline">Terms of use</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">Trademarks</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">About our ads</Link>
                  <Footer.Copyright
                     className="text-xs text-black"
                     href="#"
                     by="Input Studios"
                     year={new Date().getFullYear()}
                  />
               </div>
            </div>
         </div>
      </Footer>
   );
}
