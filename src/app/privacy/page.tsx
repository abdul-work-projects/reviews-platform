import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Privacy Policy - ReviewHub',
  description: 'Learn how ReviewHub collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account,
      submit a review, or contact us for support. This may include:

      • Name and email address
      • Account credentials
      • Review content and ratings
      • Communication preferences
      • Any other information you choose to provide`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

      • Provide, maintain, and improve our services
      • Process and display your reviews
      • Send you technical notices and support messages
      • Respond to your comments and questions
      • Detect and prevent fraudulent or abusive activity
      • Personalize your experience on our platform`,
    },
    {
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information in the following circumstances:

      • With your consent or at your direction
      • With vendors and service providers who need access to perform services
      • In response to legal process or government requests
      • To protect our rights, privacy, safety, or property
      • In connection with a merger, acquisition, or sale of assets`,
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal
      information against unauthorized access, alteration, disclosure, or destruction. However, no method
      of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

      • Access the personal information we hold about you
      • Request correction of inaccurate information
      • Request deletion of your personal information
      • Opt out of marketing communications
      • Export your data in a portable format`,
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to collect information about your browsing activities.
      You can control cookies through your browser settings. For more information, please see our Cookie Policy.`,
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by
      posting the new policy on this page and updating the "Last Updated" date.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at:

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
            <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Your Privacy Matters</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-600">
            Last Updated: November 29, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-12">
          <p className="text-gray-600 leading-relaxed mb-8">
            At ReviewHub, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
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
