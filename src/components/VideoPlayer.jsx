import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { PiSpeakerSlashBold } from "react-icons/pi";
import { BiSkipNext } from "react-icons/bi";
import { MdFullscreen } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdFullscreenExit } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";

export default function VideoPlayer({ url, previewImage }) {
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [isMuted, setIsMuted] = useState(false);
   const [volume, setVolume] = useState(100);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const videoRef = useRef(null);

   useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
         videoElement.currentTime = 0;
      }
      setProgress(0);
   }, []);

   const togglePlay = () => {
      if (isPlaying) {
         videoRef.current.pause();
      } else {
         videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
   };

   const handleContainerClick = (e) => {
      if (e.target.closest('.controls-panel')) return;
      togglePlay();
   };

   const handleTimeUpdate = () => {
      if (videoRef.current.duration > 0) {
         const progressPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
         setProgress(progressPercentage);
      }
   };

   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
   };

   const toggleMute = () => {
      setIsMuted((prev) => !prev);
      if (isMuted) {
         setVolume(100);
      } else {
         setVolume(0);
      }
   };

   const handleVolumeChange = (e) => {
      const value = e.target.value;
      setVolume(value);
      setIsMuted(value === "0");
   };

   const handleSliderChange = (e) => {
      const value = Number(e.target.value);
      setProgress(value);
      videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
   };

   const toggleFullscreen = () => {
      if (!isFullscreen) {
         if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
         } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
         } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
         } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
         }
         setIsFullscreen(true);
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
         }
         setIsFullscreen(false);
      }
   };

   useEffect(() => {
      const handleFullscreenChange = () => {
            if (!document.fullscreenElement && 
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
            setIsFullscreen(false);
         }
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);

      return () => {
         document.removeEventListener('fullscreenchange', handleFullscreenChange);
         document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
         document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
         document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      };
   }, []);

   return (
      <div className="w-full max-w-screen-2xl mx-auto relative" onClick={handleContainerClick}>
         {!isPlaying && (
            <div
               className="w-full h-[700px] bg-cover bg-center relative"
               style={{ backgroundImage: `url(${previewImage})` }}
            >
               <div
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-6 text-white cursor-pointer rounded-full"
               >
                  <FaPlay size={32} className="ml-1"/>
               </div>
            </div>
         )}
         <div className="relative rounded-lg overflow-hidden">
            <video
               ref={videoRef}
               src={url}
               poster={previewImage}
               onTimeUpdate={handleTimeUpdate}
               onClick={togglePlay}
               className={`${isPlaying ? 'block' : 'hidden'} w-full h-[700px] object-cover`}
            >
               <source src={url} type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         </div>
         <div className="absolute bottom-8 w-full py-2 flex justify-between items-center z-10 px-2 controls-panel">
            <div className="flex-1 relative">
               <input
                  type="range"
                  value={progress}
                  onChange={handleSliderChange}
                  className="w-full h-1 bg-teal-500 dark:bg-teal-500 rounded-full appearance-none"
                  style={{
                     WebkitAppearance: 'none',
                     MozAppearance: 'none',
                     appearance: 'none',
                     background: `linear-gradient(to right, #0694a2 ${progress}%, #e2e8f0 ${progress}%)`,
                  }}
               />
            </div>
         </div>
         <div className="relative">
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-1 px-2 flex items-center gap-2 controls-panel">
               <button
                  onClick={togglePlay}
                  className="ml-4 mr-2 text-white rounded-full focus:outline-none"
               >
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18}/>}
               </button>
               <div className="relative flex items-center">
                  <button>
                     <BiSkipNext size={40} />
                  </button>
               </div>
               <div className="relative flex items-center group ml-1">
                  <button onClick={toggleMute} className="text-white">
                     {isMuted ? (
                        <PiSpeakerSlashBold size={24} />
                     ) : (
                        <HiSpeakerWave size={24} />
                     )}
                  </button>
                  <div className="absolute ml-12 text-xs text-white">
                     {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                  </div>
                  <input
                     type="range"
                     onChange={handleVolumeChange}
                     value={volume}
                     min="0"
                     max="100"
                     className="w-[100px] ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
               </div>
               <div className=" w-full px-4 flex items-center justify-end gap-4 z-50">
                  <div className="flex items-center gap-4">
                     <button className="flex items-center pr-2">
                        <PiSubtitlesFill size={24} className="text-gray-400" />
                     </button>
                     <button>
                        <IoSettingsSharp size={22} />
                     </button>
                     <button onClick={toggleFullscreen} className="flex items-center gap-4">
                        {isFullscreen ? (
                           <MdFullscreenExit size={32} className="text-gray-400" />
                        ) : (
                           <MdFullscreen size={32} className="text-gray-400" />
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

VideoPlayer.propTypes = {
   url: PropTypes.string.isRequired,
   previewImage: PropTypes.string.isRequired,
};
