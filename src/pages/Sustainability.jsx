import { useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { IoSettingsOutline } from "react-icons/io5";
import { VscGlobe } from "react-icons/vsc";

export default function Sustainability() {
   const swiperRef = useRef(null);
   const activeCardRef = useRef(null);
   const [activeSlide, setActiveSlide] = useState(0);

   const slides = [
      {
         imageLight: "/images/sustainiability/highlight_feature_sustainiability_light.avif",
         imageDark: "/images/sustainiability/highlight_feature_sustainiability_dark.avif",
         title: "Ускорьте свой путь к устойчивому развитию",
         description:
            "Ускорьте обеспечение устойчивого развития и рост бизнеса с помощью широкого набора возможностей ESG от Компании Input Studios  и нашей глобальной экосистемы партнеров.",
      },
      {
         imageLight: "/images/sustainiability/sustainability_home_page_light.avif",
         imageDark: "/images/sustainiability/sustainability_home_page_dark.avif",
         title: "Отслеживание и управление показателями устойчивого развития",
         description:
            "Регистрируйте, фиксируйте и уменьшайте воздействие на окружающую среду за счет все более автоматизированных подключений к данным, которые позволяют получать практическую аналитику, с помощью Input Studios Sustainability Manager Essentials и Premium — в двух версиях для удовлетворения ваших потребностей.",
      },
   ];

   const cards = [
      {
         id: 0,
         image: "/images/sustainiability/1.avif",
         title: "Борьба с риском и углеродным следом в море и в порту",
         description:
            "Компания LeeWay Marine использовала решение смешанной реальности Input Studios Azure для дополнения своей модели личной поддержки, одновременно снизив риски, накладные расходы, время простоя и общий углеродный след.",
         buttonText: "Ознакомиться с историей",
      },
      {
         id: 1,
         image: "/images/sustainiability/2.avif",
         title: "Решение срочных и сложных задач с помощью интеллектуальных данных",
         description:
            "Энергетический гигант BP использует аналитику данных Azure Synapse и IoT для отслеживания достижения нулевого уровня выбросов углерода к 2050 году или раньше и помогает всему миру в достижении этой цели.",
         buttonText: "Ознакомиться с историей",
      },
      {
         id: 2,
         image: "/images/sustainiability/3.avif",
         title: "Использование мощных данных экологической устойчивости для достижения амбициозных целей",
         description: "Поставщик ингредиентов на основе растений Ingredion выбрал Input Studios Cloud for Sustainability, чтобы заменить ручной сбор данных на автоматический и добиться успеха в 13 областях, включая выбросы, пластик, биологическое разнообразие и права человека.",
         buttonText: "Ознакомиться с историей",
      },
      {
         id: 3,
         image: "/images/sustainiability/4.avif",
         title: "Устойчивость для всех отраслей — примеры внедрения во всем мире",
         description: "Узнайте, как клиенты Input Studios используют технологии для того, чтобы унифицировать аналитику данных, уменьшить влияние на операционную цепочку и цепочку поставок, а также сформировать новые эффективные бизнес-модели.",
         buttonText: "Скачать буклет",
      },
   ];

   const handleDotClick = (index) => {
      if (swiperRef.current) {
         swiperRef.current.swiper.slideTo(index);
      }
   };

   const [activeCard, setActiveCard] = useState(cards[0].id);
   
   return (
      <div className="justify-center min-h-screen mt-[60px] relative mb-20">
         <div className="relative">
            <Swiper
               ref={swiperRef}
               modules={[Navigation]}
               spaceBetween={50}
               slidesPerView={1}
               loop={true}
               navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
               }}
               onSlideChange={(swiper) => {
                  setActiveSlide(swiper.realIndex);
               }}
               allowTouchMove={false}
            >
               {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                     <div className="relative w-full max-h-[550px]">
                        <img
                           src={slide.imageLight}
                           alt="slide"
                           className="w-full h-auto object-cover dark:hidden"
                        />
                        <img
                           src={slide.imageDark}
                           alt="slide"
                           className="w-full h-auto object-cover hidden dark:block"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-32">
                           <p className="text-2xl font-bold mb-4">{slide.title}</p>
                           <p className="text-lg mb-6 w-[600px]">{slide.description}</p>
                           <div className="flex items-center">
                              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-600">
                                 <span>Подробнее</span>
                                 <IoIosArrowForward className="text-white transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
            <div className="bottom-8 left-0 right-0 flex justify-center items-center space-x-6 mt-6">
               <button data-tooltip-id="my-tooltip" data-tooltip-content="Previous slide" data-tooltip-place="bottom" className="custom-prev text-white p-2 rounded-full">
                  <IoIosArrowBack className="text-4xl transition-transform duration-300 hover:translate-x-[-8px] text-teal-500" />
                  <Tooltip id="my-tooltip" />
               </button>
               <div className="flex items-center space-x-7">
                  {slides.map((_, index) => (
                     <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                           activeSlide === index
                              ? "bg-teal-500"
                              : "border border-teal-500"
                        }`}
                        onClick={() => handleDotClick(index)}
                     />
                  ))}
               </div>
               <button data-tooltip-id="my-tooltip" data-tooltip-content="Next slide" data-tooltip-place="bottom" className="custom-next text-white p-2 rounded-full">
                  <IoIosArrowForward className="text-4xl transition-transform duration-300 hover:translate-x-2 text-teal-500" />
                  <Tooltip id="my-tooltip" />
               </button>
            </div>
            <div className="flex flex-col items-center px-4 mb-10 mt-12 text-center">
               <div className="max-w-3xl w-full">
                  <p className="text-4xl font-semibold mb-4">
                     Начните преобразование с инструкций для руководителя
                  </p>
                  <p className="text-lg mt-6">
                     Независимо от того, являетесь ли вы финансовым, операционным или
                     ИТ-специалистом, получите стратегическое руководство для развития
                     вашей организации. Узнайте о создании надежной цифровой основы
                     для отслеживания данных об экологической устойчивости и управления
                     ими, ускорения достижения целей и управления затратами в ходе
                     развития бизнеса.
                  </p>
                  <div className="flex items-center justify-center mt-6 group cursor-pointer">
                     <p className="text-teal-500 hover:underline">Скачать электронную книгу</p>
                     <IoIosArrowForward className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-teal-500 ml-2" />
                  </div>
               </div>
            </div>
            <div className="flex flex-col-3 space-x-4 space-y-4 mx-20">
               <div className="p-4 items-center text-center w-[800px]">
                  <div className="flex justify-center mb-4">
                     <IoSettingsOutline size={46} className="text-teal-500" />
                  </div>
                  <p className="text-2xl font-semibold motion-reduce mb-3">Оценка влияния</p>
                  <p>Полноценно используйте свои инвестиции в данные, чтобы следить за своим влиянием на окружающую среду с помощью количественных метрик.</p>
                  <div className="flex justify-center mb-4">
                     <button className="flex items-center group mt-5">
                        <p className="text-teal-500 mr-2">Оценить</p>
                        <IoIosArrowForward className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-teal-500" />
                     </button>
                  </div>
               </div>
               <div className="items-center text-center w-[800px]">
                  <div className="flex justify-center mb-4">
                     <img src="/images/sustainiability/refresh_sustainiability.png" alt="Refresh sustainiability" />
                  </div>
                  <p className="text-2xl font-semibold motion-reduce mb-3">Ускоренный переход</p>
                  <p>Внедряйте решения на основе данных, чтобы сократить снизить влияние вашей хозяйственной деятельности на экологию.</p>
                  <div className="flex justify-center mb-4">
                     <button className="flex items-center group mt-5">
                        <p className="text-teal-500 mr-2">Ускорить</p>
                        <IoIosArrowForward className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-teal-500" />
                     </button>
                  </div>
               </div>
               <div className="items-center text-center w-[800px]">
                  <div className="flex justify-center mb-4">
                     <VscGlobe size={46} className="text-teal-500" />
                  </div>
                  <p className="text-2xl font-semibold motion-reduce mb-3">Преобразование бизнеса</p>
                  <p>Пересмотрите свои бизнес-системы и бизнес-модели и внедрите инновационные цифровые технологии.</p>
                  <div className="flex justify-center mb-4">
                     <button className="flex items-center group mt-5">
                        <p className="text-teal-500">Преобразовать</p>
                        <IoIosArrowForward className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-teal-500" />
                     </button>
                  </div>
               </div>
            </div>
            <div className="relative w-full h-[420px] mt-8">
               <img src="/images/sustainiability/sustainability.png" alt="Sustainiability" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black opacity-50"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-4xl font-bold mb-4">Добьемся нулевых выбросов общими усилиями</p>
                  <p className="text-lg max-w-3xl text-center">Компания Input Studios считает своим долгом помогать предприятиям всего мира добиваться нашей коллективной цели и при этом создавать для них новые ценные возможности. Узнайте, как мы постоянно совершенствуем собственный бизнес и помогаем совершенствоваться другим и как мы агитируем за глобальные преобразования.</p>
               </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-16">
               <div className="text-center w-full">
                  <p className="text-4xl mb-4">Отчет об экологической устойчивости за 2023-й год</p>
                  <p className="mb-4 max-w-2xl mx-auto">Просматривайте наши действия, ход и результаты работы по мере того, как мы стремимся выполнить наши обязательства на 2030-й год. Узнайте, как мы вкладываем средства в долгосрочной перспективе, переходя от обещаний к действиям, помогая другим делать то же самое, ускоряя внедрение новых решений для изменения климата и поддерживая политики для повышения экологической устойчивости в мире.</p>
                  <button className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-teal-600 mx-auto">
                     <span className="font-semibold">Ознакомиться с отчетом</span>
                     <IoIosArrowForward className="text-xl transition-transform duration-300 group-hover:translate-x-1 text-white" />
                  </button>
               </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-20 mb-12">
               <p className="text-4xl max-w-4xl text-center">Присоединяйтесь к нам, пока мы определим свои цели на будущее</p>
            </div>
            <div className="flex justify-center gap-6 px-4 sm:px-8">
               <div className="flex flex-col items-center max-w-[480px] w-full overflow-hidden">
                  <img src="/images/sustainiability/sustainability_homepage_card_pillar_1.avif" alt="Sustainability homepage card pillar 1" className="w-full h-64 object-cover" />
                  <div className="p-4">
                     <p className="text-2xl mb-4 text-center">Наши обязательства: Повышение устойчивости бизнеса — от обещаний к действиям</p>
                     <button className="flex items-center justify-center text-teal-500 hover:underline w-full">
                        <span>Посмотреть видео</span>
                        <IoIosArrowForward className="ml-2 text-teal-500" />
                     </button>
                  </div>
               </div>
               <div className="flex flex-col items-center max-w-[480px] w-full overflow-hidden">
                  <img src="/images/sustainiability/sustainability_homepage_card_pillar_2.avif" alt="Sustainability homepage card pillar 2" className="w-full h-64 object-cover" />
                  <div className="p-4">
                     <p className="text-2xl mb-4 text-center">Технологические решения: Создание решений для обеспечения устойчивости с целью повышения операционной эффективности и увеличения влияния на окружающую среду</p>
                     <button className="flex items-center justify-center text-teal-500 hover:underline w-full">
                        <span>Посмотреть видео</span>
                        <IoIosArrowForward className="ml-2 text-teal-500" />
                     </button>
                  </div>
               </div>
               <div className="flex flex-col items-center max-w-[480px] w-full overflow-hidden">
                  <img src="/images/sustainiability/sustainability_homepage_card_pillar_3.avif" alt="Sustainability homepage card pillar 3" className="w-full h-64 object-cover" />
                  <div className="p-4">
                     <p className="text-2xl mb-4 text-center">Глобальное преобразование: Поддержка социальной инфраструктуры для экологически устойчивого мира</p>
                     <button className="flex items-center justify-center text-teal-500 hover:underline w-full">
                        <span>Посмотреть видео</span>
                        <IoIosArrowForward className="ml-2 text-teal-500" />
                     </button>
                  </div>
               </div>
            </div>
            <div className="w-full bg-teal-600 py-10 px-4 flex items-center justify-center mt-20">
               <div className="text-center">
                  <p className="text-2xl font-semibold mb-4">
                     Приготовьтесь к будущему при поддержке опытных поставщиков решений
                  </p>
                  <p className="text-lg mb-6 max-w-3xl mx-auto">
                     Ознакомьтесь с настраиваемыми решениями для экологической устойчивости, которые основываются на технологиях Input Studios, либо подберите готовый вариант. Эти решения помогут вам достичь целей и получить при этом максимальную выгоду.
                  </p>
                  <div className="flex justify-center group">
                     <button className="flex items-center justify-center text-white hover:underline font-semibold">
                        Найти решения
                        <IoIosArrowForward className="ml-1 text-white text-xl transition-transform duration-300 group-hover:translate-x-1" />
                     </button>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-20 mb-12">
               <p className="text-4xl">Устойчивое развитие на практике</p>
            </div>
            <div className="w-full py-10 px-4 relative mb-20">
               <Swiper
                  ref={activeCardRef}
                  modules={[Navigation]}
                  spaceBetween={50}
                  slidesPerView={1}
                  loop={true}
                  loopAdditionalSlides
                  navigation={{
                     prevEl: ".custom-prev",
                     nextEl: ".custom-next",
                  }}
                  onSlideChange={(swiper) => {
                     const activeIndex = swiper.realIndex;
                     setActiveCard(cards[activeIndex].id);
                     console.log(`Переключение слайда: текущий индекс - ${activeIndex}, id - ${cards[activeIndex].id}`);
                  }}
                  allowTouchMove={false}
                  >
                  {cards.map((card, index) => (
                     <SwiperSlide key={index}>
                        <div className="flex justify-center relative">
                        <div className="w-[900px] h-[700px] bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col">
                           <img
                              src={card.image}
                              alt={`Card ${index + 1}`}
                              className="w-full h-[400px] object-cover"
                           />
                           <div className="p-7 flex flex-col flex-grow">
                              <p className="text-2xl font-semibold mb-4">{card.title}</p>
                              <p className="text-lg mb-4 flex-grow">{card.description}</p>
                              <button className="flex items-center text-teal-500 hover:underline group text-lg">
                              {card.buttonText}
                              <IoIosArrowForward className="ml-2 text-teal-500 transition-transform duration-300 group-hover:translate-x-1" />
                              </button>
                           </div>
                           <button className="custom-prev absolute left-14 top-1/2 transform -translate-y-1/2">
                              <IoIosArrowBack className="text-5xl text-teal-500 transition-transform duration-300 hover:translate-x-[-8px]" />
                           </button>
                           <button className="custom-next absolute right-14 top-1/2 transform -translate-y-1/2">
                              <IoIosArrowForward className="text-5xl text-teal-500 transition-transform duration-300 hover:translate-x-2" />
                           </button>
                        </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
               <div className="flex justify-center items-center space-x-8 mt-6">
                  {cards.map(card => (
                     <div
                        key={card.id}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                        activeCard === card.id
                           ? "bg-teal-500"
                           : "border border-teal-500 bg-transparent"
                        }`}
                        onClick={() => {
                           setActiveCard(card.id);
                           const swiperInstance = activeCardRef.current.swiper;
                           swiperInstance.slideTo(cards.findIndex(c => c.id === card.id));
                        }}
                     />
                  ))}
               </div>
            </div>
            <div className="flex flex-row items-center justify-center mx-20">
               <div className="w-1/2 h-50 px-4 sm:px-8 py-28 bg-white dark:bg-gray-800 shadow-md flex flex-col justify-between">
                  <h1 className="text-2xl font-bold text-center">
                     Начните свой путь к экологической устойчивости
                  </h1>
                  <p className="mt-3 text-center">
                     Узнайте, как технологические решения Майкрософт на базе облака помогают повысить эффективность рабочих процессов и обеспечить устойчивое развитие.
                  </p>
                  <button className="flex items-center mt-4 mx-auto px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 shadow-md">
                     <span className="font-semibold">Начать работу</span>
                     <IoIosArrowForward className="text-xl ml-2" />
                  </button>
               </div>
               <div className="w-1/2 h-50 px-4 sm:px-8 py-20 bg-white dark:bg-gray-700 shadow-md flex flex-col justify-between">
                  <h1 className="text-2xl font-bold text-center">
                     Зарегистрируйтесь, чтобы следить за новостями о решениях Майкрософт для обеспечения экологической устойчивости
                  </h1>
                  <p className="mt-3 text-center">
                     Зарегистрируйтесь, чтобы получать сообщения о новостях, революционных решениях и технологиях Майкрософт для обеспечения экологической устойчивости.
                  </p>
                  <button className="flex items-center mt-4 mx-auto px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 shadow-md">
                     <span className="font-semibold">Начать работу</span>
                     <IoIosArrowForward className="text-xl ml-2" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
