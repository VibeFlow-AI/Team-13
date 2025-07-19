# Test Accounts Documentation

## Quick Login Feature

The application provides a quick login feature for development and testing purposes, allowing easy access with pre-configured mentor and mentee accounts.

### Available Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Mentor | mentor@example.com | mentor123 |
| Mentee | mentee@example.com | mentee123 |

### How to Use

1. Navigate to the login page (`/auth`)
2. Under the regular login form, you'll see "Quick Login (For Development)" options
3. Click either "Login as Mentor" or "Login as Mentee" to automatically fill the credentials
4. Click the "Welcome Back" button to complete the login process
5. After successful login, the system will redirect you to the appropriate dashboard based on the role

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

For the quick login feature to work properly, test accounts need to be manually created in Supabase with the credentials mentioned above. You can use the following methods:

1. Create accounts directly through the Supabase dashboard
2. Use the `seedTestAccounts.ts` script in a separate process
3. The quick login feature only auto-fills credentials; it doesn't create accounts automatically

### Security Considerations

- The quick login feature is only enabled in development mode
- Test accounts are not created in production environments
- The seeding API is protected with an API key

### Customizing Test Accounts

To modify the test account details:

1. Edit the quick login credentials in the `AuthPage.tsx` component in the `quickLoginUsers` array
2. If you need to update actual accounts in Supabase, modify the `seedTestAccounts.ts` file and run it as a separate script
3. Make sure the credentials match between your Supabase database and the quick login buttons

### Troubleshooting

If login doesn't work after using the quick fill buttons:

1. Verify that the accounts exist in your Supabase database
2. Check browser console for any authentication errors
3. Ensure your Supabase environment variables are correctly set
4. Try creating the accounts manually through the regular signup process