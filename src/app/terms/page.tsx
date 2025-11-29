import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Terms of Service - ReviewHub',
  description: 'Read the terms and conditions for using ReviewHub.',
};

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using ReviewHub, you agree to be bound by these Terms of Service and all
      applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
      from using or accessing this site.`,
    },
    {
      title: 'User Accounts',
      content: `To access certain features of our platform, you must create an account. You agree to:

      • Provide accurate and complete information
      • Maintain the security of your account credentials
      • Promptly update any changes to your information
      • Accept responsibility for all activities under your account
      • Notify us immediately of any unauthorized use`,
    },
    {
      title: 'User Content',
      content: `When you submit reviews or other content to our platform, you:

      • Retain ownership of your content
      • Grant us a non-exclusive, worldwide license to use, display, and distribute your content
      • Represent that your content is accurate and does not violate any laws or rights
      • Agree not to submit false, misleading, or defamatory content
      • Accept that we may moderate or remove content at our discretion`,
    },
    {
      title: 'Prohibited Conduct',
      content: `You agree not to:

      • Submit fake or fraudulent reviews
      • Harass, abuse, or harm other users
      • Impersonate any person or entity
      • Attempt to gain unauthorized access to our systems
      • Use automated systems to access our platform without permission
      • Interfere with the proper functioning of our services
      • Violate any applicable laws or regulations`,
    },
    {
      title: 'Vendor Listings',
      content: `Vendor information on our platform is provided for informational purposes only. We do not
      endorse any vendor and are not responsible for the quality of their products or services. Users
      should conduct their own research before engaging with any vendor.`,
    },
    {
      title: 'Intellectual Property',
      content: `The ReviewHub name, logo, and all related names, logos, product and service names, designs,
      and slogans are trademarks of ReviewHub. You may not use these marks without our prior written
      permission. All other names, logos, and marks are the property of their respective owners.`,
    },
    {
      title: 'Disclaimer of Warranties',
      content: `Our platform is provided "as is" without warranties of any kind, either express or implied.
      We do not warrant that our services will be uninterrupted, secure, or error-free. We disclaim all
      warranties, including implied warranties of merchantability and fitness for a particular purpose.`,
    },
    {
      title: 'Limitation of Liability',
      content: `To the fullest extent permitted by law, ReviewHub shall not be liable for any indirect,
      incidental, special, consequential, or punitive damages arising out of your use of our platform.
      Our total liability shall not exceed the amount you paid us, if any, in the past twelve months.`,
    },
    {
      title: 'Indemnification',
      content: `You agree to indemnify and hold harmless ReviewHub and its officers, directors, employees,
      and agents from any claims, damages, losses, or expenses arising out of your use of our platform
      or violation of these terms.`,
    },
    {
      title: 'Changes to Terms',
      content: `We reserve the right to modify these terms at any time. We will notify users of any material
      changes by posting the new terms on this page. Your continued use of our platform after such changes
      constitutes acceptance of the new terms.`,
    },
    {
      title: 'Governing Law',
      content: `These terms shall be governed by and construed in accordance with the laws of the State of
      California, without regard to its conflict of law provisions. Any disputes shall be resolved in the
      courts of San Francisco County, California.`,
    },
    {
      title: 'Contact Information',
      content: `For questions about these Terms of Service, please contact us at:

      Email: legal@reviewhub.com
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
            <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Legal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <p className="text-gray-600">
            Last Updated: November 29, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-12">
          <p className="text-gray-600 leading-relaxed mb-8">
            Please read these Terms of Service carefully before using ReviewHub. These terms govern
            your use of our platform and services.
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
