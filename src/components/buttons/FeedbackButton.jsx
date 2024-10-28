import { useState, useEffect, useCallback } from 'react';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { IoIosStarOutline } from 'react-icons/io';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { Modal, Button, Textarea } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function FeedbackButton() {
   const { t } = useTranslation();
   const [showButton, setShowButton] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);
   const location = useLocation();
   const [showModal, setShowModal] = useState(false);
   const [text, setText] = useState('');
   const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);
   const maxLength = 500;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleScroll = useCallback(() => {
      if (window.scrollY < lastScrollY) {
         setShowButton(true);
      } else {
         setShowButton(false);
      }
      setLastScrollY(window.scrollY);
   }, [lastScrollY]);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [handleScroll, lastScrollY]);

   if (location.pathname !== "/dashboard") {
      return null;
   }

   const handleStarClick = (index) => {
      const newSelectedStars = selectedStars.map((star, i) => (i <= index ? true : false));
      setSelectedStars(newSelectedStars);
   };

   const handleChange = (e) => {
      setText(e.target.value);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setText('');
      setSelectedStars([false, false, false, false, false]);
   };

   const isSubmitDisabled = !text && !selectedStars.some(star => star);

   return (
      <div>
         {showButton && (
            <button
               className="fixed bottom-0 right-10 p-2 bg-teal-500 text-white rounded shadow-lg flex items-center space-x-2 hover:bg-teal-700"
               onClick={() => setShowModal(true)}
            >
               <BiMessageRoundedDetail className="text-lg" />
               <span>Feedback</span>
            </button>
         )}
         <Modal 
            show={showModal} 
            onClose={handleCloseModal} 
            popup 
            size="lg"
         >
            <Modal.Header />
            <Modal.Body>
               <div className="text-left mb-5 mt-6">
                  <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-bold text-gray-700 dark:text-gray-200">Edit name</p>
                  <div className="mt-4">
                  <p className="text-sm font-semibold">How satisfied are you with your experience today?</p>
                  <div className="flex items-center pt-2">
                     {selectedStars.map((selected, index) => (
                        <div
                        key={index}
                        className="text-gray-500 hover:text-teal-500 transition-colors cursor-pointer"
                        onClick={() => handleStarClick(index)}
                        >
                        {selected ? <MdOutlineStarPurple500 size={28} /> : <IoIosStarOutline size={28} />}
                        </div>
                     ))}
                  </div>
                  </div>
               </div>
               <div>
                  <p className="text-sm font-semibold mt-8">What can we do to make things better?</p>
                  <Textarea
                     placeholder="Don't include personal info, such as your name, phone number, or email address."
                     rows="3"
                     maxLength={maxLength}
                     value={text}
                     onChange={handleChange}
                  />
                  <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-xs">
                     {text.length}/{maxLength} maximum characters
                  </p>
                  </div>
               </div>
               <p className="text-sm mt-5">To protect your privacy, don&apos;t include your contact info.</p>
               <Link to={`${languagePrefix}/privacystatementprivacy/`} className="text-sm text-teal-500 block hover:underline hover:text-teal-700">
                  Privacy and Cookie
               </Link>
               <p className="text-sm pt-4">Need help? <a href="/contactus" className="text-teal-500 hover:underline hover:text-teal-700">Contact us</a></p>
               <div className="text-center mt-10">
                  <div className="flex justify-end gap-4">
                  <Button
                     style={{ backgroundColor: isSubmitDisabled ? "gray" : "#0891B2" }}
                     disabled={isSubmitDisabled}
                  >
                     Submit
                  </Button>
                  <Button color="gray" onClick={handleCloseModal}>
                     Cancel
                  </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
}
