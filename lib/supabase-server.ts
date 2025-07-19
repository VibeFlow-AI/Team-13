import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';

/**
 * Returns a fully configured Supabase client for the current request context (App Router).
 */
export const createSupabaseServerClient = async () => {
  // `cookies()` is now async in Next 15; await it at runtime but cast to any to align types.
  const cookieStore = (await cookies()) as any;
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};
