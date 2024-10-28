import { Link } from "react-router-dom";
import CustomButton from "../../components/buttons/CustomButton";
import { useSelector } from "react-redux";

export default function BrowserWave() {
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

  return (
    <div className="relative text-center">
      <div className="relative min-h-screen items-center justify-center ье-">
        <img
          src="/images/apps/wave/bg_wave.jpg"
          alt="WaveBrowser"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center mt-[60px]">
          <p className="text-white p-4 mt-8 rounded text-3xl sm:text-3xl md:text-4xl lg:text-4xl leading-normal font-semibold text-center">
            Input Studios Wave — браузер с более <br />
            эффективным способом поиска информации
          </p>
          <img
            src="/images/apps/wave/WebBrowser.png"
            alt="WebBrowser"
            className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 mt-8 rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-4 browser">
        <div className="max-w-3xl text-center">
          <span className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl block">
            Input Studios Wave имеет стильный дизайн
          </span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-8 block">
            Откройте для себя Интернет с новым внешним видом, который поможет вам легко
            ориентироваться, поддерживать возможности искусственного интеллекта и сводить к минимуму
            отвлекающие факторы при просмотре веб-страниц, сохраняя при этом производительность и
            безопасность.
          </span>
          <CustomButton className="text-lg font-bold focus:outline-none mt-10 px-8 py-3">
            Подробнее
          </CustomButton>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mx-20 my-20 items-start import browser">
        <img src="/images/apps/wave/wave_import.png" alt="" className="w-24 mr-6" />
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">
                Сделайте Wave своим собственным
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-1">
                Добавляйте избранное, пароли, историю, файлы cookie и многое другое из других
                браузеров.
              </span>
            </div>
            <CustomButton className="ml-4 mr-20 px-8 custom-button">Импорт</CustomButton>
          </div>
        </div>
      </div>
      <div className="mx-20 my-10 theme-container browser">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 text-left text-container">
            <div className="text-sm bg-teal-500 rounded-md p-1 mb-4 inline-block max-w-max">
              <p className="text-white">Новые функции</p>
            </div>
            <span className="text-3xl mt-2">Новые Темы для браузера</span>
            <span className="text-xl mt-4">
              Погрузитесь в захватывающий мир космоса с нашей новой темой для браузера. Откройте для
              себя неизведанные уголки вселенной через яркие и увлекательные изображения планет,
              звезд и галактик, которые превратят ваш просмотр в увлекательное космическое
              путешествие. Насладитесь величественной красотой космоса, не покидая уют вашего
              экрана, и дайте своему просмотру новые горизонты с темой Космос.
            </span>
            <div className="inline-block mt-10">
              <CustomButton>Посмотреть темы</CustomButton>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
            <img
              src="/images/apps/wave/themes.png"
              alt="ThemesBrowser"
              className="w-500 h-300 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg p-10 mx-20 import items-center text-center browser">
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="flex justify-center items-center md:justify-start">
            <img
              src="/images/apps/wave/security.png"
              alt="SecurityBrowser"
              className="w-24 mr-14"
            />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-5xl">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col text-left my-2 flex-1 md:ml-0">
              <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">
                Повысьте безопасность в интернете
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-1">
                Когда поднимается вопрос безопасности в Интернете, на Input Studios Wave можно
                положиться. Wave оснащен расширенными функциями безопасности и средствами управления
                безопасностью на основе ИИ, благодаря чему защищаться от угроз в Интернете
                значительно проще. Просматривайте сайты уверенно и более безопасно на Wave.
              </span>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <CustomButton className="px-8 custom-button items-center">Подробнее</CustomButton>
            </div>
          </div>
          <div className="flex flex-col text-left max-w-xl">
            <span className="font-bold my-2">___________</span>
            <span>
              Input Studios Wave помогает оставаться защищенным во время просмотра веб-страниц,
              блокируя фишинг и атаки вредоносных программ.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-20 theme-container browser">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 text-left text-container">
            <span className="text-3xl mt-2 sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl">
              Работайте продуктивнее
            </span>
            <span className="text-xl mt-4">
              Сосредоточьтесь, управляйте своим временем в Интернете с помощью Input Studios Wave.
              Оснащенный быстрым поиском на основе искусственного интеллекта, действиями браузера,
              организацией вкладок и расширенными функциями производительности, Wave создан, чтобы
              помочь вам делать больше с каждой минутой, проведенной в Интернете.
            </span>
            <div className="inline-block mt-10">
              <CustomButton>Подробнее</CustomButton>
            </div>
            <div className="productivity-work flex flex-row bg-gray-200 dark:bg-gray-800 rounded-xl p-10 mt-16 items-center justify-center">
              <span className="text-center">
                Получите в среднем на 25 минут больше времени автономной работы благодаря режиму
                эффективности. Только в Input Studios Wave.
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
            <img
              src="/images/apps/wave/productivity.jpg"
              alt="ProductivityWork"
              className="w-500 h-300 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div className="mx-20 theme-container browser bg-gray-200 dark:bg-gray-800 rounded-xl p-10">
        <div className="flex flex-row w-full">
          <div className="flex flex-col justify-end items-start w-2/4 h-1/4 mr-auto image">
            <img
              src="/images/apps/wave/games.png"
              alt="BusinessBrowser"
              className="w-500 h-300 object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-col w-2/5 text-left text-container order-last">
            <span className="text-4xl mt-2">Используйте лучший браузер для игр</span>
            <span className="text-xl mt-4">
              Благодаря оптимизации облачных игр, такой как Clarity Boost, режиму экономии памяти и
              поддержке популярных тем и расширений, Input Studios Wave является лучшим браузером
              для игр в Интернете, предоставляя вам доступ к бесплатным играм.
            </span>
            <div className="inline-block mt-10">
              <CustomButton>Подробнее</CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 theme-container browser">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 text-left text-container">
            <span className="text-4xl mt-2">Ознакомьтесь с лучшим браузером для бизнеса</span>
            <span className="text-xl mt-4">
              Если вы ищете быстрый и безопасный браузер для бизнеса с наиболее эффективными
              функциями от Input Studios, можете смело остановить свой выбор на Input Studios Wave.
            </span>
            <div className="inline-block mt-10">
              <CustomButton>Подробнее</CustomButton>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
            <img
              src="/images/apps/wave/business.jpg"
              alt="BusinessBrowser"
              className="w-500 h-300 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div className="mx-20 theme-container browser">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col order-first md:order-first w-full md:w-2/5 text-left text-container">
            <span className="text-4xl mt-2">Просматривайте веб-страницы с помощью Wave на любых устройствах</span>
            <span className="text-xl mt-4">
              Легко синхронизируйте свои пароли, избранное и параметры на любых устройствах с Windows, macOS, iOS и Android.
            </span>
            <div className="inline-block mt-10">
              <Link to={`${languagePrefix}/wave/download`}>
                <CustomButton CustomButton>Скачать для вашего устройства</CustomButton>
              </Link>
            </div>
          </div>
          <div className="flex flex-col order-last md:order-last w-full md:w-3/5 justify-end items-end mt-6 md:mt-0 h-1/4 ml-auto">
            <div className="flex gap-6 w-full justify-end md:w-auto">
              <img
                src="../images/apps/wave/notebook.jpg"
                alt="Image 1"
                className="image-devices rounded-lg mt-6 w-full sm:w-1/3 md:w-1/4 lg:w-[180px] transition-all duration-500"
              />
              <img
                src="../images/apps/wave/smartphone.jpg"
                alt="Image 2"
                className="image-devices rounded-lg mt-6 w-full sm:w-1/3 md:w-1/4 lg:w-[180px] transition-all duration-500"
              />
              <img
                src="../images/apps/wave/tablet.jpg"
                alt="Image 3"
                className="image-devices rounded-lg mt-6 w-full sm:w-1/3 md:w-1/4 lg:w-[180px] transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
