import { useEffect, useRef, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import { BsSoundwave } from "react-icons/bs";

export default function VideoPlayerSettingsPopupMenu({ onClose }) {
   const menuRef = useRef(null);
   const [showQualityOptions, setShowQualityOptions] = useState(false);
   const [showSpeedOptions, setShowSpeedOptions] = useState(false);
   const [isVolumeConstant, setIsVolumeConstant] = useState(() => {
      const savedState = localStorage.getItem("volumeConstant");
      return savedState ? JSON.parse(savedState) : false;
   });
   const [selectedQuality, setSelectedQuality] = useState(() => {
      const savedQuality = localStorage.getItem("selectedQuality");
      return savedQuality || "1080p";
   });
   const [selectedPlaybackSpeed, setPlaybackSpeed] = useState(() => {
      const savedSpeed = localStorage.getItem("selectedPlaybackSpeed");
      return savedSpeed || "Обычная";
   });

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [onClose]);

   const handleOption3Click = (event) => {
      event.stopPropagation();
      setShowQualityOptions(true);
   };

   const handlePaybackSpeedClick = (event) => {
      event.stopPropagation();
      setShowSpeedOptions(!showSpeedOptions);
   };

   const handleBackClick = (event) => {
      event.stopPropagation();
      setShowQualityOptions(false);
      setShowSpeedOptions(false);
   };

   const handleSwitchChange = () => {
      const newState = !isVolumeConstant;
      setIsVolumeConstant(newState);
      localStorage.setItem("volumeConstant", JSON.stringify(newState));
   };

   const handleQualitySelect = (quality) => {
      setSelectedQuality(quality);
      localStorage.setItem("selectedQuality", quality);
      setShowQualityOptions(false);
   };

   const handleSpeedSelect = (speed) => {
      setPlaybackSpeed(speed);
      localStorage.setItem("selectedPlaybackSpeed", speed);
      setShowSpeedOptions(false);
   };

   return (
      <div 
         ref={menuRef}
         className={`absolute bg-gray-300/80 dark:bg-gray-800/80 py-2 rounded-lg shadow-md right-[-65px] bottom-[54px] 
            ${showQualityOptions || showSpeedOptions ? 'w-[300px]' : 'w-[450px]'}
         `}
      >
         {!showQualityOptions && !showSpeedOptions ? (
            <ul className="list-none">
               <li className="hover:bg-gray-600/60 px-4 py-2 font-semibold text-sm flex items-center justify-between">
                  <div className="flex items-center w-full">
                     <BsSoundwave size={20} className="mr-3 text-white" />
                     <button>Постоянный уровень громкости</button>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        className="sr-only"
                        checked={isVolumeConstant}
                        onChange={(e) => { 
                           handleSwitchChange(e);
                        }}
                     />
                     <div className={`w-11 h-[22px] rounded-full transition-colors duration-300 ${isVolumeConstant ? 'bg-teal-500' : 'bg-gray-500'}`}></div>
                     <div className={`dot absolute left-1 bg-white w-[16px] h-[16px] rounded-full transition-transform duration-300 ${isVolumeConstant ? 'transform translate-x-5' : ''}`}></div>
                  </label>
               </li>
               <li className="hover:bg-gray-600/60 px-4 py-2 font-semibold text-sm">
                  <div 
                     className="flex items-center w-full cursor-pointer" 
                     onClick={handlePaybackSpeedClick}
                  >
                     <img src="/icons/play_speed.svg" alt="Play speed" className="w-[19px] text-white mr-3" />
                     <button className="flex-1 text-left">Скорость воспроизведения</button>
                     <p>{selectedPlaybackSpeed}</p>
                     <IoIosArrowForward size={20} className="ml-1 text-white" />
                  </div>
               </li>
               <li className="hover:bg-gray-600/60 px-4 py-2 font-semibold text-sm flex items-center justify-between">
                  <div 
                     className="flex items-center w-full cursor-pointer"
                     onClick={handleOption3Click}
                  >
                     <GiSettingsKnobs size={20} className="mr-3 text-white transform rotate-[-90deg]" />
                     <button className="flex-1 text-left">Качество</button>
                     <p>{selectedQuality}</p>
                     <IoIosArrowForward size={20} className="ml-1 text-white" />
                  </div>
               </li>
            </ul>
         ) : showQualityOptions ? (
            <div className="">
               <div className="flex items-center px-4 py-2" onClick={handleBackClick}>
                  <IoIosArrowBack size={18} className="cursor-pointer mr-4 text-white" />
                  <h3 className="text-white text-md cursor-pointer">Качество</h3>
               </div>
               <hr className="border-t border-gray-300 dark:border-gray-600 my-2" />
               <div className="flex flex-col items-start custom-scrollbar-400">
                  <button
                     onClick={() => handleQualitySelect("2160p")}
                     className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full"
                  >
                     <span className="flex items-center text-sm">
                        2160p
                        <span className="ml-2 bg-teal-500 text-white text-[11px] rounded-md px-[4px] py-[2px] relative top-[-0.2rem]">
                           4K
                        </span>
                     </span>
                  </button>
                  <button
                     onClick={() => handleQualitySelect("1440p")}
                     className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full"
                  >
                     <span className="flex items-center text-sm">
                        1440p
                        <span className="ml-2 bg-teal-500 text-white text-[11px] rounded-md px-[4px] py-[2px] relative top-[-0.2rem]">
                        HD
                        </span>
                     </span>
                  </button>
                  <button
                     onClick={() => handleQualitySelect("1080p")}
                     className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full"
                  >
                     <span className="flex items-center text-sm">
                        1080p
                        <span className="ml-2 bg-teal-500 text-white text-[11px] rounded-md px-[4px] py-[2px] relative top-[-0.2rem]">
                           HD
                        </span>
                     </span>
                  </button>
                  <button onClick={() => handleQualitySelect("720p")} className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full text-sm">
                     720p
                  </button>
                  <button onClick={() => handleQualitySelect("480p")} className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full text-sm">
                     480p
                  </button>
                  <button onClick={() => handleQualitySelect("360p")} className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full text-sm">
                     360p
                  </button>
                  <button onClick={() => handleQualitySelect("240p")} className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full text-sm">
                     240p
                  </button>
                  <button onClick={() => handleQualitySelect("144p")} className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 flex items-center justify-between w-full text-sm">
                     144p
                  </button>
                  <button
                     onClick={() => handleQualitySelect("Auto")}
                     className="text-white hover:bg-gray-600/60 px-6 py-3 mb-2 justify-between w-full"
                  >
                     <div className="flex items-center text-sm">
                        <FaCheck className="mr-2" />
                        Автонастройка
                     </div>
                  </button>
               </div>
            </div>
         ) : showSpeedOptions ? (
            <div className="">
               <div className="flex items-center px-4 py-2" onClick={handleBackClick}>
                  <IoIosArrowBack size={18} className="cursor-pointer mr-4 text-white" />
                  <h3 className="text-white text-md cursor-pointer">Скорость воспроизведения</h3>
               </div>
               <hr className="border-t border-gray-300 dark:border-gray-600 my-2" />
               <div className="flex flex-col items-start text-sm">
                  {["0.25", "0.5", "0.75", "Обычная", "1.25", "1.5", "1.75", "2"].map((speed) => (
                     <button
                        key={speed}
                        onClick={() => handleSpeedSelect(speed)}
                        className="text-white hover:bg-gray-600/60 px-4 py-3 mb-2 flex items-center w-full"
                     >
                        <div className="flex items-center w-8">
                           {selectedPlaybackSpeed === speed && (
                              <FaCheck size={16} className="text-white" />
                           )}
                        </div>
                        <div className="flex-1 text-left">
                           {speed}
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         ) : null}
      </div>
   );
}

VideoPlayerSettingsPopupMenu.propTypes = {
   onClose: PropTypes.func.isRequired,
};
