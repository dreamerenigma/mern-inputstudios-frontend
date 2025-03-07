const links = (languagePrefix) => [
   {
      textUrl: 'privacy:data_subject_requests',
      text: 'privacy:dsr_recommendations',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:data_protection_addendum',
      text: 'privacy:data_processing_terms',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:product_terms',
      text: 'privacy:product_conditions',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:compliance_requirements',
      text: 'privacy:compliance_resources',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:security_trust_center',
      text: 'privacy:security_resources',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:service_trust_portal',
      text: 'privacy:cloud_security_info',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
   {
      textUrl: 'privacy:threat_response_center',
      text: 'privacy:report_vulnerability',
      url: `${languagePrefix}/privacy/privacystatement`,
   },
];

export default links;
