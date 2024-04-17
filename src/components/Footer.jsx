import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsDribbble, BsYoutube } from "react-icons/bs";
import { SlSocialVkontakte } from 'react-icons/sl';
import { BiLogoFigma } from 'react-icons/bi';

export default function FooterCom() {
   return (
      <Footer container className="border border-t-8 border-teal-500">
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
               <Footer.Copyright
                  className="text-xs"
                  href="#"
                  by="Input Studios"
                  year={new Date().getFullYear()}
               />
               <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center text-xs">
                  <Link to="/contacts" className="dark:text-gray-400 hover:underline">Contact us Input Studios</Link>
                  <Link to="/privacy" className="dark:text-gray-400 hover:underline">Privacy</Link>
                  <Link to="/terms-of-use" className="dark:text-gray-400 hover:underline">Terms of use</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">Trademarks</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">About our ads</Link>
               </div>
            </div>
         </div>
      </Footer>
   );
}
