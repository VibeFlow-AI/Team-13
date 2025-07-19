import { cookies, headers } from 'next/headers';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

/**
 * Returns a fully configured Supabase client for the current request context (App Router).
 */
export const createSupabaseServerClient = () =>
  createServerSupabaseClient({ headers, cookies }); 