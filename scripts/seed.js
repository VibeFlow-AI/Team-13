#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

// Constants
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Required environment variables are missing.');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

// Initialize Supabase client with service role key for admin privileges
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test account data
const TEST_ACCOUNTS = [
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

/**
 * Creates or updates test accounts in Supabase
 */
async function seedTestAccounts() {
  console.log('Starting to seed test accounts...');

  try {
    for (const account of TEST_ACCOUNTS) {
      // Check if the user already exists
      console.log(`Processing account: ${account.email}...`);

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', account.email)
        .maybeSingle();

      if (existingUser) {
        console.log(`User ${account.email} already exists, updating...`);

        // Update the existing user
        const { error: updateError } = await supabase
          .from('users')
          .update({
            role: account.role,
            ...account.userData
          })
          .eq('email', account.email);

        if (updateError) {
          console.error(`Error updating user ${account.email}:`, updateError);
        } else {
          console.log(`Updated user ${account.email} successfully.`);
        }
      } else {
        console.log(`User ${account.email} doesn't exist, creating...`);

        // Create a new auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: account.email,
          password: account.password,
          email_confirm: true,
          user_metadata: {
            full_name: account.userData.fullName,
            role: account.role
          }
        });

        if (authError) {
          console.error(`Error creating auth user ${account.email}:`, authError);
          continue;
        }

        console.log(`Created auth user ${account.email} with ID: ${authUser.user.id}`);

        // Create a user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authUser.user.id,
            email: account.email,
            role: account.role,
            ...account.userData
          });

        if (profileError) {
          console.error(`Error creating profile for ${account.email}:`, profileError);
        } else {
          console.log(`Created profile for ${account.email} successfully.`);
        }
      }
    }

    console.log('Test account seeding completed successfully!');

  } catch (error) {
    console.error('An unexpected error occurred during seeding:', error);
    process.exit(1);
  }
}

// Execute the seed function
seedTestAccounts()
  .then(() => {
    console.log('Seed script completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  });
