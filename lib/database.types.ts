export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          id: string
          checksum: string
          finished_at: string | null
          migration_name: string
          logs: string | null
          rolled_back_at: string | null
          started_at: string
          applied_steps_count: number
        }
        Insert: {
          id: string
          checksum: string
          finished_at?: string | null
          migration_name: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
        Update: {
          id?: string
          checksum?: string
          finished_at?: string | null
          migration_name?: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
        Relationships: []
      }
      mentors: {
        Row: {
          id: string
          user_id: string | null
          age: number | null
          location: string
          current_position: string
          institution_company: string
          years_experience: number
          bio: string
          expertise_areas: string[]
          preferred_subjects: string[]
          student_levels: string[]
          session_formats: string[]
          availability: string[]
          session_rate: number
          preferred_language: string
          contact_number: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          credentials: string[]
          teaching_experience: string | null
          rating: number
          total_sessions: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          age?: number | null
          location: string
          current_position: string
          institution_company: string
          years_experience: number
          bio: string
          expertise_areas: string[]
          preferred_subjects: string[]
          student_levels: string[]
          session_formats?: string[]
          availability: string[]
          session_rate: number
          preferred_language?: string
          contact_number?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          credentials?: string[]
          teaching_experience?: string | null
          rating?: number
          total_sessions?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          age?: number | null
          location?: string
          current_position?: string
          institution_company?: string
          years_experience?: number
          bio?: string
          expertise_areas?: string[]
          preferred_subjects?: string[]
          student_levels?: string[]
          session_formats?: string[]
          availability?: string[]
          session_rate?: number
          preferred_language?: string
          contact_number?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          credentials?: string[]
          teaching_experience?: string | null
          rating?: number
          total_sessions?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentors_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      samples: {
        Row: {
          id: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id: string
          createdAt?: string
          updatedAt: string
        }
        Update: {
          id?: string
          createdAt?: string
          updatedAt?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          student_id: string | null
          mentor_id: string | null
          scheduled_date: string
          duration_minutes: number
          status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled'
          subject: string
          session_type: 'one_on_one' | 'group'
          price: number
          payment_slip_url: string | null
          payment_verified: boolean
          payment_verified_at: string | null
          session_notes: string | null
          meeting_link: string | null
          student_rating: number | null
          mentor_rating: number | null
          student_feedback: string | null
          mentor_feedback: string | null
          cancellation_reason: string | null
          cancelled_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          mentor_id?: string | null
          scheduled_date: string
          duration_minutes?: number
          status?: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled'
          subject: string
          session_type?: 'one_on_one' | 'group'
          price: number
          payment_slip_url?: string | null
          payment_verified?: boolean
          payment_verified_at?: string | null
          session_notes?: string | null
          meeting_link?: string | null
          student_rating?: number | null
          mentor_rating?: number | null
          student_feedback?: string | null
          mentor_feedback?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          mentor_id?: string | null
          scheduled_date?: string
          duration_minutes?: number
          status?: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled'
          subject?: string
          session_type?: 'one_on_one' | 'group'
          price?: number
          payment_slip_url?: string | null
          payment_verified?: boolean
          payment_verified_at?: string | null
          session_notes?: string | null
          meeting_link?: string | null
          student_rating?: number | null
          mentor_rating?: number | null
          student_feedback?: string | null
          mentor_feedback?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_cancelled_by_fkey"
            columns: ["cancelled_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          id: string
          user_id: string | null
          age: number
          location: string
          education_level: string
          institution: string
          major: string
          academic_goals: string
          subject_interests: string[]
          proficiency_levels: Json
          learning_objectives: string
          contact_preferences: string[]
          preferred_session_duration: number
          budget_range: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          age: number
          location: string
          education_level: string
          institution: string
          major: string
          academic_goals: string
          subject_interests: string[]
          proficiency_levels?: Json
          learning_objectives: string
          contact_preferences?: string[]
          preferred_session_duration?: number
          budget_range?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          age?: number
          location?: string
          education_level?: string
          institution?: string
          major?: string
          academic_goals?: string
          subject_interests?: string[]
          proficiency_levels?: Json
          learning_objectives?: string
          contact_preferences?: string[]
          preferred_session_duration?: number
          budget_range?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          name: string
          avatar_url: string | null
          user_type: 'student' | 'mentor'
          is_active: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          name: string
          avatar_url?: string | null
          user_type: 'student' | 'mentor'
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          user_type?: 'student' | 'mentor'
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
