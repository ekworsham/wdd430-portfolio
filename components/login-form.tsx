// components/login-form.tsx
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

// *******Use Session Greeting import and export*********************************
import { useSession } from 'next-auth/react';

export function UserGreeting() {
  const { data: session } = useSession();
  return <span>{session?.user?.name}</span>;
}
  // ***************************************************************************

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" minLength={6} required />
      </div>
      <button aria-disabled={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </form>
  );
}