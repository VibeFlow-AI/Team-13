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
      users: {
        Row: {
          id: string
          email: string
          role: 'MENTOR' | 'STUDENT'
          isOnboarded: boolean
          fullName: string | null
          age: number | null
          contactNumber: string | null
          institution: string | null
          fieldOfStudy: string | null
          currentLevel: string | null
          goals: string | null
          subjects: string[] | null
          learningStyle: string | null
          expertise: string | null
          experience: number | null
          qualifications: string | null
          availability: string | null
          mentorGoals: string | null
          specializations: string[] | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id: string
          email: string
          role: 'MENTOR' | 'STUDENT'
          isOnboarded?: boolean
          fullName?: string | null
          age?: number | null
          contactNumber?: string | null
          institution?: string | null
          fieldOfStudy?: string | null
          currentLevel?: string | null
          goals?: string | null
          subjects?: string[] | null
          learningStyle?: string | null
          expertise?: string | null
          experience?: number | null
          qualifications?: string | null
          availability?: string | null
          mentorGoals?: string | null
          specializations?: string[] | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'MENTOR' | 'STUDENT'
          isOnboarded?: boolean
          fullName?: string | null
          age?: number | null
          contactNumber?: string | null
          institution?: string | null
          fieldOfStudy?: string | null
          currentLevel?: string | null
          goals?: string | null
          subjects?: string[] | null
          learningStyle?: string | null
          expertise?: string | null
          experience?: number | null
          qualifications?: string | null
          availability?: string | null
          mentorGoals?: string | null
          specializations?: string[] | null
          createdAt?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      onboarding_progress: {
        Row: {
          id: string
          userId: string
          currentStep: number
          totalSteps: number
          formData: Json
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id: string
          userId: string
          currentStep?: number
          totalSteps?: number
          formData: Json
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          currentStep?: number
          totalSteps?: number
          formData?: Json
          createdAt?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_progress_userId_fkey"
            columns: ["userId"]
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
          updatedAt?: string
        }
        Update: {
          id?: string
          createdAt?: string
          updatedAt?: string
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
