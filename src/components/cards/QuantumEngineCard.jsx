import PropTypes from "prop-types";
import { FaMessage } from "react-icons/fa6";

export default function QuantumEngineCard({ image, title, subtitle, description, date, comments }) {
   let titleColor = '';

   if (title === 'UPDATE') {
      titleColor = 'text-green-500';
   } else if (title === 'GAMES') {
      titleColor = 'text-blue-500';
   } else if (title === 'ANNOUNCEMENT') {
      titleColor = 'text-red-500';
   } else {
      titleColor = 'text-gray-500';
   }

   return (
      <div className="w-[360px] rounded-lg shadow-md overflow-hidden bg-gray-300 dark:bg-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out hover:translate-y-[-10px]">
         <div className="w-full h-[190px]">
            <img src={image} alt={title} className="w-full h-full object-cover" />
         </div>
         <div className="p-4 flex flex-col flex-grow">
            <h3 className={`text-sm font-bold mb-2 ${titleColor}`}>{title}</h3>
            <h4 className="text-lg font-semibold mb-2">{subtitle}</h4>
            <p className="text-gray-300 mb-4 flex-grow">{description}</p>
            <div className="flex items-center text-gray-500 text-sm mt-auto">
               <p className="pr-4">{date}</p>
               <div className="flex items-center space-x-1">
                  <FaMessage className="text-gray-400" />
                  <span>{comments}</span>
               </div>
            </div>
         </div>
      </div>
   );
}

QuantumEngineCard.propTypes = {
   image: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   subtitle: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   date: PropTypes.string.isRequired,
   comments: PropTypes.number.isRequired,
};
