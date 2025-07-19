# Supabase Integration Guide

This guide explains how to use Supabase in this application for data access and management.

## Setup

The project is already configured with Supabase integration. The necessary environment variables are set in the `.env` file:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (for client-side operations)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

## File Structure

- `lib/database.types.ts`: TypeScript types for database tables based on the schema
- `lib/supabase-server.ts`: Server-side Supabase client
- `lib/supabase-browser.ts`: Client-side Supabase client
- `lib/supabase-utils.ts`: Utility functions for common database operations
- `hooks/use-supabase.ts`: React hook for using Supabase in client components

## Database Schema

The database has the following tables:

1. `users`: Core user data linked to authentication
2. `students`: Student profile information linked to a user
3. `mentors`: Mentor profile information linked to a user
4. `sessions`: Session bookings between students and mentors
5. `_prisma_migrations`: Internal table for migration tracking

## Usage Examples

### Server Component

```tsx
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_type', 'mentor');

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div>
      <h1>Mentors</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Client Component with Hook

```tsx
'use client';

import { useSupabase } from '@/hooks/use-supabase';
import { useEffect, useState } from 'react';
import { User } from '@/lib/supabase-utils';

export function UserProfile({ userId }: { userId: string }) {
  const { supabase, isLoading } = useSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase || isLoading) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setUser(data);
      }
    };

    fetchUser();
  }, [supabase, isLoading, userId]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Using Utility Functions

```tsx
'use client';

import { useState } from 'react';
import { createMentor, getMentorByUserId } from '@/lib/supabase-utils';

export function MentorRegistration({ userId }: { userId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const mentorData = {
        user_id: userId,
        age: Number(formData.get('age')),
        location: formData.get('location') as string,
        current_position: formData.get('position') as string,
        institution_company: formData.get('institution') as string,
        years_experience: Number(formData.get('experience')),
        bio: formData.get('bio') as string,
        expertise_areas: (formData.get('expertise') as string).split(','),
        preferred_subjects: (formData.get('subjects') as string).split(','),
        student_levels: (formData.get('levels') as string).split(','),
        availability: (formData.get('availability') as string).split(','),
        session_rate: Number(formData.get('rate')),
        teaching_experience: formData.get('teachingExperience') as string
      };

      await createMentor(mentorData);
      // Handle success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form rendering...
}
```

## Type Safety

The integration provides full TypeScript support for your database schema, helping to catch errors at compile-time instead of runtime.

## Security Considerations

1. **Client-side**: Only use `createSupabaseBrowserClient()` in client components. The browser client uses the anonymous key which is subject to Row Level Security (RLS) policies set in Supabase.

2. **Server-side**: Use `createSupabaseServerClient()` in server components or route handlers. This uses more privileged access but is secure because the code only runs on the server.

3. **Never** expose your `SUPABASE_SERVICE_ROLE_KEY` in client-side code.

## Example Page

Check out `/app/examples/supabase/page.tsx` for a complete example showing both client and server-side data fetching patterns.