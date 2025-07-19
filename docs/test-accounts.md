# Test Accounts Documentation

## Quick Login Feature

The application provides a quick login feature for development and testing purposes, allowing instant access with pre-configured mentor and mentee accounts.

### Available Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Mentor | mentor@example.com | mentor123 |
| Mentee | mentee@example.com | mentee123 |

### How to Use

1. Navigate to the login page (`/auth`)
2. Under the regular login form, you'll see "Quick Login (For Development)" options
3. Click either "Login as Mentor" or "Login as Mentee" to automatically sign in with those credentials
4. After a brief moment, you'll be automatically redirected to the appropriate dashboard based on the role

### Account Properties

#### Mentor Account
- Full Name: John Mentor
- Expertise: Computer Science, Mathematics
- Experience: 5 years
- Qualifications: PhD in Computer Science
- Availability: Weekdays 5-8 PM, Weekends
- Specializations: Programming, Algorithms, Data Structures, Calculus

#### Mentee Account
- Full Name: Sarah Student
- Age: 20
- Institution: University of Technology
- Field of Study: Computer Science
- Current Level: Undergraduate
- Subjects: Programming, Algorithms, Web Development
- Learning Style: Visual and practical exercises

### Technical Implementation

For the quick login feature to work properly, test accounts must exist in Supabase with the credentials mentioned above. You can create them using:

1. The included seed script: `npm run seed`
2. Creating accounts directly through the Supabase dashboard
3. The quick login feature automatically signs you in with the pre-configured accounts

### Security Considerations

- The quick login feature is only enabled in development mode
- Test accounts are not created in production environments
- The seeding API is protected with an API key

### Customizing Test Accounts

To modify the test account details:

1. Edit the credentials in the `AuthPage.tsx` component in the `quickLoginUsers` array
2. Update the seed script in `scripts/seed.js` with the same credentials
3. Run `npm run seed` to create/update the accounts in your Supabase database
4. Make sure the credentials match between your Supabase database and the quick login buttons

### Troubleshooting

If the quick login doesn't work:

1. Verify that the accounts exist in your Supabase database by running `npm run seed`
2. Check browser console for any authentication errors
3. Ensure your Supabase environment variables are correctly set in `.env`
4. Check that the accounts have the proper roles assigned in the Supabase database
5. Make sure the user accounts have `isOnboarded` set to `true` in the database

### Authentication Flow

The authentication system is designed to:

1. Send new users to the role selection page after signup
2. Redirect existing users directly to their role-specific dashboards after login
3. Handle OAuth redirects properly with a callback page
4. Keep authenticated users away from the authentication pages