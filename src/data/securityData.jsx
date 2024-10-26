import { Button } from "flowbite-react";
import { BsShieldLockFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { TbShieldCheckeredFilled } from "react-icons/tb";

const securityData = [
   {
      id: 0,
      icon: <RiComputerFill className="text-xl" />,
      title: "Device",
      description: "Find, repair, and manage your devices",
      content: (
         <>
         </>
      ),
      relatedLinks: [
         { text: "Schedule a repair", url: "/devices" },
         { text: "Find my device", url: "/find-my-device" },
         { text: "Online support", url: "/online-support" },
      ]
   },
   {
      id: 1,
      icon: <BsShieldLockFill className="text-xl" />,
      title: "Privacy",
      description: "Manage your privacy settings for Input Studios products",
      content: (
         <>
            <p className="font-semibold text-xl mb-4">Privacy dashboard</p>
            <p className="mb-4">
               The privacy dashboard is where you can manage your data that Input Studios saves to the cloud
               as well as your settings for the Input Studios products and services you use.
            </p>
            <Button
               className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
               style={{ width: "160px" }}
               onClick={() => alert("Privacy button clicked")}
            >
               Privacy dashboard
            </Button>
         </>
      ),
      relatedLinks: [
         { text: "Privacy Statement", url: "/privacystatement" },
         { text: "Apps and services that can access your data", url: "/consent/manage" }
      ],
      imageSrc: "/images/privacy.svg"
   },
   {
      id: 2,
      icon: <TbShieldCheckeredFilled className="text-xl" />,
      title: "Security",
      description: "Tools to help keep you safe online",
      content: (
         <>
            <p className="font-semibold text-xl mb-4">Privacy dashboard</p>
            <p className="mb-4">
               The privacy dashboard is where you can manage your data that Input Studios saves to the cloud
               as well as your settings for the Input Studios products and services you use.
            </p>
            <Button
               className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
               style={{ width: "170px" }}
               onClick={() => alert("Privacy button clicked")}
            >
               Security dashboard
            </Button>
         </>
      ),
      relatedLinks: [
         { text: "Stay secure with Windows", url: "/proofs/manage/additional" },
         { text: "Learn more about digital security", url: "/security" }
      ],
      imageSrc: "/images/security.svg"
   },
];

export default securityData;
