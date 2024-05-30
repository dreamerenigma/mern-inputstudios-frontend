import { Button } from "flowbite-react";

export default function CallToDownload() {
   return (
      <a href="https://github.com/InputStudios" target="_blank" rel="noopener noreferrer" className="block">
         <div className="flex flex-col sm:flex-row p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center cursor-pointer">
            <div className="flex-1 justify-center flex flex-col">
               <h2 className="text-2xl">
                  Want to know more about our projects?
               </h2>
               <p className="text-gray-500 my-2">
                  Check out the GitHub repositories for our projects
               </p>
               <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
                  Input Studios Projects
               </Button>
            </div>
            <div className="p-7 flex-1">
               <img src="/images/bg_programmer.jpg" alt="JavaScript Image" />
            </div>
         </div>
      </a>
   );
}
