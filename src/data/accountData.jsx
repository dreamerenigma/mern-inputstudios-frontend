import { Button } from "flowbite-react";
import { BsCart4, BsShieldLockFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { TbShieldCheckeredFilled } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";

const accountData = [
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
               The privacy dashboard is where you can manage your data that Microsoft saves to the cloud
               as well as your settings for the Microsoft products and services you use.
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
               The privacy dashboard is where you can manage your data that Microsoft saves to the cloud
               as well as your settings for the Microsoft products and services you use.
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
   {
      id: 3,
      icon: <FaRegCreditCard className="text-xl" />,
      title: "Payment options",
      description: "Manage how you pay for purchases with your Input Studios account",
      content: (
         <>
         <p className="font-semibold text-xl mb-4">Privacy dashboard</p>
         <p className="mb-4">
            The privacy dashboard is where you can manage your data that Microsoft saves to the cloud
            as well as your settings for the Microsoft products and services you use.
         </p>
         <Button
            className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
            style={{ width: "160px" }}
            onClick={() => alert("Privacy button clicked")}
         >
            Privacy Dashboard
         </Button>
         </>
      ),
      relatedLinks: [
         { text: "View transactions", url: "/billing/payments" },
         { text: "View notifications", url: "/billing/payments" }
      ],
   },
   {
      id: 4,
      icon: <BsCart4 className="text-xl" />,
      title: "Order history",
      description: "View recent purchases made with your Input Studios account",
      content: (
         <>
            <p className="mb-4">No purchases made in the past 3 months</p>
         </>
      ),
      relatedLinks: [
         { text: "Get billing help", url: "/account" },
         { text: "View order history", url: "/billing/orders" }
      ],
   },
   {
      id: 5,
      icon: <MdManageAccounts className="text-xl" />,
      title: "Manage account",
      description: "View recent purchases made with your Input Studios account",
      content: (
         <>
         </>
      ),
      relatedLinks: [
         { text: "Get billing help", url: "/account" },
         { text: "View order history", url: "/billing/orders" }
      ],
   },
];

export default accountData;
