// app/login/page.tsx
import type { Metadata } from 'next';
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Sign In
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}