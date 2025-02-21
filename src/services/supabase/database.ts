import { supabase } from "./client"
import { Database } from "./database.types"

type Tables = Database["public"]["Tables"]
type Meal = Tables["meals"]["Row"]
type FastingSession = Tables["fasting_sessions"]["Row"]
type UserProfile = Tables["user_profiles"]["Row"]

// Meal queries
export const getMealsForDate = async (
    userId: string,
    date: Date
): Promise<Meal[]> => {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", userId)
        .gte("consumed_at", startOfDay.toISOString())
        .lte("consumed_at", endOfDay.toISOString())
        .order("consumed_at", { ascending: true })

    if (error) throw error
    return data || []
}

export const addMeal = async (
    meal: Tables["meals"]["Insert"]
): Promise<Meal> => {
    const { data, error } = await supabase
        .from("meals")
        .insert(meal)
        .select()
        .single()

    if (error) throw error
    return data
}

// Fasting session queries
export const getActiveFastingSession = async (
    userId: string
): Promise<FastingSession | null> => {
    const { data, error } = await supabase
        .from("fasting_sessions")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single()

    if (error && error.code !== "PGRST116") throw error // PGRST116 is "no rows returned"
    return data
}

export const startFastingSession = async (
    userId: string,
    targetDuration: number
): Promise<FastingSession> => {
    const { data, error } = await supabase
        .from("fasting_sessions")
        .insert({
            user_id: userId,
            target_duration: targetDuration,
            start_time: new Date().toISOString(),
            status: "active",
        })
        .select()
        .single()

    if (error) throw error
    return data
}

export const endFastingSession = async (
    sessionId: string,
    status: "completed" | "cancelled" = "completed"
): Promise<FastingSession> => {
    const { data, error } = await supabase
        .from("fasting_sessions")
        .update({
            end_time: new Date().toISOString(),
            status,
        })
        .eq("id", sessionId)
        .select()
        .single()

    if (error) throw error
    return data
}

// User profile queries
export const getUserProfile = async (
    userId: string
): Promise<UserProfile | null> => {
    const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single()

    if (error && error.code !== "PGRST116") throw error
    return data
}

export const createOrUpdateUserProfile = async (
    profile:
        | Tables["user_profiles"]["Insert"]
        | Tables["user_profiles"]["Update"]
): Promise<UserProfile> => {
    const { data: existing } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", profile.user_id)
        .single()

    if (existing) {
        const { data, error } = await supabase
            .from("user_profiles")
            .update(profile)
            .eq("id", existing.id)
            .select()
            .single()

        if (error) throw error
        return data
    } else {
        const { data, error } = await supabase
            .from("user_profiles")
            .insert(profile)
            .select()
            .single()

        if (error) throw error
        return data
    }
}
