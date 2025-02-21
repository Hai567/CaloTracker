import React, { useCallback } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text, Card, Button, useTheme, Surface } from "react-native-paper"
import { useAuth } from "../../contexts/AuthContext"
import { useData } from "../../contexts/DataContext"
import { useFocusEffect } from "@react-navigation/native"

const DashboardScreen = () => {
    const { user } = useAuth()
    const {
        meals,
        activeFastingSession,
        userProfile,
        loading,
        refreshData,
        startFast,
        endFast,
    } = useData()
    const theme = useTheme()

    useFocusEffect(
        useCallback(() => {
            refreshData()
        }, [refreshData])
    )

    const calculateDailyCalories = () => {
        return meals.reduce((total, meal) => total + meal.calories, 0)
    }

    const calculateFastProgress = () => {
        if (!activeFastingSession) return 0
        const elapsed =
            Date.now() - new Date(activeFastingSession.start_time).getTime()
        const progress =
            (elapsed /
                (activeFastingSession.target_duration * 60 * 60 * 1000)) *
            100
        return Math.min(Math.round(progress), 100)
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineMedium">
                    Welcome back, {user?.email}
                </Text>
            </View>

            {/* Daily Progress */}
            <Card style={styles.card}>
                <Card.Title title="Daily Progress" />
                <Card.Content>
                    <View style={styles.progressContainer}>
                        <Text variant="titleMedium">Calories</Text>
                        <Text variant="bodyLarge">
                            {calculateDailyCalories()} /{" "}
                            {userProfile?.daily_calorie_goal || 2000} kcal
                        </Text>
                        <Surface
                            style={[
                                styles.progressBar,
                                {
                                    backgroundColor:
                                        theme.colors.surfaceVariant,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        backgroundColor: theme.colors.primary,
                                        width: `${
                                            (calculateDailyCalories() /
                                                (userProfile?.daily_calorie_goal ||
                                                    2000)) *
                                            100
                                        }%`,
                                    },
                                ]}
                            />
                        </Surface>
                    </View>
                </Card.Content>
            </Card>

            {/* Fasting Progress */}
            <Card style={styles.card}>
                <Card.Title title="Fasting Progress" />
                <Card.Content>
                    {activeFastingSession ? (
                        <View>
                            <Text variant="titleMedium">Current Fast</Text>
                            <Text variant="bodyLarge">
                                {calculateFastProgress()}% Complete
                            </Text>
                            <Surface
                                style={[
                                    styles.progressBar,
                                    {
                                        backgroundColor:
                                            theme.colors.surfaceVariant,
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.progressFill,
                                        {
                                            backgroundColor:
                                                theme.colors.primary,
                                            width: `${calculateFastProgress()}%`,
                                        },
                                    ]}
                                />
                            </Surface>
                            <Button
                                mode="contained"
                                onPress={() => endFast()}
                                style={styles.button}
                            >
                                End Fast
                            </Button>
                        </View>
                    ) : (
                        <Button
                            mode="contained"
                            onPress={() =>
                                startFast(
                                    userProfile?.preferred_fasting_duration ||
                                        16
                                )
                            }
                            style={styles.button}
                        >
                            Start Fast
                        </Button>
                    )}
                </Card.Content>
            </Card>

            {/* Recent Meals */}
            <Card style={styles.card}>
                <Card.Title title="Recent Meals" />
                <Card.Content>
                    {meals.map((meal) => (
                        <Surface key={meal.id} style={styles.mealItem}>
                            <View>
                                <Text variant="titleMedium">{meal.name}</Text>
                                <Text variant="bodyMedium">
                                    {new Date(
                                        meal.consumed_at
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </View>
                            <Text variant="titleMedium">
                                {meal.calories} kcal
                            </Text>
                        </Surface>
                    ))}
                    <Button
                        mode="outlined"
                        onPress={() => {}}
                        style={styles.button}
                    >
                        Add Meal
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        padding: 16,
        paddingTop: 24,
    },
    card: {
        margin: 16,
        marginTop: 8,
    },
    progressContainer: {
        marginVertical: 8,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        marginTop: 8,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 4,
    },
    button: {
        marginTop: 16,
    },
    mealItem: {
        padding: 16,
        marginVertical: 4,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})

export default DashboardScreen
