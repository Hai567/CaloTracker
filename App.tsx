import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from "react-native-paper"
import { RootStack } from "./src/navigation/stacks/RootStack"
import { AuthProvider } from "./src/contexts/AuthContext"
import { DataProvider } from "./src/contexts/DataContext"

export default function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <PaperProvider>
                    <NavigationContainer>
                        <RootStack />
                    </NavigationContainer>
                </PaperProvider>
            </DataProvider>
        </AuthProvider>
    )
}
