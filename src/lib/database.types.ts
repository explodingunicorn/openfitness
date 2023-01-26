export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercise_categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      exercises: {
        Row: {
          category_id: number
          description: string | null
          id: number
          name: string
        }
        Insert: {
          category_id: number
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number
          description?: string | null
          id?: number
          name?: string
        }
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: number
          last_name: string | null
          next_auth_user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          next_auth_user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          next_auth_user_id?: string | null
        }
      }
      workout: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id?: number | null
        }
      }
      workout_day: {
        Row: {
          created_at: string | null
          id: number
          number: number | null
          workout_week_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          number?: number | null
          workout_week_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          number?: number | null
          workout_week_id?: number | null
        }
      }
      workout_exercise: {
        Row: {
          created_at: string | null
          id: number
          number: number
          reps: number[] | null
          special_instructions: string | null
          workout_day_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          number: number
          reps?: number[] | null
          special_instructions?: string | null
          workout_day_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          number?: number
          reps?: number[] | null
          special_instructions?: string | null
          workout_day_id?: number | null
        }
      }
      workout_exercise_choice: {
        Row: {
          exercise_id: number
          id: number
          workout_exercise_id: number
        }
        Insert: {
          exercise_id: number
          id?: number
          workout_exercise_id: number
        }
        Update: {
          exercise_id?: number
          id?: number
          workout_exercise_id?: number
        }
      }
      workout_week: {
        Row: {
          created_at: string | null
          id: number
          number: number | null
          workout_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          number?: number | null
          workout_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          number?: number | null
          workout_id?: number | null
        }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

