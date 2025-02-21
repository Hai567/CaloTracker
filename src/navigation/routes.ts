export enum AppRoutes {
    // Auth Stack
    AUTH = "Auth",
    LOGIN = "Login",
    SIGNUP = "Signup",

    // Main Stack
    MAIN = "Main",
    DASHBOARD = "Dashboard",
    MEALS = "Meals",
    FASTING = "Fasting",
    PROFILE = "Profile",
}

export type AuthStackParamList = {
    [AppRoutes.LOGIN]: undefined
    [AppRoutes.SIGNUP]: undefined
}

export type MainStackParamList = {
    [AppRoutes.DASHBOARD]: undefined
    [AppRoutes.MEALS]: undefined
    [AppRoutes.FASTING]: undefined
    [AppRoutes.PROFILE]: undefined
}

export type RootStackParamList = {
    [AppRoutes.AUTH]: undefined
    [AppRoutes.MAIN]: undefined
}
