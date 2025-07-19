'use client'

import { useState, useEffect } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/supabase-js';
import { initTestAccounts } from '@/lib/initTestAccounts';
import { Database } from '@/lib/database.types';

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  // Ensure we create the client only once per mount.
  const [supabase] = useState(() => createPagesBrowserClient<Database>());

  // Initialize test accounts in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initTestAccounts();
    }
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  );
}
