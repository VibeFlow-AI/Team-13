/**
 * This file contains a Supabase client with administrative privileges.
 * It should ONLY be used on the server-side and NEVER exposed to the client.
 *
 * The admin client bypasses Row Level Security (RLS) policies, so it can
 * perform operations that would otherwise be restricted.
 */

import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

// Create a Supabase client with the service role key
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false, // Don't store the session in localStorage
      autoRefreshToken: false // Don't automatically refresh the token
    }
  }
);

export { supabaseAdmin };

// Example usage:
//
// import { supabaseAdmin } from '@/lib/supabase-admin';
//
// export async function adminFunction() {
//   // Use this client for admin operations that need to bypass RLS
//   const { data, error } = await supabaseAdmin
//     .from('users')
//     .select('*');
//
//   // Process data...
// }
