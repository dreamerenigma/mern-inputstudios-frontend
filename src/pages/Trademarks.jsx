import colors from "../utils/colors";
import Divider from "../components/Divider";
import ListItem from "../components/lists/listItem";
import { faCheck, faCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";
import { BiLogoFigma } from "react-icons/bi";

export default function Trademarks() {
  const { t } = useTranslation();

  return (
    <div className="relative mx-12">
      <img className="w-full max-h-[450px] h-auto object-cover" src="../images/trademark.webp" alt="trademarks" />
      <div className="absolute top-36 left-12 bg-white p-4 border border-black">
        <h2 className="p-10 text-3xl font-bold text-black break-words">
          Input Studios Trademark and Brand Guidelines
        </h2>
      </div>
      <h1 className="mt-12 text-4xl font-bold">Thank you for helping us protect our trademarks and brand assets</h1>
      <p className="mt-6 text-base">Input Studios is grateful for the trust that people place in our products, services, and experiences. These Trademark and Brand Guidelines (“Trademark Guidelines”) detail how you can help us protect Input Studios’s brand assets, including logos, names, app and product icons, and the trust that they represent. We have created these Trademark Guidelines to help clarify proper usage of our brand assets. Input Studios reserves the right to take action as necessary to protect them and, as a result, protect its customers and the public.</p>
      <p className="mt-6 text-base">Input Studios’s brand assets—including the Input Studios Trademarks (PDF) (as updated from time to time), logos, icons, designs, trade dress, fonts, names of Input Studios software, products, services, sounds, emojis, and any other brand features and elements, whether registered or unregistered (“Brand Assets”)—are proprietary assets owned exclusively by Input Studios and its group of companies. These Trademark Guidelines, which may be updated from time to time, detail how our Brand Assets can be used under specific circumstances. To help illustrate use cases, Contoso is used as the fictitious partner brand. Many uses, including our logos, app and product icons, and other designs, will require a license first. Unless you have an express license from Input Studios, these Trademark Guidelines will exclusively govern your use of our Brand Assets.</p>
      <h1 className="mt-16 text-4xl font-bold">Examples of uses governed by these Trademark Guidelines</h1>
      <ul className="mt-4 list-disc list-outside pl-6 text-base">
        <li className="mt-4">Don’t miss Contoso’s Memorial Day sale featuring a limited time discount on <b>Input Studios Workspace</b> software.</li>
        <li className="mt-4">The Contoso Game can be played on <b>Xbox</b> gaming consoles.</li>
        <li className="mt-4">The Contoso App works with <b>Input Studios Teams.</b></li>
      </ul>
      <h1 className="mt-8 text-4xl font-bold">Examples of Brand Assets requiring authorization from Input Studios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
        <div className="p-4">
          <img src="../images/logo_Input_Studios_grey.png" alt="logo"/>
          <h1 className="mt-16 font-bold text-2xl">Input Studios logo</h1>
          <p className="mt-4">See Specific Brand and Product Guidelines section for more information on use requirements.</p>
        </div>
        <div className="p-4">
          <img src="../images/logo_Input_Studios_grey.png" alt="logo"/>
          <h1 className="mt-16 font-bold text-2xl">Input Studios logo lockups</h1>
          <p className="mt-4">These include logo lockups for flagship offerings, which are offerings that are aligned to and signal Input Studios’s long-term strategic intent. They include Input Studios 365, Input Studios Azure, Input Studios Surface, among others. See Specific Brand and Product Guidelines for more information.</p>
        </div>
        <div className="p-4">
          <img src="../images/logo_Input_Studios_grey.png" alt="logo"/>
          <h1 className="mt-16 font-bold text-2xl">Input Studios product icons</h1>
          <p className="mt-4">These include app icons for products such as Input Studios 365, Input Studios Dynamics, Input Studios Azure, and others. See Specific Brand and Product Guidelines section for more information.</p>
        </div>
        <div className="p-4">
          <img src="../images/logo_Input_Studios_grey.png" alt="logo"/>
          <h1 className="mt-16 font-bold text-2xl">Badges</h1>
          <p className="mt-4">This includes badges to show designations or relationships between your product and Input Studios.</p>
        </div>
      </div>
      <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
      <h1 className="mt-8 text-4xl font-bold">Dos and don’ts</h1>
      <p className="mt-2">To help you understand what you can and can’t do with Microsoft’s Brand Assets, we have created this non-exhaustive list of Dos and Don’ts. In general, wordmarks can be used to truthfully convey information about your product or service, as long as customers and the public will not be confused into believing Microsoft is affiliated with or endorses your product or service. However, our logos, app and product icons, illustrations, photographs, videos, and designs can never be used without an express license. Please review these additional tips to better understand how you can more clearly communicate the role that our Brand Assets convey in your communications.</p>
      <h1 className="mt-8 text-4xl font-bold">Dos</h1>
      <p className="mt-6">In general, you may do the following with Microsoft’s wordmarks and names of software, products, or services:</p>
      <ul className="mt-4 list-none text-base">
        <ListItem icon={faCheck} size="2x">
          Note if your product, service, or solution is interoperable or compatible with a Microsoft product, service, or solution. Communicate if your product, service, or solution goes through the approved certification process.
          <ul className="mt-6 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso headphones are compatible with Microsoft Surface.
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso app is certified for Microsoft Teams.
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          If your product, service, or solution integrates with a Microsoft technology, clearly communicate the relationship. For more information on this integration scenario, visit the guidelines for partner-led marketing under the Resources section below.
          <ul className="mt-6 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso software works with Microsoft OneDrive
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso app is built on Microsoft Azure
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso is a new device designed for Microsoft Teams Rooms
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso is integrated with Microsoft 365
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          Truthfully and accurately refer to Microsoft and its products and services.
          <ul className="mt-2 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Contoso is a three-dimensional model city created by students using Minecraft gaming software.
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Used Xbox gaming console for sale!
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Join us for a seminar about mixed reality in the real estate industry, including the use of the Microsoft HoloLens technology.
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          Use without alteration in text to refer to Microsoft and its products and services.
          <ul className="mt-2 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Follow these steps to format mail merge letters using Microsoft Word software.
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              CRM is easy with Microsoft Dynamics 365 applications.
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Microsoft Azure provides enterprise-level cloud computing solutions.
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          Note when a product or service has met Microsoft’s accessibility requirements.
          <ul className="mt-2 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              The Contoso case has met Microsoft’s accessibility requirements for Microsoft Surface products.
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          Use in the title of news articles, when truthful and not misleading.
          <ul className="mt-2 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Microsoft releases new Xbox console
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Microsoft Azure is adding new features on July 1st
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Microsoft partners with Contoso to add new AI capabilities
            </ListItem>
          </ul>
        </ListItem>
        <ListItem icon={faCheck} size="2x">
          Use less prominently than your own brand or company name unless you have a strategic partnership agreement.  Visit the Microsoft partner website for more information on partner branding.
          <ul className="mt-2 ml-8 list-none">
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Sublist item with empty circle.
            </ListItem>
            <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
              Another sublist item with empty circle.
            </ListItem>
          </ul>
        </ListItem>
      </ul>
      <h1 className="mt-8 text-4xl font-bold">Don’ts</h1>
      <p className="mt-6">Without a written license or express permission under one of Microsoft`s other published guidelines (e.g., Specific Brand and Product Guidelines below), don’t do the following:</p>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s Brand Assets in the name of your business, product, service, app, domain name, social media account, other offering, or business indicator.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Contoso OneDrive software.
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Contoso Surface headphones.
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            www.azurevirtualmachine.com
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s logos, icons, or designs, in any manner.
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t imply an affiliation, endorsement, sponsorship, or approval with or by Microsoft.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Minecraft Builder LLC builds three-dimensional models.
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Contoso offers premium Microsoft 365 installation & support services
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Input Studios Chatify has certified the Contoso CP1 headset.
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t alter, animate, distort, or misappropriate Microsoft’s Brand Assets, for example, by combining Microsoft’s Brand Assets with other terms, misspellings, or incorporating them into a tagline or slogan, etc.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Microsoft Wordsmithing is Easy!
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Use Microsoft Powerful Platform
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Rest Azured that your data is safe with Microsoft
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            ContosoDynamics
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Contoso Excels at Spreadsheet Development!
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s Brand Assets as nouns or verbs.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            You can Excel with Microsoft
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            We’re selling new Microsoft Surfaces
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s Brand Assets in entertainment titles (including book, films, and magazines).
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            PowerPointalism
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Azure Daily
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s Brand Assets more prominently than your own brand(s) or company name.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            MICROSOFT SOFTWARE
            Contoso installs Microsoft software – call us today!
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t use Microsoft’s Brand Assets in the name of a user group, fan group, tech communities, or other organization name, irrespective of whether the group or organization is a non-profit.
        <ul className="mt-6 ml-8 list-none">
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Dynamics User Group
          </ListItem>
          <ListItem icon={faCircle} iconClass="text-gray-500" bold={false} size="lg">
            Microsoft 365 Technology Group
          </ListItem>
        </ul>
      </ListItem>
      <ListItem icon={faClose} size="2x">
        Don’t file any application or recordation to register terms or logos identical or similar to Microsoft’s Brand Assets as a trademark, service mark, trade name, doing business as designation, or any other proprietary right.
      </ListItem>
      <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
      <h1 className="mt-8 text-4xl font-bold">App guidelines</h1>
      <p className="mt-4">Without a license arrangement with Microsoft, everything about your app (including developer name, app name, logo, description, screenshots, and other app collateral) must be unique to you and free of Microsoft’s Brand Assets. The only exception is that you may truthfully state whether your app is compatible or interoperable with a Microsoft product or service within the text description about your app. If your app is integrated with a Microsoft technology, follow the guidelines for partner-led marketing under the Resources section below.</p>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Examples of approved app details</h2>
          <ul className="mt-4 ml-10 list-disc list-outside">
            <li>Developer: Contoso Developer, Inc.</li>
            <li className="mt-4">App name: Contoso App</li>
            <li className="mt-4">Image/screenshots: No Microsoft Content Featured</li>
            <li className="mt-4">Description: Contoso App allows you to access Microsoft OneDrive content and share it with your CRM contacts at the push of a button.</li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Examples of unapproved app details</h2>
          <ul className="mt-4 ml-10 list-disc list-outside">
            <li>Developer: Azure Development Co.</li>
            <li className="mt-4">App name: Azure To Go</li>
            <li className="mt-4">Image/screenshots: Microsoft Logo, Azure App Icon Featured</li>
            <li className="mt-4">Description: Azure To Go brings the Azure cloud services to your mobile phone.</li>
          </ul>
        </div>
      </div>
      <p className="mt-12 ">You may not use Microsoft’s Brand Assets in a manner that implies Microsoft published, developed, endorsed, is affiliated with, or is otherwise connected with your app. Furthermore, Microsoft’s logos, designs, and icons can never be used as your app icon and can only be used in your app advertisements with a license agreement in place.</p>
      <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
      <h1 className="mt-8 text-4xl font-bold">Copyrighted content</h1>
      <p className="mt-6">Visit Use of Microsoft copyrighted content to learn how to use photography, box shots, and screenshots.</p>
      <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
      <h1 className="mt-8 text-4xl font-bold">Legal notice</h1>
      <p className="mt-6 ">Any use of Microsoft’s Brand Assets inures solely to Microsoft’s benefit and all use must comply with these Trademark Guidelines, or other licensing/contractual arrangements with Microsoft. Third parties, including licensees, may never claim ownership rights in Microsoft’s Brand Assets, or brands that are confusingly similar to Microsoft’s Brand Assets, in any manner, including without limitation as a trademark, service mark, company name or designation, domain name, social media profile/handle, or in any other manner.</p>
      <p className="mt-6">Microsoft expressly reserves the right in its sole discretion to terminate, revoke, modify, or otherwise change permission to use its Brand Assets at any time and expressly reserves the right to object to any use or misuse of its Brand Assets in any jurisdiction worldwide.</p>
      <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
      <h1 className="mt-8 text-4xl font-bold">Resources</h1>
      <p className="mt-6">If your proposed use falls outside of these Trademark Guidelines or the Specific Brand and Product Guidelines linked above, the use is not permitted unless you seek approval from an appropriate contact within Microsoft. If you have a question, please contact your legal counsel, Microsoft business contact, or trademarks@microsoft.com.</p>
      <p className="mt-6">You may find the following helpful if you didn’t find what you were looking for above.</p>
      <ul className="mt-4 ml-10 list-disc list-outside">
        <li><a href="https://support.inputstudios.ru/support-for-business" className="text-blue-500 underline">Business Support</a></li>
        <li className="mt-4"><a href="https://news.inputstudios.ru/resourcespage" className="text-blue-500 underline">Press Tool Kit</a></li>        
        <li className="mt-4"><a href="https://support.inputstudios.ru/support-for-business" className="text-blue-500 underline">Partner-led Marketing Guidelines (form)</a></li>
        <li className="mt-4"><a href="https://partner.inputstudios.ru/community/my-partner-hub/branding" className="text-blue-500 underline">Input Studios Partner Brand Guidelines</a></li>
      </ul>
      <div className="flex flex-wrap gap-4 mt-16 mb-16 ">
        <p>{t("home_subscribe_news")}</p>
        <div className="flex flex-wrap gap-4">
          <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
          <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={BsYoutube} />
          <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={BiLogoFigma} />
          <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={BsGithub} />
          <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
        </div>
      </div>
    </div>
  );
}
