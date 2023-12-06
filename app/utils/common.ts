import { Linking } from "react-native";

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
    Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}
