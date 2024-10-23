import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

function DownloadCard({ title, description, buttonText, imageUrl, linkTo }) {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? 'en-us' : 'ru-ru';

   return (
      <Link to={`/${languagePrefix}${linkTo}`}>
         <div className="group relative w-full border border-teal-500 rounded-lg shadow-md hover:border-2 h-[400px] md:h-[430px] card-height overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg transform-origin-center">
            <div className="flex justify-center">
               <div className="w-full">
                  <div className="w-full h-48 overflow-hidden">
                     <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110 transform-origin-center" />
                  </div>
                  <div className="p-5">
                     <h1 className="text-2xl font-bold mb-2">{title}</h1>
                     <p className="mb-4">{description}</p>
                  </div>
               </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full pb-5 pl-5">
               <button className="font-medium bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300">
                  {buttonText}
               </button>
            </div>
         </div>
      </Link>
   );
}

function CardsDownload() {
   const { t } = useTranslation();
   const [cardsData, setCardsData] = useState([]);

   useEffect(() => {
      const data = [
         {
            id: 1,
            title: 'Input Studios Wave',
            description: t("wave_card_description"),
            buttonText: t("button_wave_download"),
            imageUrl: 'https://i.ibb.co/y5rVMV8/bg-wave.png',
            linkTo: '/wave'
         },
         {
            id: 2,
            title: 'Quantum Engine',
            description: t("quantum_engine_card_description"),
            buttonText: t("button_quantum_engine_more"),
            imageUrl: 'https://i.ibb.co/2hY32kK/bg-quantum-engine.png',
            linkTo: '/quantum-engine'
         },
         {
            id: 3,
            title: 'Chatify',
            description: t("dialog_chat_card_description"),
            buttonText: t("button_dialog_download"),
            imageUrl: 'https://i.ibb.co/h19m6KZ/bg-dialog-chat.webp',
            linkTo: '/chatify'
         },
         {
            id: 4,
            title: 'Input Studios Workspace',
            description: t("workspace_card_description"),
            buttonText: t("button_workspace_more"),
            imageUrl: 'https://i.ibb.co/pZg54v1/bg-workspace.jpg',
            linkTo: '/workspace'
         }
      ];
      setCardsData(data);
   }, [t]);

   return (
      <div className="mx-10 margin-download-card mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
         {cardsData.map(card => (
            <DownloadCard
               key={card.id}
               title={card.title}
               description={card.description}
               buttonText={card.buttonText}
               imageUrl={card.imageUrl}
               linkTo={card.linkTo}
            />
         ))}
      </div>
   );
}

DownloadCard.propTypes = {
   title: PropTypes.shape,
   description: PropTypes.shape, 
   buttonText: PropTypes.shape, 
   imageUrl: PropTypes.shape, 
   linkTo: PropTypes.shape
};

export default CardsDownload;
