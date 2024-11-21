import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarProfile from '../components/SidebarProfile';
import DashProfile from '../components/DashProfile';
import DashPrivacy from '../components/DashPrivacy';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComponent from '../components/DashboardComponent';
import DashAccount from '../components/DashAccount';
import SidebarBlog from '../components/SidebarBlog';
import DashSecurity from '../components/DashSecurity';
import DashAddressBook from '../components/DashAddressBook';
import DashPrivacyAdSettings from '../components/DashPrivacyAdSettings';
import DashManagingCommunicationPermissions from '../components/DashManagingCommunicationPermissions';
import DashSettings from '../components/DashSettings';

export default function Dashboard() {
   const location = useLocation();
   const [tab, setTab] = useState('');

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
      }
   }, [location.search]);

   useEffect(() => {
      if (tab === "privacy/ad-settings" || tab === "profile/communications") {
         window.scrollTo(0, 0);
      }
   }, [tab]);

   return (
      <div className="min-h-screen flex flex-col md:flex-row mt-[50px]">
         <div className="md:w-64">
            {/* Sidebar */}
            <SidebarProfile />
            <SidebarBlog />
         </div>
         {tab === "account" && <DashAccount />}
         {/* Profile */}
         {tab === "profile" && <DashProfile />}
         {/* Profile */}
         {tab === "profile/communications" && <DashManagingCommunicationPermissions />}
         {/* Privacy */}
         {tab === "privacy" && <DashPrivacy />}
         {/* Privacy Ad Settings*/}
         {tab === "privacy/ad-settings" && <DashPrivacyAdSettings />}
         {/* Security */}
         {tab === "security" && <DashSecurity />}
         {/* Post */}
         {tab === "posts" && <DashPosts />}
         {/* Users */}
         {tab === "users" && <DashUsers />}
         {/* Comments */}
         {tab === "comments" && <DashComments />}
         {/* Address book */}
         {tab === "addresses" && <DashAddressBook />}
         {/* Dashboard Component */}
         {tab === "dash" && <DashboardComponent />}
         {/* Settings App */}
         {tab === "settings" && <DashSettings />}
      </div>
   );
}
