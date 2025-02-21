import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoutes, RootStackParamList } from "../routes"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"
import { useAuth } from "../../contexts/AuthContext"
import { ActivityIndicator, View } from "react-native"

const Stack = createStackNavigator<RootStackParamList>()

export const RootStack = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <Stack.Screen name={AppRoutes.AUTH} component={AuthStack} />
            ) : (
                <Stack.Screen name={AppRoutes.MAIN} component={MainStack} />
            )}
        </Stack.Navigator>
    )
}
