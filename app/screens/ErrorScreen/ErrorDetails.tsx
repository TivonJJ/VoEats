import React, { ErrorInfo } from "react";
import { ScrollView, TextStyle, View, ViewStyle, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";

export interface ErrorDetailsProps {
    error: Error;
    errorInfo: ErrorInfo | null;

    onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
    return (
        <SafeAreaView edges={["top", "bottom"]} style={$contentContainer}>
            <View style={$topSection}>
                <Icon name="bug" size={64} />
                <Text style={$heading}>Something went wrong!</Text>
                <Text>
                    This is the screen that your users will see in production when an error is
                    thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and
                    probably the layout as well (`app/screens/ErrorScreen`). If you want to remove
                    this entirely, check `app/app.tsx` for the ErrorBoundary component.
                </Text>
            </View>

            <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
                <Text style={$errorContent}>{props.error.message}</Text>

                <Text selectable style={$errorBacktrace}>
                    {props.errorInfo?.componentStack ?? ""}
                </Text>
            </ScrollView>

            <Button style={$resetButton} onPress={props.onReset}>
                RESET APP
            </Button>
        </SafeAreaView>
    );
}

const $contentContainer: ViewStyle = {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 16,
    flex: 1,
};

const $topSection: ViewStyle = {
    flex: 1,
    alignItems: "center",
};

const $heading: TextStyle = {
    color: "red",
    marginBottom: 12,
};

const $errorSection: ViewStyle = {
    flex: 2,
    backgroundColor: "#ccc",
    marginVertical: 12,
    borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
    padding: 12,
};

const $errorContent: TextStyle = {
    color: "red",
    fontWeight: "bold",
};

const $errorBacktrace: TextStyle = {
    marginTop: 12,
    color: "#ccc",
};

const $resetButton: ViewStyle = {
    backgroundColor: "red",
    paddingHorizontal: 20,
};
