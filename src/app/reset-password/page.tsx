import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { LogoMark } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Reset Password - ReviewHub',
  description: 'Reset your ReviewHub password',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/">
              <LogoMark size="lg" />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reset password</h1>
            <p className="text-gray-500 mt-2">We&apos;ll help you get back in</p>
          </div>

          <PasswordResetForm />
        </div>
      </div>
    </div>
  );
}
