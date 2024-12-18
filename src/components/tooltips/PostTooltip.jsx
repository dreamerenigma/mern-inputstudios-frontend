import PropTypes from 'prop-types';
import { motion } from "framer-motion";

export default function PostTooltip({ showTooltip }) {
   return (
      showTooltip && (
         <motion.div
            className="fixed top-[72px] left-[41.5%] bg-gray-200/60 dark:bg-gray-600/60 text-black dark:text-white text-sm p-5 rounded-lg shadow-lg backdrop-blur-sm inline-block"
            style={{ zIndex: 1000 }}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{
               opacity: 1,
               y: 0,
               scale: 1,
               rotate: [0, 5, -5, 3, -3, 0],
            }}
            exit={{
               opacity: 0,
               y: 50,
               scale: 0.8,
               rotate: [0, -10, 10, 0],
            }}
            transition={{
               duration: 0.5,
               ease: [0.42, 0, 0.58, 1],
               rotate: {
                  duration: 0.6,
                  ease: "easeInOut",
               },
               opacity: {
                  duration: 0.3,
                  ease: "easeOut",
               },
               y: {
                  duration: 0.5,
                  ease: "easeOut",
               },
               scale: {
                  duration: 0.3,
                  ease: "easeOut",
               },
            }}
         >
            Ссылка скопирована в буфер обмена
         </motion.div>
      )
   );
}

PostTooltip.propTypes = {
   showTooltip: PropTypes.bool.isRequired,
};
