import React, { createContext, useContext, useState, useEffect } from "react"
import {
    User,
    signIn,
    signUp,
    signOut,
    supabase,
} from "../services/supabase/client"

type AuthContextType = {
    user: User | null
    loading: boolean
    signIn: (
        email: string,
        password: string
    ) => Promise<{ error: string | null }>
    signUp: (
        email: string,
        password: string
    ) => Promise<{ error: string | null }>
    signOut: () => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || "",
                    created_at: session.user.created_at,
                })
            }
            setLoading(false)
        })

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || "",
                    created_at: session.user.created_at,
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleSignIn = async (email: string, password: string) => {
        const { error } = await signIn(email, password)
        return { error: error?.message || null }
    }

    const handleSignUp = async (email: string, password: string) => {
        const { error } = await signUp(email, password)
        return { error: error?.message || null }
    }

    const handleSignOut = async () => {
        const { error } = await signOut()
        return { error: error?.message || null }
    }

    const value = {
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
