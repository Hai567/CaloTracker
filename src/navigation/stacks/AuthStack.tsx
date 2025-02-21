import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoutes, AuthStackParamList } from "../routes"
import LoginScreen from "../../screens/auth/LoginScreen"
import SignupScreen from "../../screens/auth/SignupScreen"

const Stack = createStackNavigator<AuthStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "#fff" },
            }}
        >
            <Stack.Screen name={AppRoutes.LOGIN} component={LoginScreen} />
            <Stack.Screen name={AppRoutes.SIGNUP} component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
