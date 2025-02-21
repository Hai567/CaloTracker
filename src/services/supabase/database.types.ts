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
            meals: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    calories: number
                    protein: number
                    carbs: number
                    fats: number
                    consumed_at: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    calories: number
                    protein?: number
                    carbs?: number
                    fats?: number
                    consumed_at?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    calories?: number
                    protein?: number
                    carbs?: number
                    fats?: number
                    consumed_at?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            fasting_sessions: {
                Row: {
                    id: string
                    user_id: string
                    start_time: string
                    end_time: string | null
                    target_duration: number
                    status: "active" | "completed" | "cancelled"
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    start_time?: string
                    end_time?: string | null
                    target_duration: number
                    status?: "active" | "completed" | "cancelled"
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    start_time?: string
                    end_time?: string | null
                    target_duration?: number
                    status?: "active" | "completed" | "cancelled"
                    created_at?: string
                    updated_at?: string
                }
            }
            user_profiles: {
                Row: {
                    id: string
                    user_id: string
                    daily_calorie_goal: number
                    preferred_fasting_duration: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    daily_calorie_goal?: number
                    preferred_fasting_duration?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    daily_calorie_goal?: number
                    preferred_fasting_duration?: number
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
