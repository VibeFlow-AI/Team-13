import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Get user role type from the Database type definition
type UserRole = Database['public']['Tables']['users']['Row']['role'];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Initialize Supabase client with service role key for admin privileges
const supabase = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function seedTestAccounts() {
  try {
    console.log('Starting to seed test accounts...');

    // Test account credentials
    const testAccounts = [
      {
        email: 'mentor@example.com',
        password: 'mentor123',
        role: 'MENTOR',
        userData: {
          fullName: 'John Mentor',
          expertise: 'Computer Science, Mathematics',
          experience: 5,
          qualifications: 'PhD in Computer Science',
          availability: 'Weekdays 5-8 PM, Weekends',
          mentorGoals: 'Help students excel in programming and math',
          specializations: ['Programming', 'Algorithms', 'Data Structures', 'Calculus'],
          isOnboarded: true
        }
      },
      {
        email: 'mentee@example.com',
        password: 'mentee123',
        role: 'STUDENT',
        userData: {
          fullName: 'Sarah Student',
          age: 20,
          contactNumber: '+1234567890',
          institution: 'University of Technology',
          fieldOfStudy: 'Computer Science',
          currentLevel: 'Undergraduate',
          goals: 'Improve programming skills and understand algorithms better',
          subjects: ['Programming', 'Algorithms', 'Web Development'],
          learningStyle: 'Visual and practical exercises',
          isOnboarded: true
        }
      }
    ];

    // Create or update each test account
    for (const account of testAccounts) {
      // Check if the user already exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', account.email)
        .maybeSingle();

      const userExists = !!existingUser;

      if (!userExists) {
        // Create the auth user using the latest Supabase approach
        const { data, error } = await supabase.auth.admin.createUser({
          email: account.email,
          password: account.password,
          email_confirm: true,
          user_metadata: {
            full_name: account.userData.fullName,
            role: account.role
          }
        });

        if (error) {
          console.error(`Error creating auth user ${account.email}:`, error);
          continue;
        }

        const userId = data?.user?.id;
        if (!userId) {
          console.error(`Failed to get user ID for ${account.email}`);
          continue;
        }
        console.log(`Created auth user: ${account.email}`);

        // Insert user data into the users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: account.email,
            role: account.role,
            ...account.userData
          });

        if (profileError) {
          console.error(`Error creating user profile for ${account.email}:`, profileError);
        } else {
          console.log(`Created user profile for: ${account.email}`);
        }
      } else {
        console.log(`User ${account.email} already exists, skipping...`);
      }
    }

    console.log('Seed completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding test accounts:', error);
    return { success: false, error };
  }
}

// Uncomment and use this function to execute the seeding process
/*
export async function runSeed() {
  const result = await seedTestAccounts();
  console.log('Seed result:', result);
}

// Execute when running directly
if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error during seeding:', error);
      process.exit(1);
    });
}
*/
