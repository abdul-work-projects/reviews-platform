import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Cookie Policy - ReviewHub',
  description: 'Learn how ReviewHub uses cookies and similar technologies.',
};

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.',
      examples: ['Session management', 'Authentication', 'Security'],
    },
    {
      name: 'Performance Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.',
      examples: ['Page views', 'Load times', 'Error tracking'],
    },
    {
      name: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.',
      examples: ['Language preferences', 'Theme settings', 'User preferences'],
    },
    {
      name: 'Targeting Cookies',
      description: 'These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites.',
      examples: ['Ad personalization', 'Interest tracking', 'Marketing analytics'],
    },
  ];

  const sections = [
    {
      title: 'What Are Cookies?',
      content: `Cookies are small text files that are placed on your device when you visit a website. They are
      widely used to make websites work more efficiently, as well as to provide information to the owners
      of the site. Cookies help us understand how you use our platform and how we can improve your experience.`,
    },
    {
      title: 'How We Use Cookies',
      content: `We use cookies and similar technologies for several purposes:

      • To keep you signed in to your account
      • To remember your preferences and settings
      • To understand how you use our platform
      • To improve our services based on this information
      • To deliver relevant content and recommendations`,
    },
    {
      title: 'Third-Party Cookies',
      content: `Some cookies are placed by third-party services that appear on our pages. We use trusted
      third-party services for analytics and functionality. These third parties may use cookies to track
      your activities on our site and other websites. We do not control these cookies and recommend
      reviewing the privacy policies of these third parties.`,
    },
    {
      title: 'Managing Cookies',
      content: `Most web browsers allow you to control cookies through their settings. You can:

      • View cookies stored on your device
      • Delete existing cookies
      • Block cookies from specific sites
      • Block all cookies from being set
      • Set preferences for certain types of cookies

      Please note that blocking certain cookies may impact your experience on our platform.`,
    },
    {
      title: 'Browser Settings',
      content: `Here's how to manage cookies in popular browsers:

      • Chrome: Settings > Privacy and Security > Cookies
      • Firefox: Options > Privacy & Security > Cookies
      • Safari: Preferences > Privacy > Cookies
      • Edge: Settings > Privacy & Security > Cookies

      For other browsers, please check the browser's help documentation.`,
    },
    {
      title: 'Updates to This Policy',
      content: `We may update this Cookie Policy from time to time to reflect changes in technology,
      legislation, or our data practices. Any changes will be posted on this page with an updated
      revision date.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about our use of cookies, please contact us at:

      Email: privacy@reviewhub.com
      Address: 123 Review Street, San Francisco, CA 94102`,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <CursorArrowRaysIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Cookie Policy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Cookie Policy
          </h1>

          <p className="text-gray-600">
            Last Updated: November 29, 2024
          </p>
        </div>

        {/* Cookie Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Types of Cookies We Use</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {cookieTypes.map((type) => (
              <div
                key={type.name}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example) => (
                    <span
                      key={example}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-12">
          <p className="text-gray-600 leading-relaxed mb-8">
            This Cookie Policy explains how ReviewHub uses cookies and similar tracking technologies
            when you visit our platform.
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {index + 1}. {section.title}
                </h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
