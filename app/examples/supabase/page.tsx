import { Suspense } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { SupabaseExample } from '@/components/supabase-example';

async function MentorList() {
  const supabase = await createSupabaseServerClient();
  const { data: mentors, error } = await supabase
    .from('mentors')
    .select('*, users!inner(*)')
    .eq('is_available', true)
    .order('rating', { ascending: false })
    .limit(5);

  if (error) {
    return <div>Error loading mentors: {error.message}</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Top Rated Mentors</h3>
      {mentors.length === 0 ? (
        <p>No mentors available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {mentor.users?.avatar_url && (
                  <img
                    src={mentor.users.avatar_url}
                    alt={mentor.users.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-medium">{mentor.users?.name}</h4>
                  <p className="text-sm text-gray-500">{mentor.current_position}</p>
                </div>
              </div>
              <p className="text-sm mb-1">
                <span className="font-medium">Expertise:</span>{' '}
                {mentor.expertise_areas.join(', ')}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Rating:</span> {mentor.rating}/5
                {mentor.total_sessions > 0 && ` (${mentor.total_sessions} sessions)`}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Session Rate:</span> ${mentor.session_rate}/hour
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function SessionStats() {
  const supabase = await createSupabaseServerClient();

  const { data: stats, error } = await supabase.from('sessions')
    .select('status, count(*)')
    .group('status');

  if (error) {
    return <div>Error loading session statistics: {error.message}</div>;
  }

  const statusColors = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Session Statistics</h3>
      <div className="flex flex-wrap gap-4">
        {stats.map((stat) => (
          <div
            key={stat.status}
            className={`px-4 py-3 rounded-lg ${statusColors[stat.status as keyof typeof statusColors]}`}
          >
            <div className="font-medium capitalize">{stat.status.replace('_', ' ')}</div>
            <div className="text-2xl font-bold">{stat.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SupabaseExamplePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Supabase Integration Example</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Client-side Data Fetching</h2>
        <div className="border rounded-lg p-4">
          <SupabaseExample />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Server-side Data Fetching</h2>
        <Suspense fallback={<div>Loading mentors...</div>}>
          <MentorList />
        </Suspense>

        <Suspense fallback={<div>Loading session stats...</div>}>
          <SessionStats />
        </Suspense>
      </div>
    </div>
  );
}
