import PropTypes from "prop-types";
import { useState, useRef, useEffect, useCallback } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { PiSpeakerSlashBold } from "react-icons/pi";
import { BiSkipNext } from "react-icons/bi";
import { MdFullscreen } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdFullscreenExit } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";
import VideoPlayerSettingsPopupMenu from "./popups/VideoPlayerSettingsPopupMenu";

export default function VideoPlayer({ url, previewImage, updatePreviewImage }) {
   const videoRef = useRef(null);
   const canvasRef = useRef(null);
   const menuRef = useRef(null);
   const sliderRef = useRef(null);
   const settingsButtonRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [isMuted, setIsMuted] = useState(false);
   const [volume, setVolume] = useState(100);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [hovered, setHovered] = useState(false);
   const [rotationDegree, setRotationDegree] = useState(0);
   const [previewTime, setPreviewTime] = useState(0);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isHovering, setIsHovering] = useState(false);

   useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
         videoElement.currentTime = 0;
      }
      setProgress(0);
   }, []);

   useEffect(() => {
      const savedPreview = localStorage.getItem("videoPreviewImage");
      if (savedPreview) {
         updatePreviewImage(savedPreview);
      }
   }, [updatePreviewImage]);

   const captureFirstFrame = useCallback(() => {
      const video = videoRef.current;
      if (video && video.videoWidth > 0 && video.videoHeight > 0) {
         const canvas = document.createElement("canvas");
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         const ctx = canvas.getContext("2d");
         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
         const frameData = canvas.toDataURL("image/png");

         const currentPreview = localStorage.getItem('videoPreviewImage');
         if (frameData !== currentPreview) {
            updatePreviewImage(frameData);
            localStorage.setItem('videoPreviewImage', frameData);
         }
      }
   }, [updatePreviewImage]);

   const updateCanvas = (time) => {
      if (videoRef.current && canvasRef.current) {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");
         const video = videoRef.current;

         video.currentTime = time;

         video.addEventListener(
            "seeked",
            () => {
               ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            },
            { once: true }
         );
      }
   };
   
   useEffect(() => {
      const video = videoRef.current;

      const handleLoadedMetadata = () => {
         video.currentTime = 0;
         video.pause();
         captureFirstFrame();
      };

      if (video) {
         video.addEventListener("loadedmetadata", handleLoadedMetadata);
      }

      return () => {
         if (video) {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
         }
      };
   }, [captureFirstFrame]);
   
   useEffect(() => {
      let timeout;
      if (!isPlaying) {
         timeout = setTimeout(() => {
            captureFirstFrame();
         }, 50);
      }
      return () => clearTimeout(timeout);
   }, [isPlaying, captureFirstFrame]);

   useEffect(() => {
      const videoElement = videoRef.current;
      const captureInitialFrame = () => {
         captureFirstFrame();
      };

      if (videoElement) {
         videoElement.addEventListener("loadeddata", captureInitialFrame);
      }

      return () => {
         if (videoElement) {
            videoElement.removeEventListener("loadeddata", captureInitialFrame);
         }
      };
   }, [captureFirstFrame]);

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
      const value = Math.min(100, Math.max(0, Number(e.target.value)));
      setProgress(value);
    
      const newTime = (value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    
      setPreviewTime(newTime);
      updateCanvas(newTime);
    
      // Обновляем положение canvas
      updateCanvasPosition(value);
    };

   const updateCanvasPosition = (progress) => {
   if (sliderRef.current && canvasRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect(); // Получаем координаты слайдера
      const canvasWidth = canvasRef.current.offsetWidth; // Ширина canvas
      const offsetX = (sliderRect.width * progress) / 100; // Смещение в пикселях
      const left = sliderRect.left + offsetX - canvasWidth / 2; // Вычисляем позицию по оси X
   
      canvasRef.current.style.left = `${left}px`;
   }
   };

   const toggleMenu = (event) => {
      event.stopPropagation();
      if (isMenuOpen) {
         closeMenu();
      } else {
         openMenu();
      }
   };
   
   const openMenu = () => {
      console.log("Opening menu");
      setIsMenuOpen(true);
      setRotationDegree(45);
   };
   
   const closeMenu = useCallback(() => {
      console.log("Closing menu");
      setIsMenuOpen(false);
      setRotationDegree(0);
   }, []);

   useEffect(() => {
      const handleOutsideClick = (event) => {
         if (isMenuOpen && !settingsButtonRef.current.contains(event.target) && !menuRef.current.contains(event.target)) {
            console.log("Closing menu from outside click");
            closeMenu();
         }
      };
   
      document.addEventListener("click", handleOutsideClick);
   
      return () => {
         document.removeEventListener("click", handleOutsideClick);
      };
   }, [closeMenu, isMenuOpen]);
   
   const handleClickFullscreen = () => {
      if (!hovered) {
         setHovered(true);
         setTimeout(() => {
            setHovered(false);
         }, 200);
      }
   };

   const handleMouseEnter = () => {
      setIsHovering(true);
   };

   const handleMouseLeave = () => {
      setIsHovering(false);
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

   const handleDoubleClick = () => {
      toggleFullscreen();
   };

   useEffect(() => {
      const handleFullscreenChange = () => {
         if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
         ) {
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
      <div className="relative w-full max-w-screen-2xl mx-auto" onClick={handleContainerClick}>
         <div className="relative w-full h-[700px]">
            {!isPlaying && (
               <div
                  className="w-full h-full bg-cover bg-center absolute top-0 left-0 rounded-xl overflow-hidden"
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
            <div className="relative rounded-xl overflow-hidden">
               <video
                  ref={videoRef}
                  src="/videos/quantum-engine/quantum_engine.mp4"
                  poster={previewImage}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  onDoubleClick={handleDoubleClick}
                  className={`${isPlaying ? 'block' : 'hidden'} w-full h-[700px] object-cover rounded-xl`}
               >
                  Your browser does not support the video tag.
               </video>
            </div>
         </div>
         <div className="absolute bottom-8 w-full py-2 flex justify-between items-center z-10 px-2 controls-panel">
            <div className="flex-1 relative">
               <input
                  ref={sliderRef}
                  type="range"
                  value={progress}
                  onChange={handleSliderChange}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-full h-1 bg-teal-500 dark:bg-teal-500 rounded-full appearance-none"
                  style={{
                     WebkitAppearance: 'none',
                     MozAppearance: 'none',
                     appearance: 'none',
                     background: `linear-gradient(to right, #0694a2 ${progress}%, #e2e8f0 ${progress}%)`,
                  }}
               />
               {isHovering && (
                  <div className="absolute bottom-5 left-[50%] transform -translate-x-1/2">
                     <canvas ref={canvasRef} width="160" height="90" className="rounded shadow-lg" />
                     <div className="text-center text-sm text-white bg-black bg-opacity-75 px-2 py-1 rounded">
                     {new Date(previewTime * 1000).toISOString().substr(11, 8)}
                     </div>
                  </div>
               )}
            </div>
         </div>
         <div className="relative">
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-1 px-2 flex items-center gap-2 controls-panel rounded-b-xl">
               <button
                  onClick={togglePlay}
                  className="ml-4 mr-2 text-white rounded-full focus:outline-none"
               >
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18}/>}
               </button>
               <div className="relative flex items-center">
                  <button>
                     <BiSkipNext size={40} className="text-white" />
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
                  <div className="absolute transition-all duration-300 group-hover:ml-[150px] ml-12 text-xs text-white whitespace-nowrap">
                     {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                  </div>
                  <input
                     type="range"
                     onChange={handleVolumeChange}
                     value={volume}
                     min="0"
                     max="100"
                     className="w-[100px] ml-2 opacity-0 group-hover:opacity-100 transition-opacity volume-range"
                  />
               </div>
               <div className=" w-full px-4 flex items-center justify-end gap-4">
                  <div className="flex items-center gap-4">
                     <button className="flex items-center pr-2">
                        <PiSubtitlesFill size={24} className="text-gray-400" />
                     </button>
                     <div className="relative mt-1">
                        <button
                           ref={settingsButtonRef}
                           className="group settings-button"
                           onClick={toggleMenu}
                        >
                           <IoSettingsSharp
                              size={22}
                              className="text-white transform transition-transform duration-300"
                              style={{
                                 transform: `rotate(${rotationDegree}deg)`,
                              }}
                           />
                        </button>
                        {isMenuOpen && (
                           <div ref={menuRef}>
                              <VideoPlayerSettingsPopupMenu />
                           </div>
                        )}
                     </div>
                     <button
                        onClick={toggleFullscreen}
                        onMouseEnter={handleClickFullscreen}
                        className="flex items-center gap-4"
                     >
                        {isFullscreen ? (
                        <MdFullscreenExit
                           size={34}
                           className={`transform transition-transform duration-200 ${
                              hovered ? "scale-110" : "scale-100"
                           }`}
                        />
                        ) : (
                        <MdFullscreen
                           size={34}
                           className={`transform transition-transform duration-200 ${
                              hovered ? "scale-110" : "scale-100"
                           }`}
                        />
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
   updatePreviewImage: PropTypes.string.isRequired,
};
