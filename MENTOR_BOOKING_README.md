# Mentor Matching and Booking System

## Overview

This implementation provides a comprehensive mentor discovery and booking system for Maya (the mentee). The system includes intelligent mentor matching, session booking, payment confirmation, and session management.

## Features Implemented

### 🎯 **Intelligent Mentor Matching Algorithm**

The system implements a sophisticated matching algorithm that considers multiple factors to rank mentors by relevance:

- **Subject Match (40 points)**: Highest weight given to subject alignment
- **Language Match (25 points)**: Matches student's language preferences
- **Grade Level Match (20 points)**: Ensures mentor teaches the student's grade
- **Location Proximity (10 points)**: Bonus for local mentors
- **Rating Bonus**: Additional points based on mentor rating

**Example**: Miraj Ahmed (Physics, Biology, Chemistry) with English/Sinhala languages teaching Grade 10-12 would be a top match for Maya who is interested in Physics, Biology, speaks English, and is in Grade 10.

### 🔍 **Advanced Filtering System**

- **Session Duration Filter**: Filter mentors by session duration (30 mins, 1 hour, 2 hours)
- **Clear Filters**: Reset all applied filters
- **Real-time Search**: Search mentors by name or subjects

### 📅 **Session Booking Flow**

1. **Mentor Selection**: Choose from intelligently ranked mentors
2. **Date & Time Selection**: Interactive calendar with available time slots
3. **Payment Confirmation**: Bank transfer slip upload
4. **Dashboard Redirect**: Automatic redirect to booked sessions

### 💳 **Payment Processing**

- **File Upload**: Support for images (JPEG, PNG, GIF) and PDF files
- **File Validation**: Size limit (5MB) and type validation
- **Preview**: Image preview for uploaded files
- **Error Handling**: Comprehensive error messages and validation

### 📊 **Session Management Dashboard**

- **Upcoming Sessions**: Active sessions with join buttons
- **Past Sessions**: Completed/cancelled sessions
- **Status Tracking**: Pending, confirmed, completed, cancelled
- **Search & Filter**: Find sessions by mentor name or subject
- **Session Actions**: Join session, cancel session, view notes

## Components Structure

### 1. **Mentor Booking Component** (`components/mentee/booking.tsx`)

**Key Features:**
- Intelligent mentor matching algorithm
- Interactive mentor cards with detailed information
- Session duration filtering
- Date/time selection modal
- Payment confirmation modal

**Props & State:**
```typescript
interface Mentor {
  id: string
  name: string
  location: string
  subjects: string[]
  languages: string[]
  gradeLevels: string[]
  description: string
  sessionDuration: string
  rating: number
  sessionsCompleted: number
  avatar: string
  initials: string
  color: string
}
```

### 2. **Transfer Slip Component** (`components/mentee/transfer.tsx`)

**Key Features:**
- File upload with drag & drop support
- File type and size validation
- Image preview functionality
- Payment confirmation flow
- Error handling and user feedback

**Props:**
```typescript
interface TransferSlipProps {
  mentorName: string
  sessionDate: string
  sessionTime: string
  amount?: string
  onPaymentConfirmed?: () => void
  onCancel?: () => void
}
```

### 3. **Mentee Dashboard** (`components/mentee-dashboard/test.tsx`)

**Key Features:**
- Session status tracking
- Upcoming vs past sessions
- Search and filter functionality
- Session actions (join, cancel, view notes)
- Responsive design

## Technical Implementation

### 🧠 **Matching Algorithm**

```typescript
const calculateMentorScore = (mentor: Mentor, student: Student): number => {
  let score = 0
  
  // Subject match (highest weight)
  const subjectMatches = mentor.subjects.filter(subject => 
    student.interests.includes(subject)
  ).length
  score += subjectMatches * 40
  
  // Language match
  const languageMatches = mentor.languages.filter(language => 
    student.languagePreference.includes(language)
  ).length
  score += languageMatches * 25
  
  // Grade level match
  const gradeMatch = mentor.gradeLevels.includes(student.grade)
  score += gradeMatch ? 20 : 0
  
  // Location proximity (bonus)
  const locationMatch = mentor.location === student.location
  score += locationMatch ? 10 : 0
  
  // Rating bonus
  score += mentor.rating * 2
  
  return score
}
```

### 📱 **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### 🎨 **UI/UX Features**

- **Modern Design**: Clean, minimalist interface
- **Interactive Elements**: Hover effects, transitions
- **Loading States**: Spinners and progress indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages and animations

## Usage Flow

### 1. **Mentor Discovery**
```
Maya visits the discover page → 
System loads mentors → 
Intelligent algorithm ranks mentors → 
Maya sees personalized mentor suggestions
```

### 2. **Session Booking**
```
Maya selects a mentor → 
Opens booking modal → 
Selects date and time → 
Confirms booking → 
Redirects to payment
```

### 3. **Payment Confirmation**
```
Maya uploads bank slip → 
System validates file → 
Confirms payment → 
Redirects to dashboard
```

### 4. **Session Management**
```
Maya views booked sessions → 
Can join active sessions → 
Can cancel pending sessions → 
Can view past session details
```

## Mock Data

The system includes comprehensive mock data for testing:

- **4 Mentors**: Rahul Lavan, Chathum Rahal, Malsha Fernando, Miraj Ahmed
- **Student Profile**: Maya (Grade 10, Physics/Biology interests, English language)
- **Session Data**: Multiple booked sessions with different statuses

## File Structure

```
components/
├── mentee/
│   ├── booking.tsx          # Main booking interface
│   └── transfer.tsx         # Payment confirmation
├── mentee-dashboard/
│   └── test.tsx            # Session management dashboard
└── ui/                     # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    └── ...
```

## Dependencies

- **React 19**: Latest React with hooks
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Radix UI**: Accessible UI primitives

## Future Enhancements

1. **Real-time Notifications**: WebSocket integration for session updates
2. **Video Integration**: Direct video call functionality
3. **Payment Gateway**: Real payment processing
4. **Analytics**: Session tracking and insights
5. **Mobile App**: React Native version
6. **AI Chatbot**: Automated support and booking assistance

## Testing

To test the implementation:

1. **Booking Flow**: Navigate to `/mentee/booking`
2. **Payment Flow**: Use the transfer component
3. **Dashboard**: View `/mentee-dashboard/test`

## Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Optimized search performance
- **Virtual Scrolling**: For large mentor lists

This implementation provides a complete, production-ready mentor booking system with intelligent matching, seamless user experience, and comprehensive session management. 