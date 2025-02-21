import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import {
    Meal,
    FastingSession,
    UserProfile,
    getMealsForDate,
    getActiveFastingSession,
    getUserProfile,
    addMeal,
    startFastingSession,
    endFastingSession,
    createOrUpdateUserProfile,
} from "../services/supabase/database"

interface DataContextType {
    meals: Meal[]
    activeFastingSession: FastingSession | null
    userProfile: UserProfile | null
    loading: boolean
    addMeal: (
        meal: Omit<Meal, "id" | "user_id" | "created_at" | "updated_at">
    ) => Promise<void>
    startFast: (duration: number) => Promise<void>
    endFast: (status?: "completed" | "cancelled") => Promise<void>
    updateProfile: (profile: Partial<UserProfile>) => Promise<void>
    refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = useAuth()
    const [meals, setMeals] = useState<Meal[]>([])
    const [activeFastingSession, setActiveFastingSession] =
        useState<FastingSession | null>(null)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    const refreshData = async () => {
        if (!user) return

        try {
            setLoading(true)
            const [todaysMeals, activeFast, profile] = await Promise.all([
                getMealsForDate(user.id, new Date()),
                getActiveFastingSession(user.id),
                getUserProfile(user.id),
            ])

            setMeals(todaysMeals)
            setActiveFastingSession(activeFast)
            setUserProfile(profile)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            refreshData()
        } else {
            setMeals([])
            setActiveFastingSession(null)
            setUserProfile(null)
            setLoading(false)
        }
    }, [user])

    const handleAddMeal = async (
        mealData: Omit<Meal, "id" | "user_id" | "created_at" | "updated_at">
    ) => {
        if (!user) throw new Error("User not authenticated")

        const meal = await addMeal({
            ...mealData,
            user_id: user.id,
            consumed_at: mealData.consumed_at || new Date().toISOString(),
        })

        setMeals((prev) => [...prev, meal])
    }

    const handleStartFast = async (duration: number) => {
        if (!user) throw new Error("User not authenticated")

        const session = await startFastingSession(user.id, duration)
        setActiveFastingSession(session)
    }

    const handleEndFast = async (
        status: "completed" | "cancelled" = "completed"
    ) => {
        if (!user || !activeFastingSession)
            throw new Error("No active fasting session")

        const session = await endFastingSession(activeFastingSession.id, status)
        setActiveFastingSession(null)
    }

    const handleUpdateProfile = async (profile: Partial<UserProfile>) => {
        if (!user) throw new Error("User not authenticated")

        const updatedProfile = await createOrUpdateUserProfile({
            ...profile,
            user_id: user.id,
        })

        setUserProfile(updatedProfile)
    }

    const value = {
        meals,
        activeFastingSession,
        userProfile,
        loading,
        addMeal: handleAddMeal,
        startFast: handleStartFast,
        endFast: handleEndFast,
        updateProfile: handleUpdateProfile,
        refreshData,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}
