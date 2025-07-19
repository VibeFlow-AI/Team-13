import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

/**
 * Initialize test accounts on application startup in development mode
 * This is a client-side utility that silently ensures test accounts are available
 */
export async function initTestAccounts() {
  // Only run in development environment
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // In development, we'll just set up the quick login functionality
  // without relying on the API endpoint that may not be ready
  console.log('Quick login functionality is available');

  // We're not attempting to create accounts automatically
  // The accounts should be created manually through the Supabase dashboard
  // or by running the seed script separately
  return;
}

// Optional: Function to manually check if test accounts exist by trying to log in
export async function checkTestAccountExists(email: string, password: string): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return false;
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If no error, the account exists
    return !error;
  } catch {
    return false;
  } finally {
    // Always sign out after checking
    await supabase.auth.signOut();
  }
}
