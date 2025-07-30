import { Helmet } from "react-helmet";
import Divider from "../components/dividers/Divider";
import colors from "../utils/colors";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SitemapPage() {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="relative mx-4 md:mx-8 lg:mx-16 mt-[60px]">
         <Helmet>
            <title>Карта сайта InputStudios.ru</title>
         </Helmet>
         <div className="relative bg-[#eae8f3] sm:px-6 lg:px-6 h-[250px] sm:h-[400px] md:h-[500px] lg:h-[250px]">
            <img 
               className="absolute right-0 top-0 h-full w-auto max-w-[50%] object-cover"
               src="/images/sitemap/sitemap.avif" 
               alt="trademarks" 
            />
            <div className="absolute h-auto object-cover mx-4 top-1/2 left-12 transform -translate-y-1/2 p-4 md:p-10">
               <h2 className="text-2xl md:text-4xl font-semibold text-black break-words">
                  Карта сайта Input Studios
               </h2>
            </div>
         </div>
         <div className="flex justify-start space-x-10 mt-6">
            {["Покупки и поддержка", "Популярные ПО и службы", "Игры", "Бизнес и предприятия", "Разработчики и ИТ-специалисты", "О нас"].map((item, index) => (
               <a key={index} href="#" className="relative text-base font-medium text-[#2fb7dd] transition duration-200 group">
                  {item}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#2fb7dd] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
               </a>
            ))}
         </div>
         <Divider className="mt-3 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <div className="px-4">
            <div className="mb-8">
               <span className="text-4xl font-semibold">Покупки и поддержка</span>
            </div>
            <div className="flex justify-between space-x-6 mx-12">
               <div className="flex flex-col space-y-4 w-1/4">
                  <span className="font-semibold uppercase">Input Studios Store</span>
                  <Link to={`${languagePrefix}/store/b/sale`} className="text-[#2fb7dd] underline">Покупка</Link>
                  <Link to={`${languagePrefix}/contactus`} className="text-[#2fb7dd] underline">Связаться с нами</Link>
                  <Link to={`${languagePrefix}/account-billing`} className="text-[#2fb7dd] underline">Поддержка Input Studios Store</Link>
                  <Link to={`${languagePrefix}/store/b/why-input-studios-store`} className="text-[#2fb7dd] underline">Магия Input Studios Store</Link>
                  <Link to={`${languagePrefix}/store/cart`} className="text-[#2fb7dd] underline">Ваша корзина</Link>
               </div>
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Заказы и доставка</span>
                  <Link to={`${languagePrefix}/billing/orders`} className="text-[#2fb7dd] underline">Отслеживание заказов</Link>
                  <Link to={`${languagePrefix}/account-billing`} className="text-[#2fb7dd] underline">Варианты доставки</Link>
                  <Link to={`${languagePrefix}/account-billing/returning-items-you-bought-from-input-studios-for-exchange-or-refund`} className="text-[#2fb7dd] underline">Возвраты</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=account`} className="text-[#2fb7dd] underline">Профиль учетной записи</Link>
                  <Link to={`${languagePrefix}/store/b/terms-of-sale`} className="text-[#2fb7dd] underline">Условия продажи</Link>
               </div>
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Поддержка</span>
                  <a>Домашняя страница службы поддержки Input Studios</a>
                  <a>Задать вопрос сообществу</a>
                  <a>Чат и вызов</a>
                  <a>Безопасность для бизнеса</a>
                  <p>Input Studios Security Essentials</p>
                  <a>Единая поддержка Input Studios</a>
               </div>
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Учетная запись</span>
                  <a>Об учетной записи Input Studios</a>
                  <a>Управление учетной записью</a>
                  <a>Input Studios Rewards</a>
                  <a>Управление устройствами</a>
                  <a>Настроить родительский контроль</a>
                  <a>Зарегистрироваться в Input Studios</a>
               </div>
            </div>
         </div>
         <Divider className="mt-3 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <div className="px-4">
            <div className="mb-8">
               <span className="text-4xl font-semibold">Популярное ПО и службы</span>
            </div>
            <div className="flex justify-between space-x-6 mx-12">
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Microsoft 365</span>
                  <a>Отслеживание заказов</a>
                  <a>Варианты доставки</a>
                  <a>Возвраты</a>
                  <a>Профиль учетной записи</a>
                  <a>Условия продажи</a>
               </div>
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Приложения</span>
                  <a>Домашняя страница службы поддержки Input Studios</a>
                  <a>Задать вопрос сообществу</a>
                  <a>Чат и вызов</a>
                  <a>Безопасность для бизнеса</a>
                  <p>Input Studios Security Essentials</p>
                  <a>Единая поддержка Input Studios</a>
               </div>
               <div className="flex flex-col space-y-2 w-1/4">
                  <span className="font-semibold uppercase">Службы</span>
                  <a>Об учетной записи Input Studios</a>
                  <a>Управление учетной записью</a>
                  <a>Input Studios Rewards</a>
                  <a>Управление устройствами</a>
                  <a>Настроить родительский контроль</a>
                  <a>Зарегистрироваться в Input Studios</a>
               </div>
            </div>
         </div>
      </div>
   )
}
