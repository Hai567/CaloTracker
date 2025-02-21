import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Text, HelperText } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { AppRoutes } from "../../navigation/routes"
import { useAuth } from "../../contexts/AuthContext"

const SignupScreen = () => {
    const navigation = useNavigation()
    const { signUp } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long")
            return
        }

        setLoading(true)
        setError("")

        try {
            const { error: signUpError } = await signUp(email, password)
            if (signUpError) {
                setError(signUpError)
            } else {
                // Navigate to login after successful signup
                navigation.navigate(AppRoutes.LOGIN)
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
                Create Account
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

            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text)
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
                onPress={handleSignup}
                style={styles.button}
                loading={loading}
                disabled={loading}
            >
                Sign Up
            </Button>

            <Button
                mode="text"
                onPress={() => navigation.navigate(AppRoutes.LOGIN)}
                style={styles.linkButton}
                disabled={loading}
            >
                Already have an account? Log in
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

export default SignupScreen
