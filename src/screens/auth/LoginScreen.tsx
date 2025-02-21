import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Text, HelperText } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { AppRoutes } from "../../navigation/routes"
import { useAuth } from "../../contexts/AuthContext"

const LoginScreen = () => {
    const navigation = useNavigation()
    const { signIn } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        setError("")

        try {
            const { error: signInError } = await signIn(email, password)
            if (signInError) {
                setError(signInError)
            }
        } catch (err) {
            setError("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Welcome Back
            </Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    setError("")
                }}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                disabled={loading}
                error={!!error}
            />

            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                    setPassword(text)
                    setError("")
                }}
                secureTextEntry
                style={styles.input}
                disabled={loading}
                error={!!error}
            />

            {error ? (
                <HelperText type="error" visible={!!error}>
                    {error}
                </HelperText>
            ) : null}

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                loading={loading}
                disabled={loading}
            >
                Login
            </Button>

            <Button
                mode="text"
                onPress={() => navigation.navigate(AppRoutes.SIGNUP)}
                style={styles.linkButton}
                disabled={loading}
            >
                Don't have an account? Sign up
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 24,
    },
    linkButton: {
        marginTop: 16,
    },
})

export default LoginScreen
