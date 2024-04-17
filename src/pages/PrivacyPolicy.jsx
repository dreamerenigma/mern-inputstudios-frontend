import { useTranslation } from 'react-i18next';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

export default function About() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen items-center justify-center">
         <div className="mx-auto">
            <div className="relative">
               <img
                  className="w-full max-h-[450px] h-auto"
                  src="https://i.ibb.co/DR26wCp/privacy.png"
                  alt="privacy"
               />
               <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white">
                  <h1 className="text-4xl font-bold lg:text-6xl">Privacy at Input Studios</h1>
                  <h2 className="text-2xl mt-6">Your data is private at work, at home, and on the go.</h2>
                  <p className="text-sm mt-6">At Input Studios, we value, protect, and defend privacy. We believe in transparency, so that people and organizations can control their data and have meaningful choices in how it is used. We empower and defend the privacy choices of every person who uses our products and services.</p>
               </div>
            </div>
            <div className="p-10">
               <h1 className="text-3xl font font-semibold text-center my-7">Our commitment to privacy</h1>
               <p className="text-md text-gray-500 flex flex-col gap-6 text-center">We ground our privacy commitments in strong data governance practices, so you can trust that we’ll protect the privacy and confidentiality of your data and will only use it in a way that’s consistent with the reasons you provided it.</p>
            </div>
            <div className="c-mosaic">
            </div>
            <div className="text-sm p-10">
               <p>These principles form the foundation of the Input Studios approach to privacy and will continue to shape the way we build our products and services.</p>
               <p className='mt-3'>Get more information about how we put those principles into practice.</p>
               <ul className='list-disc mt-3'>
                  <li>We regularly publish the <a href="/privacy-report" className="text-blue-500 underline">Input Studios Privacy Report</a> to keep you updated about our privacy work.</li>
                  <li>We explain how customers can export or delete personal data in our <a href="/faq" className="text-blue-500 underline">Privacy FAQs.</a></li>
                  <li>We offer in-depth privacy information about our products and services in the <a href="/privacystatement" className="text-blue-500 underline">Input Studios Privacy Statement.</a></li>
                  <li>We believe that the technology we create should benefit everyone on the planet, and the planet itself. Visit the Input Studios Corporate Social Responsibility for more information.</li>
               </ul>
            </div>
            <div className=''>
               <nav className=''>
                  <ul className='flex gap-4 items-center justify-center'>
                     <li className="flex items-center">
                        <IoSettingsOutline className="mr-1" color="#3182CE"/>
                        <a href='https://account.inputstudios.com/privacy' className="text-lg text-blue-500  underline">Privacy dashboard</a>
                     </li>
                     <li className="flex items-center">
                        <FaSearch className="mr-1" color="#3182CE"/>
                        <a href='/privacy-report' className="text-lg text-blue-500 underline" >Input Studios Privacy Report</a>
                     </li>
                  </ul>
               </nav>
            </div>
            <div className='mt-10'>
               <h1 className="text-3xl font font-semibold text-center my-7">What's new</h1>
               <p className="text-md text-gray-500 flex flex-col gap-6 text-center">Check out the latest articles, blog posts, and news from Input Studios about protecting your privacy at home and at work. (Some content might only be available in English.)</p>
            </div>
            <div className="flex flex-row justify-center mt-10">
               <section className="mx-4">
                  <div>
                     <img src="https://i.ibb.co/RvxNkCy/whats-new-1.jpg" alt="whats_new_1" className="w-48 h-auto" />
                     <p className='text-lg text-center font-semibold mt-8'>From privacy vulnerability to privacy resilience</p>
                     <p className='text-xs text-center'>Explore why companies that empathize with the privacy concerns of customers and address those concerns build a stronger business, differentiate themselves from competitors, and transform workplace culture.</p>
                  </div>
               </section>
               <section className="mx-4">
                  <div className="divide-x">
                     <img src="https://i.ibb.co/dBZLvST/whats-new-2.jpg" alt="whats_new_1" className="w-48 h-auto" />
                     <p className='text-lg text-center font-semibold mt-8'>From privacy vulnerability to privacy resilience</p>
                     <p className='text-xs text-center'>Explore why companies that empathize with the privacy concerns of customers and address those concerns build a stronger business, differentiate themselves from competitors, and transform workplace culture.</p>
                  </div>
               </section>
               <section className="mx-4">
                  <div className="divide-x">
                     <img src="https://i.ibb.co/bs9TPLF/whats-new-3.png" alt="whats_new_1" className="w-48 h-auto" />
                     <p className='text-lg text-center font-semibold mt-8'>From privacy vulnerability to privacy resilience</p>
                     <p className='text-xs text-center'>Explore why companies that empathize with the privacy concerns of customers and address those concerns build a stronger business, differentiate themselves from competitors, and transform workplace culture.</p>
                  </div>
               </section>
               <section className="mx-4">
                  <div className="divide-x">
                     <img src="https://i.ibb.co/vJb8fd1/whats-new-4.jpg" alt="whats_new_1" className="w-48 h-auto" />
                     <p className='text-lg text-center font-semibold mt-8'>From privacy vulnerability to privacy resilience</p>
                     <p className='text-xs text-center'>Explore why companies that empathize with the privacy concerns of customers and address those concerns build a stronger business, differentiate themselves from competitors, and transform workplace culture.</p>
                  </div>
               </section>
            </div>
            <div className="text-sm mt-20 mb-10">
               <p className='pb-2'>To learn more about privacy at Input Studios, see <a href="/privacy-in-our-products" className="text-blue-500 underline">Input Studios products and your data</a>.</p>
               <p className='pb-2'>To learn about managing your privacy settings, see <a href="/support" className="text-blue-500 underline">Where can I find privacy settings in Input Studios products?</a></p>
               <p className='pb-2'>We’re always working to improve, so if you notice something in our products and services that doesn’t work the way you’d expect when it comes to privacy, please <a href="/concern/privacy" className="text-blue-500 underline">let us know</a>.</p>
            </div>
         </div>
      </div>
   );
}
