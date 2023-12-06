import { Alert, AlertOptions } from "react-native";

const Dialog = {
    alert(
        options: {
            title?: string;
            message?: string;
            okText?: string;
            alertOptions?: AlertOptions;
        } = {},
    ): Promise<void> {
        return new Promise((resolve) => {
            Alert.alert(
                options.title || "Alert",
                options.message,
                [{ text: options.okText || "OK", onPress: () => resolve() }],
                options.alertOptions,
            );
        });
    },
    confirm(
        options: {
            title?: string;
            message?: string;
            okText?: string;
            cancelText?: string;
            alertOptions?: AlertOptions;
        } = {},
    ) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                options.title || "Confirm",
                options.message,
                [
                    { text: options.okText || "OK", onPress: resolve },
                    { text: options.cancelText || "Cancel", onPress: reject },
                ],
                options.alertOptions,
            );
        });
    },
};

export default Dialog;
