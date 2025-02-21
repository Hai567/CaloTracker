import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppRoutes, MainStackParamList } from "../routes"
import DashboardScreen from "../../screens/dashboard/DashboardScreen"
import MealsScreen from "../../screens/meals/MealsScreen"
import FastingScreen from "../../screens/fasting/FastingScreen"
import ProfileScreen from "../../screens/profile/ProfileScreen"

const Tab = createBottomTabNavigator<MainStackParamList>()

const MainStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#e5e5e5",
                },
            }}
        >
            <Tab.Screen
                name={AppRoutes.DASHBOARD}
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Dashboard",
                }}
            />
            <Tab.Screen
                name={AppRoutes.MEALS}
                component={MealsScreen}
                options={{
                    tabBarLabel: "Meals",
                }}
            />
            <Tab.Screen
                name={AppRoutes.FASTING}
                component={FastingScreen}
                options={{
                    tabBarLabel: "Fasting",
                }}
            />
            <Tab.Screen
                name={AppRoutes.PROFILE}
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                }}
            />
        </Tab.Navigator>
    )
}

export default MainStack
