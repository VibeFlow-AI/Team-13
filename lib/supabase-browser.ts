'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from './database.types';

/**
 * Creates and returns a Supabase client for use in client components.
 * This function is wrapped in a memoization to ensure we don't create multiple instances.
 */
export const createSupabaseBrowserClient = () => {
  return createClientComponentClient<Database>();
};
