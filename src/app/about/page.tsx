import { BuildingOffice2Icon, UserGroupIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'About Us - ReviewHub',
  description: 'Learn more about ReviewHub and our mission to help people find trusted vendors.',
};

export default function AboutPage() {
  const values = [
    {
      icon: HeartIcon,
      title: 'Trust & Transparency',
      description: 'We believe in honest, unbiased reviews that help people make informed decisions.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: UserGroupIcon,
      title: 'Community First',
      description: 'Our platform is built by and for our community of reviewers and vendors.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: SparklesIcon,
      title: 'Quality Matters',
      description: 'We maintain high standards for reviews and vendors on our platform.',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <BuildingOffice2Icon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Our Story</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Building Trust in the
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Digital Marketplace
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            ReviewHub was founded with a simple mission: to help people find trusted vendors
            and services through honest, community-driven reviews. We believe that everyone
            deserves access to reliable information when making important decisions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We&apos;re on a mission to create the most trusted platform for vendor reviews.
                Every day, thousands of people use ReviewHub to discover new services,
                share their experiences, and help others make better choices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Since our founding, we&apos;ve helped millions of users find reliable vendors
                across hundreds of categories. Our commitment to authenticity and transparency
                has made us the go-to resource for honest reviews.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-indigo-600">25K+</p>
                <p className="text-gray-600 mt-2">Active Users</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-amber-600">10K+</p>
                <p className="text-gray-600 mt-2">Reviews</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-emerald-600">500+</p>
                <p className="text-gray-600 mt-2">Vendors</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-rose-600">4.8</p>
                <p className="text-gray-600 mt-2">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at ReviewHub.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
