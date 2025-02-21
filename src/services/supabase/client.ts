import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or Anonymous Key")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth types
export type AuthResponse = {
    user: User | null
    error: Error | null
}

export type User = {
    id: string
    email: string
    created_at: string
}

export type Error = {
    message: string
}

// Auth helper functions
export const signUp = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) throw error

        return {
            user: user
                ? {
                      id: user.id,
                      email: user.email || "",
                      created_at: user.created_at,
                  }
                : null,
            error: null,
        }
    } catch (error) {
        return {
            user: null,
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
        }
    }
}

export const signIn = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

        return {
            user: user
                ? {
                      id: user.id,
                      email: user.email || "",
                      created_at: user.created_at,
                  }
                : null,
            error: null,
        }
    } catch (error) {
        return {
            user: null,
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
        }
    }
}

export const signOut = async (): Promise<{ error: Error | null }> => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return { error: null }
    } catch (error) {
        return {
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
        }
    }
}
