import CookieConsent from 'react-cookie-consent';

const CookieConsentNotification = () => {
   return (
      <CookieConsent
         location="bottom"
         buttonText="Allow"
         declineButtonText="Deny"
         declineButtonStyle={{
         padding: '12px 32px',
         'border-radius': '4px',
         'background-color': '#d5d7da',
         outline: 'none',
         border: 'none',
         color: '#7c828d',
         'font-size': '14px',
         'font-weight': '500',
         }}
         buttonStyle={{
         padding: '12px 32px',
         'border-radius': '4px',
         'background-image': 'linear-gradient(68deg, #72be77, #00a0fd)',
         outline: 'none',
         border: 'none',
         color: 'white',
         'font-size': '14px',
         'font-weight': '500',
         border: '1px solid transparent',
         'border-image': 'linear-gradient(89deg, #72be44, #00a0fd)',
         'border-image-slice': '1',
         }}
         expires={150}
         enableDeclineButton
      >
         We use cookies to offer you a better browsing experience, analyze site
         traffic, and personalize content. Read about how we use cookies and how
         you can control them by visiting our Cookie Settings page. If you continue
         to use this site, you consent to our use of cookies.
      </CookieConsent>
   );
};

export default CookieConsentNotification;
